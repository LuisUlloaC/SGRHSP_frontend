import React, { useEffect } from "react";
import CIcon from "@coreui/icons-react";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { setSnackbar } from "../../../redux/reducers/snackbarReducer";
import { addCargo } from "../../../redux/actions/cargoActions";
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
} from "./options/cargoValidationSchema";
import {CARGO_ADD_RESET, CARGO_LIST_RESET} from "../../../redux/constants/cargoConstants";
import {
  redirectLogin,
  tokenhasExpired,
} from "../../../containers/utils/userloginsettings.js";
import {getCatOcupacionalList} from "../../../redux/actions/catOcupacionalActions";
import {getGrupoEscalaList} from "../../../redux/actions/grupoEscalaActions";
import {getClasificacionesList} from "../../../redux/actions/clasificacionesActions";
import {CATOCUP_LIST_RESET} from "../../../redux/constants/catOcupacionalConstants";
import {GRUPOESCALA_LIST_RESET} from "../../../redux/constants/grupoEscConstants";

function CargoAddScreen({ history }) {
  const dispatch = useDispatch();

  // User Login Selector
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Add Selector
  const addCargoSelector = useSelector((state) => state.addCargo);
  const { loading, error, success } = addCargoSelector;

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
    }
    if (tokenhasExpired(userInfo)) {
      redirectLogin(history, dispatch);
    }
    if (success) {
      dispatch(
        setSnackbar(true, "success", "Cargo insertado satisfactoriamente")
      );
      dispatch({ type: CARGO_ADD_RESET });
      history.push("/cargos");
    }
  }, [userInfo, history, success, dispatch]);

  useEffect(() => {
    dispatch(getClasificacionesList());
    dispatch(getCatOcupacionalList());
    dispatch(getGrupoEscalaList());
    dispatch({type: CARGO_LIST_RESET});
    dispatch({type: GRUPOESCALA_LIST_RESET});
    dispatch({type: CATOCUP_LIST_RESET});

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
      dispatch(addCargo(values));
    },
  });

  debugger
  return (
    <CRow>
      <CCol xs="12">
        {error && <Message variant="danger">{error}</Message>}
        <CCard className="shadow">
          <CCardHeader>
            Formulario para Insertar <strong>Cargos</strong>
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

              {/* NOMBRE DEL CARGO  */}
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
                    invalid={formik.touched.nombre && Boolean(formik.errors.nombre)}
                    valid={formik.touched.nombre && !Boolean(formik.errors.nombre)}
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
                    {loadedCat?.map((cat) => <option key={cat.id} value={cat.id}>{cat.nombre}</option>)}
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
                    {loadedGE?.map((grupoEsc) => <option key={grupoEsc.id} value={grupoEsc.id}>{grupoEsc.nombre}</option>)}
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
                    {loadedClas?.map((clas) => <option key={clas.id} value={clas.id}>{clas.nombre}</option>)}
                  </CSelect>
                </CCol>
              </CFormGroup>

            </CCardBody>

            {/* FOOTER */}
            <CCardFooter>
              {loading && <Loader />}
              <div className="float-right">
                <LinkContainer to="/cargos">
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

export default CargoAddScreen;
