import React, {useEffect} from "react";
import CIcon from "@coreui/icons-react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { setSnackbar } from "../../../redux/reducers/snackbarReducer";
import {
  editMotivoBaja,
  getMotivoBajaDetails,
} from "../../../redux/actions/motivoBajaActions";
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
import { initialValues, validationSchema } from "./options/motivoBajaValidationSchema";
import { MOTIVOBAJA_EDIT_RESET } from "../../../redux/constants/motivoBajaConstant";
import {
  redirectLogin,
  tokenhasExpired,
} from "../../../containers/utils/userloginsettings.js";


function MotivoBajaEditScreen({history, match }) {
  const dispatch = useDispatch();
  const motivoBajaId = match.params.id;

  // User Login Selector
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  //Details Selector
  const motivoBajaDetails = useSelector((state) => state.motivoBajaDetails);
  const { loading: loadingDetails, error: errorDetails, motivoBaja } = motivoBajaDetails;
  // EDIT Selector
  const editMotivoBajaSelector = useSelector((state) => state.motivoBajaEdit);
  const { loading, error, success } = editMotivoBajaSelector;


  // Init Values on Form
  initialValues.nombre = motivoBaja?.nombre;

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
      if (motivoBajaId) {
        dispatch(getMotivoBajaDetails(motivoBajaId, false));
      }
      if (success) {
        dispatch(
          setSnackbar(true, "success", "Motivo de baja editado satisfactoriamente")
        );
        dispatch({ type: MOTIVOBAJA_EDIT_RESET });
        history.push("/motivosBaja");
      }
    }
  }, [userInfo, history, success, dispatch, motivoBajaId]);

  // Form with the initials values of the user
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      dispatch(editMotivoBaja(motivoBajaId, values));
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
                Formulario para Editar <strong>Motivos de Baja</strong>
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
                    Características del Motivo de Baja
                  </h5>

                  {/* NOMBRE DEL MOTIVO DE BAJA */}
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Motivo de Baja</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        id="nombre"
                        name="nombre"
                        type="text"
                        placeholder="Motivo de Baja"
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
                    <LinkContainer to="/motivosBaja/list">
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

export default MotivoBajaEditScreen;
