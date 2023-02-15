import React, { useEffect } from "react";
import CIcon from "@coreui/icons-react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { setSnackbar } from "../../../redux/reducers/snackbarReducer";
import {addPlaza} from "../../../redux/actions/plazaActions";
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
} from "./options/plazaValidationSchema";
import {PLAZA_ADD_RESET, PLAZA_LIST_RESET} from "../../../redux/constants/plazaConstant";
import {
  redirectLogin,
  tokenhasExpired,
} from "../../../containers/utils/userloginsettings.js";
import {getUnidadOrgList} from "../../../redux/actions/unidadOrganizativaActions";
import {getNivelPrepList} from "../../../redux/actions/nivelPrepActions";
import {getCargosList} from "../../../redux/actions/cargoActions";
import {CARGO_LIST_RESET} from "../../../redux/constants/cargoConstants";
import {NIVELPREPARACION_LIST_RESET} from "../../../redux/constants/nivelPrepConstants";

function PlazaAddScreen({ history }) {
  const dispatch = useDispatch();

  // User Login Selector
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Add Selector
  const addPlazaSelector = useSelector((state) => state.addPlaza);
  const { loading, error, success } = addPlazaSelector;

  //Selector
  const {unidadesOrg} = useSelector((store) => store.unidadesOrgList);
  let loadedUnOrg = unidadesOrg ? unidadesOrg : [];

  //Selector
  const {cargos} = useSelector((store) => store.cargosList);
  let loadedCargos = cargos ? cargos : [];

  //Selector
  const {nivelesPrep} = useSelector((store) => store.nivelesPrepList);
  let loadedNivPrep = nivelesPrep ? nivelesPrep : [];

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
        setSnackbar(true, "success", "Plaza insertada satisfactoriamente")
      );
      dispatch({ type: PLAZA_ADD_RESET });
      history.push("/plazas");
    }
  }, [userInfo, history, success, dispatch]);

  useEffect(function loadUtils(){
    dispatch(getUnidadOrgList())
    dispatch(getCargosList())
    dispatch(getNivelPrepList())

    return () => {
      dispatch({type: PLAZA_LIST_RESET, CARGO_LIST_RESET, NIVELPREPARACION_LIST_RESET})
    }
  },[dispatch])


  // Form with the initials values of the user

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {nombre:"",cantidad:"",necesarios:"",cubiertas:"",mision:"",
      unidadOrganizativa:loadedUnOrg[0]?.id, cargo:loadedCargos[0]?.id, nivelPreparacion:loadedNivPrep[0]?.id},
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      dispatch(addPlaza(values));
    },
  });

  return (
        <CRow>
          <CCol xs="12">
            {error && <Message variant="danger">{error}</Message>}
            <CCard className="shadow">
              <CCardHeader>
                Formulario para Insertar <strong>Plazas</strong>
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
                    Características de la Plaza
                  </h5>

                  {/* NOMBRE DE LA PLAZA */}
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Nombre de la Plaza</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        id="nombre"
                        name="nombre"
                        type="text"
                        placeholder="Nombre de la Plaza"
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
                      <CLabel>Cantidad de Plazas</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        id="cantidad"
                        name="cantidad"
                        type="text"
                        placeholder="Cantidad de Plazas"
                        value={formik.values.cantidad}
                        invalid={
                          formik.touched.cantidad && Boolean(formik.errors.cantidad)
                        }
                        valid={
                          formik.touched.cantidad && !Boolean(formik.errors.cantidad)
                        }
                        onChange={formik.handleChange}
                      />
                      <CInvalidFeedback>{formik.errors.cantidad}</CInvalidFeedback>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Plazas Necesarias</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        id="necesarios"
                        name="necesarios"
                        type="text"
                        placeholder="Plazas necesarias"
                        value={formik.values.necesarios}
                        invalid={
                          formik.touched.necesarios && Boolean(formik.errors.necesarios)
                        }
                        valid={
                          formik.touched.necesarios && !Boolean(formik.errors.necesarios)
                        }
                        onChange={formik.handleChange}
                      />
                      <CInvalidFeedback>{formik.errors.necesarios}</CInvalidFeedback>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Plazas Cubiertas</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        id="cubiertas"
                        name="cubiertas"
                        type="text"
                        placeholder="Plazas Cubiertas"
                        value={formik.values.cubiertas}
                        invalid={
                          formik.touched.cubiertas && Boolean(formik.errors.cubiertas)
                        }
                        valid={
                          formik.touched.cubiertas && !Boolean(formik.errors.cubiertas)
                        }
                        onChange={formik.handleChange}
                      />
                      <CInvalidFeedback>{formik.errors.cubiertas}</CInvalidFeedback>
                    </CCol>
                  </CFormGroup>

                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Plazas de misión</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        id="mision"
                        name="mision"
                        type="text"
                        placeholder="Plazas de Misión"
                        value={formik.values.mision}
                        invalid={
                          formik.touched.mision && Boolean(formik.errors.mision)
                        }
                        valid={
                          formik.touched.mision && !Boolean(formik.errors.mision)
                        }
                        onChange={formik.handleChange}
                      />
                      <CInvalidFeedback>{formik.errors.mision}</CInvalidFeedback>
                    </CCol>
                  </CFormGroup>


                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Unidad Organizativa</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CSelect
                        id="unidadOrganizativa"
                        name="unidadOrganizativa"
                        onChange={formik.handleChange}
                        value={formik.values.unidadOrganizativa}
                        >
                        {loadedUnOrg?.map((obj) => <option key={obj.id} value={obj.id}>{obj.nombre}</option>)}
                      </CSelect>
                    </CCol>
                  </CFormGroup>


                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Cargo</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CSelect
                        id="cargo"
                        name="cargo"
                        onChange={formik.handleChange}
                        value={formik.values.cargo}
                        >
                        {loadedCargos?.map((cargo) => <option key={cargo.id} value={cargo.id}>{cargo.nombre}</option>)}
                      </CSelect>
                    </CCol>
                  </CFormGroup>


                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Nivel de Preparación</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CSelect
                        id="nivelPreparacion"
                        name="nivelPreparacion"
                        onChange={formik.handleChange}
                        value={formik.values.nivelPreparacion}
                        >
                        {loadedNivPrep?.map((nivPrep) => <option key={nivPrep.id} value={nivPrep.id}>{nivPrep.nombre}</option>)}
                      </CSelect>
                    </CCol>
                  </CFormGroup>

                </CCardBody>

                {/* FOOTER */}
                <CCardFooter>
                  {loading && <Loader />}
                  <div className="float-right">
                    <LinkContainer to="/plazas/list">
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

export default PlazaAddScreen;
