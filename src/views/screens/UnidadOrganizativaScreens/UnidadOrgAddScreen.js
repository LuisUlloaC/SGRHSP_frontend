import React, { useEffect } from "react";
import CIcon from "@coreui/icons-react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { setSnackbar } from "../../../redux/reducers/snackbarReducer";
import { addUnidadOrg } from "../../../redux/actions/unidadOrganizativaActions";
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
import {getUnidadList} from "../../../redux/actions/unidadActions";

function UnidadOrgAddScreen({ history }) {
  const dispatch = useDispatch();

  // User Login Selector
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Add Selector
  const addUnidadOrgSelector = useSelector((state) => state.addUnidadOrg);
  const { loading, error, success } = addUnidadOrgSelector;

  // Add Province Selector
  const {unidades} = useSelector((store) => store.unidadesList);
  let loaded = unidades ? unidades : [];

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
      history.push("/unidadesOrg");
    }
  }, [userInfo, history, success, dispatch]);

  useEffect(function loadUnidades(){
    dispatch(getUnidadList())

    return () => {
      dispatch({type: OBJECT_LIST_RESET})
    }
  },[dispatch])

  // Form with the initials values of the user

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {nombre:"", unidad:loaded[0]?.id},
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      dispatch(addUnidadOrg(values));
    },
  });

  return (
    <CRow>
      <CCol xs="12">
        {error && <Message variant="danger">{error}</Message>}
        <CCard className="shadow">
          <CCardHeader>
            Formulario para Insertar <strong>Unidades Organizativas</strong>
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
                Características de la Unidad Organizativa
              </h5>

              {/* NOMBRE DE LA UNIDAD  */}
              <CFormGroup row>
                <CCol md="3">
                  <CLabel>Nombre de la Unidad Organizativa</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput
                    id="nombre"
                    name="nombre"
                    type="text"
                    placeholder="Nombre de la Unidad Organizativa"
                    value={formik.values.nombre}
                    invalid={formik.touched.nombre && Boolean(formik.errors.nombre)}
                    valid={formik.touched.nombre && !Boolean(formik.errors.nombre)}
                    onChange={formik.handleChange}
                  />
                  <CInvalidFeedback>{formik.errors.nombre}</CInvalidFeedback>
                </CCol>
              </CFormGroup>

              {/* UNIDAD  */}
              <CFormGroup row>
                <CCol md="3">
                  <CLabel>Unidad a la que pertenece</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CSelect
                    id="municipio"
                    name="municipio"
                    onChange={formik.handleChange}
                    value={formik.values.unidad}
                    >
                    {loaded?.map((unidad) => <option key={unidad.id} value={unidad.id}>{unidad.nombre}</option>)}
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

export default UnidadOrgAddScreen;
