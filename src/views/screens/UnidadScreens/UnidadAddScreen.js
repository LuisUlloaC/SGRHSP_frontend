import React, { useEffect } from "react";
import CIcon from "@coreui/icons-react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { setSnackbar } from "../../../redux/reducers/snackbarReducer";
import { addUnidad } from "../../../redux/actions/unidadActions";
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
} from "./options/unidadValidationSchema";
import {OBJECT_ADD_RESET, OBJECT_LIST_RESET} from "../../../redux/constants/objectsConstants";
import {
  redirectLogin,
  tokenhasExpired,
} from "../../../containers/utils/userloginsettings.js";
import {getMunicipiosList} from "../../../redux/actions/municipiosActions";

function UnidadAddScreen({ history }) {
  const dispatch = useDispatch();

  // User Login Selector
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Add Selector
  const addUnidadSelector = useSelector((state) => state.addUnidad);
  const { loading, error, success } = addUnidadSelector;

  // Add Province Selector
  const {municipios} = useSelector((store) => store.municipiosList);
  let loadedMun = municipios ? municipios : [];

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
        setSnackbar(true, "success", "Unidad insertada satisfactoriamente")
      );
      dispatch({ type: OBJECT_ADD_RESET });
      history.push("/unidades");
    }
  }, [userInfo, history, success, dispatch]);

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
      dispatch(addUnidad(values));
    },
  });

  return (
    <CRow>
      <CCol xs="12">
        {error && <Message variant="danger">{error}</Message>}
        <CCard className="shadow">
          <CCardHeader>
            Formulario para Insertar <strong>Unidades</strong>
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

              {/* NOMBRE DE LA UNIDAD  */}
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
                    invalid={formik.touched.nombre && Boolean(formik.errors.nombre)}
                    valid={formik.touched.nombre && !Boolean(formik.errors.nombre)}
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
                <LinkContainer to="/unidades">
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

export default UnidadAddScreen;
