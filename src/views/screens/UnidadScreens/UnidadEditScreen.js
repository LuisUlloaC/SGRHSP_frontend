import React, {useEffect} from "react";
import CIcon from "@coreui/icons-react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { setSnackbar } from "../../../redux/reducers/snackbarReducer";
import {
  getUnidadDetails,
  editUnidad
} from "../../../redux/actions/unidadActions";
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
  CRow, CSelect,
} from "@coreui/react";
import { LinkContainer } from "react-router-bootstrap";
import { Loader, Message } from "../../../containers/utils";
import { initialValues, validationSchema } from "./options/unidadValidationSchema";
import {OBJECT_EDIT_RESET, OBJECT_LIST_RESET} from "../../../redux/constants/objectsConstants";
import {
  redirectLogin,
  tokenhasExpired,
} from "../../../containers/utils/userloginsettings.js";
import {getMunicipiosList} from "../../../redux/actions/municipiosActions";


function UnidadEditScreen({provinceList, history, match }) {
  const dispatch = useDispatch();
  const unidadId = match.params.id;

  // User Login Selector
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  // Details Selector
  const unidadDetails = useSelector((state) => state.unidadDetails);
  const { loading: loadingDetails, error: errorDetails, unidad } = unidadDetails;
  // EDIT Selector
  const editUnidadSelector = useSelector((state) => state.unidadEdit);
  const { loading, error, success } = editUnidadSelector;
  // Add Selector
  const {municipios} = useSelector((store) => store.municipiosList);
  let loadedMun = municipios ? municipios : [];


  // Init Municipio Values on Form
  initialValues.nombre = unidad?.nombre;

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
      if (unidadId) {
        dispatch(getUnidadDetails(unidadId, false));
      }
      if (success) {
        dispatch(
          setSnackbar(true, "success", "Unidad editada satisfactoriamente")
        );
        dispatch({ type: OBJECT_EDIT_RESET });
        history.push("/unidades");
      }
    }
  }, [userInfo, history, success, dispatch, unidadId]);

  useEffect(function loadMunicipios(){
    dispatch(getMunicipiosList())

    return () => {
      dispatch({type: OBJECT_LIST_RESET})
    }
  },[dispatch])


  // Form with the initials values of the user
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {nombre:"", municipio:loadedMun[0]?.id},
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      dispatch(editUnidad(unidadId, values));
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
                Formulario para Editar <strong>Unidades</strong>
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
                    Características de la Unidad
                  </h5>

                  {/* NOMBRE DE LA UNIDAD */}
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Nombre de la Unidad</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        id="nombre"
                        name="nombre"
                        type="text"
                        placeholder="Nombre de la Unidad"
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


                  {/* MUNICIPIO  */}
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Municipio al que pertenece</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CSelect
                        id="municipio"
                        name="municipio"
                        onChange={formik.handleChange}
                        value={formik.values.municipio}
                        >
                        {loadedMun?.map((municipio) => <option key={municipio.id} value={municipio.id}>{municipio.nombre}</option>)}
                      </CSelect>
                    </CCol>
                  </CFormGroup>

                </CCardBody>

                {/* FOOTER */}
                <CCardFooter>
                  {loading && <Loader />}
                  <div className="float-right">
                    <LinkContainer to="/unidades/list">
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

export default UnidadEditScreen;
