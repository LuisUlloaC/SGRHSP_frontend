import React, {useEffect} from "react";
import CIcon from "@coreui/icons-react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { setSnackbar } from "../../../redux/reducers/snackbarReducer";
import {
  getCargoDetails,
  editCargo
} from "../../../redux/actions/cargoActions";
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
import { validationSchema } from "./options/cargoValidationSchema";
import {CARGO_EDIT_RESET} from "../../../redux/constants/cargoConstants";
import {CATOCUP_LIST_RESET} from "../../../redux/constants/catOcupacionalConstants";
import {
  redirectLogin,
  tokenhasExpired,
} from "../../../containers/utils/userloginsettings.js";
import {getCatOcupacionalList} from "../../../redux/actions/catOcupacionalActions";
import {getGrupoEscalaList} from "../../../redux/actions/grupoEscalaActions";
import {getClasificacionesList} from "../../../redux/actions/clasificacionesActions";
import {GRUPOESCALA_LIST_RESET} from "../../../redux/constants/grupoEscConstants";


function CargoEditScreen({provinceList, history, match }) {
  const dispatch = useDispatch();
  const cargoId = match.params.id;

  // User Login Selector
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Edit Selector
  const cargoDetails = useSelector((state) => state.cargoDetails);
  const { loading: loadingDetails, error: errorDetails} = cargoDetails;

  const editCargoSelector = useSelector((state) => state.cargoEdit);
  const { loading, error, success } = editCargoSelector;

  // Add catOcup Selector
  const {catOcupacionales} = useSelector((store) => store.catOcupacionalList);

  let loadedCat = catOcupacionales ? catOcupacionales : [];

  //grupoEsc Selector
  const {gruposEscala} = useSelector((store) => store.grupoEscalaList);
  let loadedGE = gruposEscala ? gruposEscala : [];

  //clasificacion Selector
  const {clasificaciones} = useSelector((store) => store.clasificacionesList);
  let loadedClas = clasificaciones ? clasificaciones : [];


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
      if (cargoId) {
        dispatch(getCargoDetails(cargoId, false));
      }
      if (success) {
        dispatch(
          setSnackbar(true, "success", "Cargo editado satisfactoriamente")
        );
        dispatch({ type: CARGO_EDIT_RESET });
        history.push("/cargos");
      }
    }
  }, [userInfo, history, success, dispatch, cargoId]);

  useEffect(function loadUtils(){
    dispatch(getCatOcupacionalList())
    dispatch(getGrupoEscalaList())
    dispatch(getClasificacionesList())

    return () => {
      dispatch({type: CATOCUP_LIST_RESET, GRUPOESCALA_LIST_RESET})
    }
  },[dispatch])

  // Form with the initials values of the user
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {nombre:"", categoriaOcupacional:loadedCat[0]?.id, grupoEscala:loadedGE[0]?.id,
      clasificacion:loadedClas[0]?.id},
    validationSchema: validationSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (values) => {
      dispatch(editCargo(cargoId, values));
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
                Formulario para Editar <strong>Cargos</strong>
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
                    Características del Cargo
                  </h5>

                  {/* NOMBRE DEL CARGO */}
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Nombre del Cargo</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CInput
                        id="nombre"
                        name="nombre"
                        type="text"
                        placeholder="Nombre del Cargo"
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


                      {/* CAT OCUp  */}
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Categoría Ocupacional</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CSelect
                        id="categoriaOcupacional"
                        name="categoriaOcupacional"
                        onChange={formik.handleChange}
                        value={formik.values.categoriaOcupacional}
                        >
                        {loadedCat?.map((obj) => <option key={obj.id} value={obj.id}>{obj.nombre}</option>)}
                      </CSelect>
                    </CCol>
                  </CFormGroup>

                  {/* GRUPESC  */}
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Grupo Escala</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CSelect
                        id="grupoEscala"
                        name="grupoEscala"
                        onChange={formik.handleChange}
                        value={formik.values.grupoEscala}
                        >
                        {loadedGE?.map((obj) => <option key={obj.id} value={obj.id}>{obj.nombre}</option>)}
                      </CSelect>
                    </CCol>
                  </CFormGroup>

                  {/* CLASIFICACION  */}
                  <CFormGroup row>
                    <CCol md="3">
                      <CLabel>Clasificación</CLabel>
                    </CCol>
                    <CCol xs="12" md="9">
                      <CSelect
                        id="clasificacion"
                        name="clasificacion"
                        onChange={formik.handleChange}
                        value={formik.values.clasificacion}
                        >
                        {loadedClas?.map((obj) => <option key={obj.id} value={obj.id}>{obj.nombre}</option>)}
                      </CSelect>
                    </CCol>
                  </CFormGroup>

                </CCardBody>

                {/* FOOTER */}
                <CCardFooter>
                  {loading && <Loader />}
                  <div className="float-right">
                    <LinkContainer to="/unidadesOrg/list">
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

export default CargoEditScreen;
