import React, { useEffect } from "react";
import CIcon from "@coreui/icons-react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { setSnackbar } from "../../../redux/reducers/snackbarReducer";
import {addPersonal} from "../../../redux/actions/personalAction";
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
} from "./options/personalValidationSchema";
import {OBJECT_ADD_RESET} from "../../../redux/constants/objectsConstants";
import {
  redirectLogin,
  tokenhasExpired,
} from "../../../containers/utils/userloginsettings.js";
import {getFuenteProcList} from "../../../redux/actions/fuenteProcActions";
import {getMotivoBajaList} from "../../../redux/actions/motivoBajaActions";
import {getPlazasList} from "../../../redux/actions/plazaActions";
import {PLAZA_LIST_RESET} from "../../../redux/constants/plazaConstant";
import {MOTIVOBAJA_LIST_RESET} from "../../../redux/constants/motivoBajaConstant";
import {FUENTEPROCEDENCIA_LIST_RESET} from "../../../redux/constants/fuengeProcConstant";

function PersonalAddScreen({ history }) {
  const dispatch = useDispatch();

  // User Login Selector
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Add Selector
  const addPersonalSelector = useSelector((state) => state.addPersonal);
  const { loading, error, success } = addPersonalSelector;

  //Selector
  const {fuentesProcedencia} = useSelector((store) => store.fuenteProcList);
  let loadedFuentes = fuentesProcedencia ? fuentesProcedencia : [];

  //Selector
  const {motivosBaja} = useSelector((store) => store.motivosBajaList);
  let loadedMotivos = motivosBaja ? motivosBaja : [];

  //Selector
  const {plazas} = useSelector((store) => store.plazasList);
  let loadedPlaza = plazas ? plazas : [];

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
        setSnackbar(true, "success", "Personal insertado satisfactoriamente")
      );
      dispatch({ type: OBJECT_ADD_RESET });
      history.push("/personal");
    }
  }, [userInfo, history, success, dispatch]);

  useEffect(function loadUtils(){
    dispatch(getFuenteProcList())
    dispatch(getMotivoBajaList())
    dispatch(getPlazasList())

    return () => {
      dispatch({type: FUENTEPROCEDENCIA_LIST_RESET, MOTIVOBAJA_LIST_RESET, PLAZA_LIST_RESET})
    }
  },[dispatch])


  // Form with the initials values of the user
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {nombre:"",apellidos:"",sexo:"",ci:"",direccionParticular:"",
      fechaAlta:"",fechaBaja:"", fuenteProcedencia:loadedFuentes[0]?.id, motivoBaja:loadedMotivos[0]?.id,
      plaza:loadedPlaza[0]?.id},
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      dispatch(addPersonal(values));
    },
  });

  return (
        <CRow>
          <CCol xs="12">
            {error && <Message variant="danger">{error}</Message>}
            <CCard className="shadow">
              <CCardHeader>
                Formulario para Insertar <strong>Personal</strong>
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
                    Características del Personal
                  </h5>

                  {/* NOMBRE */}
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Nombre</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        id="nombre"
                        name="nombre"
                        type="text"
                        placeholder="Nombre"
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

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Apellidos</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        id="apellidos"
                        name="apellidos"
                        type="text"
                        placeholder="Apellidos"
                        value={formik.values.apellidos}
                        invalid={
                          formik.touched.apellidos && Boolean(formik.errors.apellidos)
                        }
                        valid={
                          formik.touched.apellidos && !Boolean(formik.errors.apellidos)
                        }
                        onChange={formik.handleChange}
                      />
                      <CInvalidFeedback>{formik.errors.apellidos}</CInvalidFeedback>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Sexo</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        id="sexo"
                        name="sexo"
                        type="text"
                        placeholder="Sexo"
                        value={formik.values.sexo}
                        invalid={
                          formik.touched.sexo && Boolean(formik.errors.sexo)
                        }
                        valid={
                          formik.touched.sexo && !Boolean(formik.errors.sexo)
                        }
                        onChange={formik.handleChange}
                      />
                      <CInvalidFeedback>{formik.errors.sexo}</CInvalidFeedback>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>CI</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        id="ci"
                        name="ci"
                        type="text"
                        placeholder="CI"
                        value={formik.values.ci}
                        invalid={
                          formik.touched.ci && Boolean(formik.errors.ci)
                        }
                        valid={
                          formik.touched.ci && !Boolean(formik.errors.ci)
                        }
                        onChange={formik.handleChange}
                      />
                      <CInvalidFeedback>{formik.errors.ci}</CInvalidFeedback>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Dirección Particular</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        id="direccionParticular"
                        name="direccionParticular"
                        type="text"
                        placeholder="Dirección Particular"
                        value={formik.values.direccionParticular}
                        invalid={
                          formik.touched.direccionParticular && Boolean(formik.errors.direccionParticular)
                        }
                        valid={
                          formik.touched.direccionParticular && !Boolean(formik.errors.direccionParticular)
                        }
                        onChange={formik.handleChange}
                      />
                      <CInvalidFeedback>{formik.errors.direccionParticular}</CInvalidFeedback>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Fecha de Alta</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        id="fechaAlta"
                        name="fechaAlta"
                        type="text"
                        placeholder="Fecha de Alta"
                        value={formik.values.fechaAlta}
                        invalid={
                          formik.touched.fechaAlta && Boolean(formik.errors.fechaAlta)
                        }
                        valid={
                          formik.touched.fechaAlta && !Boolean(formik.errors.fechaAlta)
                        }
                        onChange={formik.handleChange}
                      />
                      <CInvalidFeedback>{formik.errors.fechaAlta}</CInvalidFeedback>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Fecha de Baja</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        id="fechaBaja"
                        name="fechaBaja"
                        type="text"
                        placeholder="Fecha de Baja"
                        value={formik.values.fechaBaja}
                        invalid={
                          formik.touched.fechaBaja && Boolean(formik.errors.fechaBaja)
                        }
                        valid={
                          formik.touched.fechaBaja && !Boolean(formik.errors.fechaBaja)
                        }
                        onChange={formik.handleChange}
                      />
                      <CInvalidFeedback>{formik.errors.fechaBaja}</CInvalidFeedback>
                    </CCol>
                  </CFormGroup>


                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Fuente de Procedencia</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CSelect
                        id="fuenteProcedencia"
                        name="fuenteProcedencia"
                        onChange={formik.handleChange}
                        value={formik.values.fuenteProcedencia}
                        >
                        {loadedFuentes?.map((obj) => <option key={obj.id} value={obj.id}>{obj.nombre}</option>)}
                      </CSelect>
                    </CCol>
                  </CFormGroup>


                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Motivo de Baja</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CSelect
                        id="motivoBaja"
                        name="motivoBaja"
                        onChange={formik.handleChange}
                        value={formik.values.motivoBaja}
                        >
                        {loadedMotivos?.map((motivos) => <option key={motivos.id} value={motivos.id}>{motivos.nombre}</option>)}
                      </CSelect>
                    </CCol>
                  </CFormGroup>


                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Plaza</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CSelect
                        id="plaza"
                        name="plaza"
                        onChange={formik.handleChange}
                        value={formik.values.plaza}
                        >
                        {loadedPlaza?.map((plaza) => <option key={plaza.id} value={plaza.id}>{plaza.nombre}</option>)}
                      </CSelect>
                    </CCol>
                  </CFormGroup>

                </CCardBody>

                {/* FOOTER */}
                <CCardFooter>
                  {loading && <Loader />}
                  <div className="float-right">
                    <LinkContainer to="/personal/list">
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
  );
}

export default PersonalAddScreen;
