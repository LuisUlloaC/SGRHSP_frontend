import React, {useEffect} from "react";
import CIcon from "@coreui/icons-react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { setSnackbar } from "../../../redux/reducers/snackbarReducer";
import {
  editCatOcupacional,
  getCatOcupacionalDetails,
} from "../../../redux/actions/catOcupacionalActions";
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
import { initialValues, validationSchema } from "./options/catOcupacionalValidationSchema";
import { CATOCUP_EDIT_RESET } from "../../../redux/constants/catOcupacionalConstants";
import {
  redirectLogin,
  tokenhasExpired,
} from "../../../containers/utils/userloginsettings.js";


function CatOcupacionalEditScreen({catOcupacionalList, history, match }) {
  const dispatch = useDispatch();
  const catOcupacionalId = match.params.id;

  // User Login Selector
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  // CatOcup Details Selector
  const catOcupacionalDetails = useSelector((state) => state.catOcupacionalDetails);
  const { loading: loadingDetails, error: errorDetails, catOcupacional } = catOcupacionalDetails;
  // EDIT CATOCUP Selector
  const editCatOcupacionalSelector = useSelector((state) => state.catOcupacionalEdit);
  const { loading, error, success } = editCatOcupacionalSelector;


  // Init Municipio Values on Form
  initialValues.nombre = catOcupacional?.nombre;

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
      if (catOcupacionalId) {
        dispatch(getCatOcupacionalDetails(catOcupacionalId, false));
      }
      if (success) {
        dispatch(
          setSnackbar(true, "success", "Categoría Ocupacional editada satisfactoriamente")
        );
        dispatch({ type: CATOCUP_EDIT_RESET });
        history.push("/catOcupacionales");
      }
    }
  }, [userInfo, history, success, dispatch, catOcupacionalId]);

  // Form with the initials values of the user
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      dispatch(editCatOcupacional(catOcupacionalId, values));
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
                Formulario para Editar <strong>Categorías Ocupacionales</strong>
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
                    Características de la Categoría Ocupacional
                  </h5>

                  {/* NOMBRE DE LA CATOCUP */}
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Nombre de la Categoría Ocupacional</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        id="nombre"
                        name="nombre"
                        type="text"
                        placeholder="Nombre de la Categoría Ocupacional"
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
                    <LinkContainer to="/catOcupacionales/list">
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

export default CatOcupacionalEditScreen;
