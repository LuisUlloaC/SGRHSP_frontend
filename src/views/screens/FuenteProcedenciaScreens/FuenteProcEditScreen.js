import React, {useEffect} from "react";
import CIcon from "@coreui/icons-react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { setSnackbar } from "../../../redux/reducers/snackbarReducer";
import {
  editFuenteProc,
  getFuenteProcDetails,
} from "../../../redux/actions/fuenteProcActions";
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
import { initialValues, validationSchema } from "./options/fuenteProcValidationSchema";
import { FUENTEPROCEDENCIA_EDIT_RESET } from "../../../redux/constants/fuengeProcConstant";
import {
  redirectLogin,
  tokenhasExpired,
} from "../../../containers/utils/userloginsettings.js";


function FuenteProcEditScreen({fuentesProcList, history, match }) {
  const dispatch = useDispatch();
  const fuenteProcedenciaId = match.params.id;

  // User Login Selector
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  // Fuente PRocedencia Details Selector
  const fuenteProcDetails = useSelector((state) => state.fuenteProcDetails);
  const { loading: loadingDetails, error: errorDetails, fuenteProcedencia } = fuenteProcDetails;
  // EDIT Fuente Procedencia Selector
  const editFuenteProcSelector = useSelector((state) => state.fuenteProcEdit);
  const { loading, error, success } = editFuenteProcSelector;


  // Init FuenteProc Values on Form
  initialValues.nombre = fuenteProcedencia?.nombre;

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
      if (fuenteProcedenciaId) {
        dispatch(getFuenteProcDetails(fuenteProcedenciaId, false));
      }
      if (success) {
        dispatch(
          setSnackbar(true, "success", "Fuente de Procedencia editada satisfactoriamente")
        );
        dispatch({ type: FUENTEPROCEDENCIA_EDIT_RESET });
        history.push("/fuentesProc");
      }
    }
  }, [userInfo, history, success, dispatch, fuenteProcedenciaId]);

  // Form with the initials values of the user
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      dispatch(editFuenteProc(fuenteProcedenciaId, values));
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
                Formulario para Editar <strong>Fuentes de Procedencia</strong>
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
                    Características de la Fuente de Procedencia
                  </h5>

                  {/* Datos de la Fuente de Procedencia */}
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Datos de la Fuente de Procedencia</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        id="nombre"
                        name="nombre"
                        type="text"
                        placeholder="Datos de la Fuente de Procedencia"
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
                    <LinkContainer to="/fuentesProc/list">
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

export default FuenteProcEditScreen;
