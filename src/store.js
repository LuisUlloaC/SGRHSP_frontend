import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// Reducers Imports
import { sidebarShowReducer } from "./redux/reducers/sidebarReducer";
import { snackbarReducer } from "./redux/reducers/snackbarReducer";

// USERS REDUCERS IMPORTS
import {
  userLoginReducers,
  userListReducer,
  userDeleteReducer,
  userCreateReducer,
  userDetailsReducers,
  userUpdateReducer,
  userUpdatePasswordReducer,
  userEditUpdatePasswordReducer,
} from "./redux/reducers/userReducers";

//PROVINCES REDUCERS IMPORTS
import {
  provinceListReducer,
  addProvinceReducer,
  deleteProvincesReducer,
  provinceDetailsReducers,
  editProvinceReducer,
} from "./redux/reducers/provincesReducer";

//MUNICIPIOS REDUCERS IMPORTS
import {
  municipioListReducer,
  editMunicipioReducer,
  deleteMunicipiosReducer,
  municipioDetailsReducers,
  addMunicipioReducer,
} from "./redux/reducers/municipioReducer";

//CLASIFICACIONES REDUCERS IMPORTS
import {
  clasificacionListReducer,
  editClasificacionReducer,
  deleteClasificacionesReducer,
  clasificacionDetailsReducers,
  addClasificacionReducer,
} from "./redux/reducers/clasificacionReducer";

//CATEGORIAS OCUPACIONALES REDUCERS IMPORTS
import {
  catOcupacionalListReducer,
  editCatOcupacionalReducer,
  deleteCatOcupacionalesReducer,
  catOcupacionalDetailsReducers,
  addCatOcupacionalReducer,
} from "./redux/reducers/catOcupacionalReducers";

//GRUPOS ESCALA REDUCERS IMPORTS
import {
  grupoEscalaListReducer,
  editGrupoEscalaReducer,
  deleteGruposEscalaReducer,
  grupoEscalaDetailsReducers,
  addGrupoEscalaReducer,
} from "./redux/reducers/grupoEscalaReducer";

//FUENTES PROCEDENCIA REDUCERS IMPORTS
import {
  fuenteProcListReducer,
  editFuenteProcReducer,
  deleteFuenteProcReducer,
  fuenteProcDetailsReducers,
  addFuenteProcReducer,
} from "./redux/reducers/fuenteProcReducer";

//MOTIVO BAJA REDUCERS IMPORT
import {
  motivoBajaListReducer,
  editMotivoBajaReducer,
  deleteMotivoBajaReducer,
  motivoBajaDetailsReducers,
  addMotivoBajaReducer,
} from "./redux/reducers/motivoBajaReducer";

//NIVEL PREP REDUCERS IMPORT
import {
  nivelPrepListReducer,
  ediNivelPrepReducer,
  deleteNivelPrepReducer,
  nivelPrepDetailsReducers,
  addNivelPrepReducer,
} from "./redux/reducers/nivelPrepReducers";

//UNIDAD REDUCERS IMPORT
import {
  unidadDetailsReducers,
  editUnidadReducer,
  deleteUnidadesReducer,
  unidadListReducer,
  addUnidadReducer,
} from "./redux/reducers/unidadReducer";

//UNIDAD ORG REDUCERS IMPORT
import {
  unidadOrgDetailsReducers,
  editUnidadOrgReducer,
  deleteUnidadesOrgReducer,
  unidadOrgListReducer,
  addUnidadOrgReducer,
} from "./redux/reducers/unidadOrgaanizativaReducer";

//CARGO REDUCERS IMPORT
import {
  cargoListReducer,
  cargoDetailsReducers,
  deleteCargoReducer,
  addCargoReducer,
  editCargoReducer,
} from "./redux/reducers/cargoReducer";

//CARGO REDUCERS IMPORT
import {
  plazaListReducer,
  plazaDetailsReducers,
  deletePlazaReducer,
  addPlazaReducer,
  editPlazaReducer,
} from "./redux/reducers/plazaReducer";

//PERSONAL REDUCERS IMPORT
import {
  personalListReducer,
  personalDetailsReducers,
  deletePersonalReducer,
  addPersonalReducer,
  editPersonalReducer,
} from "./redux/reducers/personalReducer";

// DashBoard Reducers
import {
  numbersReducers,
  trabXClasReducers,
  munXClasReducers,
  catOcupXTrabReducers,
  nivPrepXTrabReducers,
  unidadOrgXNivPrepReducers,
} from './redux/reducers/dashboardReducers';

// Obtain the authenticated user from localstorage
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// Inicial redux Store State
export const initialState = {
  sidebarShow: "responsive",
  userLogin: { userInfo: userInfoFromStorage },
};

// Reducers del Store de Redux
const reducers = combineReducers({
  // Static App Reducers
  snackbar: snackbarReducer,
  sidebarShow: sidebarShowReducer,

  // Users Reducers
  userLogin: userLoginReducers,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userCreate: userCreateReducer,
  userUpdate: userUpdateReducer,
  userDetails: userDetailsReducers,
  userUpdatePassword: userUpdatePasswordReducer,
  userEditUpdatePassword: userEditUpdatePasswordReducer,

  //Provinces Reducers:
  provincesList:provinceListReducer,
  provinceDelete:deleteProvincesReducer,
  addProvince:addProvinceReducer,
  provinceEdit:editProvinceReducer,
  provinceDetails:provinceDetailsReducers,

  //Municipios Reducers:
  municipiosList:municipioListReducer,
  municipioDelete:deleteMunicipiosReducer,
  addMunicipio:addMunicipioReducer,
  municipioEdit:editMunicipioReducer,
  municipioDetails:municipioDetailsReducers,

  //Clasificaciones Reducers:
  clasificacionesList:clasificacionListReducer,
  clasificacionDelete:deleteClasificacionesReducer,
  addClasificacion:addClasificacionReducer,
  clasificacionEdit:editClasificacionReducer,
  clasificacionDetails:clasificacionDetailsReducers,

  //Categoria Ocupacional Reducers:
  catOcupacionalList:catOcupacionalListReducer,
  catOcupacionalDelete:deleteCatOcupacionalesReducer,
  addCatOcupacional:addCatOcupacionalReducer,
  catOcupacionalEdit:editCatOcupacionalReducer,
  catOcupacionalDetails:catOcupacionalDetailsReducers,

  //Grupo Escala Reducers:
  grupoEscalaList:grupoEscalaListReducer,
  grupoEscalaDelete:deleteGruposEscalaReducer,
  addGrupoEscala:addGrupoEscalaReducer,
  grupoEscalaEdit:editGrupoEscalaReducer,
  grupoEscalaDetails:grupoEscalaDetailsReducers,

  //Fuente Procedencia Reducers:
  fuenteProcList:fuenteProcListReducer,
  fuenteProcDelete:deleteFuenteProcReducer,
  addFuenteProc:addFuenteProcReducer,
  fuenteProcEdit:editFuenteProcReducer,
  fuenteProcDetails:fuenteProcDetailsReducers,


  //Motvio Baja Reducers:
  motivosBajaList:motivoBajaListReducer,
  motivosBajaDelete:deleteMotivoBajaReducer,
  addMotivoBaja:addMotivoBajaReducer,
  moitvoBajaEdit:editMotivoBajaReducer,
  motivoBajaDetails:motivoBajaDetailsReducers,

  //Nivel Prep Reducers:
  nivelesPrepList:nivelPrepListReducer,
  nivelesPrepDelete:deleteNivelPrepReducer,
  addNivelPrep:addNivelPrepReducer,
  nivelPrepEdit:ediNivelPrepReducer,
  nivelPrepDetails:nivelPrepDetailsReducers,

  //Unidad Reducers:
  unidadesList:unidadListReducer,
  unidadesDelete:deleteUnidadesReducer,
  addUnidad:addUnidadReducer,
  unidadEdit:editUnidadReducer,
  unidadDetails:unidadDetailsReducers,

  //Unidad Org Reducers:
  unidadesOrgList:unidadOrgListReducer,
  unidadesOrgDelete:deleteUnidadesOrgReducer,
  addUnidadOrg:addUnidadOrgReducer,
  unidadOrgEdit:editUnidadOrgReducer,
  unidadOrgDetails:unidadOrgDetailsReducers,

  //Cargo Reducers:
  cargosList:cargoListReducer,
  cargosDelete:deleteCargoReducer,
  addCargo:addCargoReducer,
  cargoEdit:editCargoReducer,
  cargoDetails:cargoDetailsReducers,

  //Plaza Reducers:
  plazasList:plazaListReducer,
  plazasDelete:deletePlazaReducer,
  addPlaza:addPlazaReducer,
  plazaEdit:editPlazaReducer,
  plazaDetails:plazaDetailsReducers,

  //Personal Reducers:
  personalList:personalListReducer,
  personalDelete:deletePersonalReducer,
  addPersonal:addPersonalReducer,
  personalEdit:editPersonalReducer,
  personalDetails:personalDetailsReducers,

  // DashBoard Reducers:
  numbers: numbersReducers,
  trabXClas: trabXClasReducers,
  munXClas: munXClasReducers,
  catOcupXTrab: catOcupXTrabReducers,
  nivPrepXTrab: nivPrepXTrabReducers,
  unidadOrgXNivPrep: unidadOrgXNivPrepReducers
});

const middleware = [thunk];

// Creacion del Store
const store = createStore(
  reducers,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
