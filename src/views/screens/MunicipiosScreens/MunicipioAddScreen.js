import React, { useEffect } from "react";
import CIcon from "@coreui/icons-react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { setSnackbar } from "../../../redux/reducers/snackbarReducer";
import { addMunicipio } from "../../../redux/actions/municipiosActions";
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
  CSelect,
} from "@coreui/react";
import { LinkContainer } from "react-router-bootstrap";
import { Loader, Message } from "../../../containers/utils";
import {
  validationSchema,
} from "./options/municipioValidationSchema";
import {OBJECT_ADD_RESET} from "../../../redux/constants/objectsConstants";
import {PROVINCE_LIST_RESET} from "../../../redux/constants/provinceConstants";
import {
  redirectLogin,
  tokenhasExpired,
} from "../../../containers/utils/userloginsettings.js";
import {getProvincesList} from "../../../redux/actions/provincesActions";

function MunicipioAddScreen({ history }) {
  const dispatch = useDispatch();

  // User Login Selector
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Add Province Selector
  const addMunicipioSelector = useSelector((state) => state.addMunicipio);
  const { loading, error, success } = addMunicipioSelector;

  // Add Province Selector
  const {provinces} = useSelector((store) => store.provincesList);
  let loadedProvinces = provinces ? provinces : [];

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
        setSnackbar(true, "success", "Municipio insertado satisfactoriamente")
      );
      dispatch({ type: OBJECT_ADD_RESET });
      history.push("/municipios");
    }
  }, [userInfo, history, success, dispatch]);

  useEffect(function loadProvinces(){
    dispatch(getProvincesList())

    return () => {
      dispatch({type: PROVINCE_LIST_RESET})
    }
  },[dispatch])

  // Form with the initials values of the user

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {nombre:"", provincia:loadedProvinces[0]?.id},
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      debugger
      dispatch(addMunicipio(values));
    },
  });

  return (
    <CRow>
      <CCol xs="12">
        {error && <Message variant="danger">{error}</Message>}
        <CCard className="shadow">
          <CCardHeader>
            Formulario para Insertar <strong>Municipios</strong>
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
                Características del Municipio
              </h5>

              {/* NOMBRE DEL MUNICIPIO  */}
              <CFormGroup row>
                <CCol md="3">
                  <CLabel>Nombre del Municipio</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput
                    id="nombre"
                    name="nombre"
                    type="text"
                    placeholder="Nombre del Municipio"
                    value={formik.values.nombre}
                    invalid={formik.touched.nombre && Boolean(formik.errors.nombre)}
                    valid={formik.touched.nombre && !Boolean(formik.errors.nombre)}
                    onChange={formik.handleChange}
                  />
                  <CInvalidFeedback>{formik.errors.nombre}</CInvalidFeedback>
                </CCol>
              </CFormGroup>

              {/* PROVINCIA  */}
              <CFormGroup row>
                <CCol md="3">
                  <CLabel>Provincia a la que pertenece</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CSelect
                    id="provincia"
                    name="provincia"
                    onChange={formik.handleChange}
                    value={formik.values.provincia}
                    >
                    {loadedProvinces?.map((provincia) => <option key={provincia.id} value={provincia.id}>{provincia.nombre}</option>)}
                  </CSelect>
                </CCol>
              </CFormGroup>

            </CCardBody>

            {/* FOOTER */}
            <CCardFooter>
              {loading && <Loader />}
              <div className="float-right">
                <LinkContainer to="/municipios">
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

export default MunicipioAddScreen;
