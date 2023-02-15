import React, {useEffect} from "react";
import CIcon from "@coreui/icons-react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { setSnackbar } from "../../../redux/reducers/snackbarReducer";
import {
  editNivelPrep,
  getNivelPrepDetails,
} from "../../../redux/actions/nivelPrepActions";
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
import { initialValues, validationSchema } from "./options/nivelPrepValidationSchema";
import { NIVELPREPARACION_EDIT_RESET } from "../../../redux/constants/nivelPrepConstants";
import {
  redirectLogin,
  tokenhasExpired,
} from "../../../containers/utils/userloginsettings.js";


function NivelPrepEditScreen({history, match }) {
  const dispatch = useDispatch();
  const nivelPrepId = match.params.id;

  // User Login Selector
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  //Details Selector
  const nivelPrepDetails = useSelector((state) => state.nivelPrepDetails);
  const { loading: loadingDetails, error: errorDetails, nivelPrep } = nivelPrepDetails;
  // EDIT Selector
  const editNivelPrepSelector = useSelector((state) => state.nivelPrepEdit);
  const { loading, error, success } = editNivelPrepSelector;


  // Init Values on Form
  initialValues.nombre = nivelPrep?.nombre;

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
      if (nivelPrepId) {
        dispatch(getNivelPrepDetails(nivelPrepId, false));
      }
      if (success) {
        dispatch(
          setSnackbar(true, "success", "Nivel de Preparación editado satisfactoriamente")
        );
        dispatch({ type: NIVELPREPARACION_EDIT_RESET });
        history.push("/nivelesPrep");
      }
    }
  }, [userInfo, history, success, dispatch, nivelPrepId]);

  // Form with the initials values of the user
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      dispatch(editNivelPrep(nivelPrepId, values));
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
                Formulario para Editar <strong>Niveles de Preparación</strong>
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
                    Características del Nivel de Preparación
                  </h5>

                  {/* NOMBRE DEL NIVEL DE PREPARACION */}
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Nombre del Nivel de Preparación</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        id="nombre"
                        name="nombre"
                        type="text"
                        placeholder="Nombre del Nivel de Preparación"
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
                    <LinkContainer to="/nivelesPrep/list">
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

export default NivelPrepEditScreen;
