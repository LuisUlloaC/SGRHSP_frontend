import React, {useEffect} from "react";
import CIcon from "@coreui/icons-react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { setSnackbar } from "../../../redux/reducers/snackbarReducer";
import {
  editGrupoEscala,
  getGrupoEscalaDetails,
} from "../../../redux/actions/grupoEscalaActions";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CFormGroup,
  CInput,
  CInvalidFeedback,
  CLabel,
  CRow,
} from "@coreui/react";
import { LinkContainer } from "react-router-bootstrap";
import { Loader, Message } from "../../../containers/utils";
import { initialValues, validationSchema } from "./options/grupoEscalaValidationSchema";
import { GRUPOESCALA_EDIT_RESET } from "../../../redux/constants/grupoEscConstants";
import {
  redirectLogin,
  tokenhasExpired,
} from "../../../containers/utils/userloginsettings.js";


function GrupoEscalaEditScreen({grupoEscalaList, history, match }) {
  const dispatch = useDispatch();
  const grupoEscalaId = match.params.id;

  // User Login Selector
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  // Grupo Escala Details Selector
  const grupoEscalaDetails = useSelector((state) => state.grupoEscalaDetails);
  const { loading: loadingDetails, error: errorDetails, grupoEscala } = grupoEscalaDetails;
  // EDIT Grupo Escala Selector
  const editGrupoEscalaSelector = useSelector((state) => state.grupoEscalaEdit);
  const { loading, error, success } = editGrupoEscalaSelector;


  // Init Municipio Values on Form
  initialValues.nombre = grupoEscala?.nombre;

  // Use Effect
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else if (!userInfo.isProvinceSpecialist) {
      history.push("/403");
    } else {
      if (tokenhasExpired(userInfo)) {
        redirectLogin(history, dispatch);
      }
      if (grupoEscalaId) {
        dispatch(getGrupoEscalaDetails(grupoEscalaId, false));
      }
      if (success) {
        dispatch(
          setSnackbar(true, "success", "Grupo de Escala editado satisfactoriamente")
        );
        dispatch({ type: GRUPOESCALA_EDIT_RESET });
        history.push("/gruposEscala");
      }
    }
  }, [userInfo, history, success, dispatch, grupoEscalaId]);

  // Form with the initials values of the user
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      dispatch(editGrupoEscala(grupoEscalaId, values));
    },
  });

  return (
    <div>
      {loadingDetails ? (
        <Loader />
      ) : errorDetails ? (
        <Message variant="danger">{errorDetails}</Message>
      ) : (
        <CRow>
          <CCol xs="12">
            {error && <Message variant="danger">{error}</Message>}
            <CCard className="shadow">
              <CCardHeader>
                Formulario para Editar <strong>Grupos de Escala</strong>
                <CButton
                  variant="outline"
                  color="light"
                  className="text-black-50 float-right"
                  onClick={(e) => {
                    formik.resetForm();
                    dispatch(setSnackbar(true, "info", "Formulario reseteado"));
                  }}
                >
                  Resetear Formulario
                </CButton>
              </CCardHeader>
              <form onSubmit={formik.handleSubmit} className="m-3">
                <CCardBody>
                  <h5 className="text-muted mb-4">
                    Características del Grupo de Escala
                  </h5>

                  {/* NOMBRE DEL GRUPO DE ESCALA */}
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Nombre del Grupo de Escala</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        id="nombre"
                        name="nombre"
                        type="text"
                        placeholder="Nombre del Grupo de Escala"
                        value={formik.values.nombre}
                        invalid={
                          formik.touched.nombre && Boolean(formik.errors.nombre)
                        }
                        valid={
                          formik.touched.nombre && !Boolean(formik.errors.nombre)
                        }
                        onChange={formik.handleChange}
                      />
                      <CInvalidFeedback>{formik.errors.nombre}</CInvalidFeedback>
                    </CCol>
                  </CFormGroup>
                </CCardBody>

                {/* FOOTER */}
                <CCardFooter>
                  {loading && <Loader />}
                  <div className="float-right">
                    <LinkContainer to="/gruposEscala/list">
                      <CButton
                        variant="outline"
                        color="light"
                        className="text-black-50 mr-2"
                      >
                        <CIcon name="cil-x" /> Cancelar
                      </CButton>
                    </LinkContainer>
                    <CButton color="success" type="submit">
                      <CIcon name="cil-scrubber" /> Editar
                    </CButton>
                  </div>
                </CCardFooter>
              </form>
            </CCard>
          </CCol>
        </CRow>
      )}
    </div>
  );
}

export default GrupoEscalaEditScreen;
