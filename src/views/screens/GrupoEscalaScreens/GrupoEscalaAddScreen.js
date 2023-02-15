import React, { useEffect } from "react";
import CIcon from "@coreui/icons-react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { setSnackbar } from "../../../redux/reducers/snackbarReducer";
import { addGrupoEscala } from "../../../redux/actions/grupoEscalaActions";
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
import {
  initialValues,
  validationSchema,
} from "./options/grupoEscalaValidationSchema";
import { GRUPOESCALA_ADD_RESET } from "../../../redux/constants/grupoEscConstants";
import {
  redirectLogin,
  tokenhasExpired,
} from "../../../containers/utils/userloginsettings.js";

function GrupoEscalaAddScreen({ history }) {
  const dispatch = useDispatch();

  // User Login Selector
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Add Province Selector
  const addGrupoEscalaSelector = useSelector((state) => state.addGrupoEscala);
  const { loading, error, success } = addGrupoEscalaSelector;

  // Use Effect
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else if (!userInfo.isProvinceSpecialist) {
      history.push("/403");
    }
    if (tokenhasExpired(userInfo)) {
      redirectLogin(history, dispatch);
    }
    if (success) {
      dispatch(
        setSnackbar(true, "success", "Grupo de Escala insertado satisfactoriamente")
      );
      dispatch({ type: GRUPOESCALA_ADD_RESET });
      history.push("/gruposEscala");
    }
  }, [userInfo, history, success, dispatch]);

  // Form with the initials values of the user
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      dispatch(addGrupoEscala(values));
    },
  });

  return (
    <CRow>
      <CCol xs="12">
        {error && <Message variant="danger">{error}</Message>}
        <CCard className="shadow">
          <CCardHeader>
            Formulario para Insertar <strong>Grupos de Escala</strong>
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

              {/* NOMBRE DEL GRUPESC  */}
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
                    invalid={formik.touched.nombre && Boolean(formik.errors.nombre)}
                    valid={formik.touched.nombre && !Boolean(formik.errors.nombre)}
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
                <LinkContainer to="/gruposEscala">
                  <CButton
                    variant="outline"
                    color="light"
                    className="text-black-50 mr-2"
                  >
                    <CIcon name="cil-x" /> Cancelar
                  </CButton>
                </LinkContainer>
                <CButton color="success" type="submit">
                  <CIcon name="cil-scrubber" /> Insertar
                </CButton>
              </div>
            </CCardFooter>
          </form>
        </CCard>
      </CCol>
    </CRow>
  );
}

export default GrupoEscalaAddScreen;
