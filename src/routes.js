import React from 'react';

const HomeScreen = React.lazy(() => import('./views/screens/HomeScreens/HomeScreen'));

// Users Components
const UserListScreen = React.lazy(() => import('./views/screens/usersScreens/UserListScreen'));
const UserAddScreen = React.lazy(() => import('./views/screens/usersScreens/UserAddScreen'));
const UserEditScreen = React.lazy(() => import('./views/screens/usersScreens/editScreens/UserEditScreen'));
const UserProfile = React.lazy(() => import('./views/screens/usersScreens/profileScreen/UserProfile'));

// Province Components
const ProvincesList = React.lazy(() => import('./views/screens/ProvinceScreens/ProvinceListScreen'))
const ProvincesAdd = React.lazy(() => import('./views/screens/ProvinceScreens/ProvinceAddScreen'))
const ProvincesEdit = React.lazy(() => import('./views/screens/ProvinceScreens/ProvinceEditScreen'))

// Municipios Components
const MunicipiosList = React.lazy(() => import('./views/screens/MunicipiosScreens/MunicipioListScreen'))
const MunicipiosAdd = React.lazy(() => import('./views/screens/MunicipiosScreens/MunicipioAddScreen'))
const MunicipiosEdit = React.lazy(() => import('./views/screens/MunicipiosScreens/MunicipioEditScreen'))

// Clasificaciones Components
const ClasificacionesList = React.lazy(() => import('./views/screens/ClasificacionesScreens/ClaasificacionesListScreen'))
const ClasificacionesAdd = React.lazy(() => import('./views/screens/ClasificacionesScreens/ClasificacionAddScreen'))
const ClasificacionesEdit = React.lazy(() => import('./views/screens/ClasificacionesScreens/ClasificacionEditScreen'))

// Cat Ocupacionales Components
const CatOcupacionalList = React.lazy(() => import('./views/screens/CategoriaOcupacionalScreens/CatOcupacionalListScreen'))
const CatOcupacionalAdd = React.lazy(() => import('./views/screens/CategoriaOcupacionalScreens/CatOcupacionalAddScreen'))
const CatOcuppacionalEdit = React.lazy(() => import('./views/screens/CategoriaOcupacionalScreens/CatOcupacionalEditScreen'))

// Grupo Escala Components
const GrupoEscalaList = React.lazy(() => import('./views/screens/GrupoEscalaScreens/GrupoEscalaListScreen'))
const GrupoEscalaAdd = React.lazy(() => import('./views/screens/GrupoEscalaScreens/GrupoEscalaAddScreen'))
const GrupoEscalaEdit = React.lazy(() => import('./views/screens/GrupoEscalaScreens/GrupoEscalaEditScreen'))

// Fuente Procedencia Components
const FuenteProcList = React.lazy(() => import('./views/screens/FuenteProcedenciaScreens/FuenteProcListScreen'))
const FuenteProcAdd = React.lazy(() => import('./views/screens/FuenteProcedenciaScreens/FuenteProcedenciaAddScreen'))
const FuenteProcEdit = React.lazy(() => import('./views/screens/FuenteProcedenciaScreens/FuenteProcEditScreen'))

// Motivo Baja Components
const MotivoBajaList = React.lazy(() => import('./views/screens/MotivoBajaScreens/MotivoBajaListScreen'))
const MotivoBajaAdd = React.lazy(() => import('./views/screens/MotivoBajaScreens/MotivoBajaAddScreen'))
const MotivoBajaEdit = React.lazy(() => import('./views/screens/MotivoBajaScreens/MotivoBajaEditScreen'))

// Nivel Prep Components
const NivelPrepList = React.lazy(() => import('./views/screens/NivelPrepScreens/NivelPrepListScreen'))
const NivelPrepAdd = React.lazy(() => import('./views/screens/NivelPrepScreens/NivelPrepAddScreen'))
const NivelPrepEdit = React.lazy(() => import('./views/screens/NivelPrepScreens/NivelPrepEditScreen'))

// Unidad Components
const UnidadList = React.lazy(() => import('./views/screens/UnidadScreens/UnidadListScreen'))
const UnidadAdd = React.lazy(() => import('./views/screens/UnidadScreens/UnidadAddScreen'))
const UnidadEdit = React.lazy(() => import('./views/screens/UnidadScreens/UnidadEditScreen'))

// Unidad Org Components
const UnidadOrgList = React.lazy(() => import('./views/screens/UnidadOrganizativaScreens/UnidadOrgListScreen'))
const UnidadOrgAdd = React.lazy(() => import('./views/screens/UnidadOrganizativaScreens/UnidadOrgAddScreen'))
const UnidadOrgEdit = React.lazy(() => import('./views/screens/UnidadOrganizativaScreens/UnidadOrgEditScreen'))

// Cargo Components
const CargoList = React.lazy(() => import('./views/screens/CargoScreens/CargoListScreen'))
const CargoAdd = React.lazy(() => import('./views/screens/CargoScreens/CargoAddScreen'))
const CargoEdit = React.lazy(() => import('./views/screens/CargoScreens/CargoEditScreen'))

// Plaza Components
const PlazaList = React.lazy(() => import('./views/screens/PLazaScreens/PlazaListScreen'))
const PlazaAdd = React.lazy(() => import('./views/screens/PLazaScreens/PlazaAddScreen'))
const PlazaEdit = React.lazy(() => import('./views/screens/PLazaScreens/PlazaEditScreen'))

// Personal Components
const PersonalList = React.lazy(() => import('./views/screens/PersonalScreens/PersonalListScreen'))
const PersonalAdd = React.lazy(() => import('./views/screens/PersonalScreens/PersonalAddScreen'))
const PersonalEdit = React.lazy(() => import('./views/screens/PersonalScreens/PersonalEditScreen'))



const routes = [
  // Public Routes
  { path: '/', exact: true, name: 'Casa' },
  { path: '/dashboard', name: 'Panel Administrativo', component: HomeScreen },

  // Users Urls
  { path: '/user/profile', name: 'Perfil de Usuario', component: UserProfile },
  { path: '/users/list', name: 'Listado de Usuarios', component: UserListScreen, exact: true},
  { path: '/users/list/add', name: 'Insertar Usuario', component: UserAddScreen },
  { path: "/users/list/edit/:id", name: 'Editar Usuario', component: UserEditScreen },

  // Provinces Routers
  { path: '/provincias', name: 'Listado de Provincias', component: ProvincesList, exact: true},
  { path: '/provincias/add', name: 'Insertar Provincia', component: ProvincesAdd },
  { path: "/provincias/edit/:id", name: 'Editar Provincia', component: ProvincesEdit },

  // Municipios Routers
  { path: '/municipios', name: 'Listado de Municipios', component: MunicipiosList, exact: true},
  { path: '/municipios/add', name: 'Insertar Municipio', component: MunicipiosAdd },
  { path: "/Municipios/edit/:id", name: 'Editar Municipio', component: MunicipiosEdit },

  // Clasificaciones Routers
  { path: '/clasificaciones', name: 'Listado de Clasficiaciones', component: ClasificacionesList, exact: true},
  { path: '/clasificaciones/add', name: 'Insertar Clasificación', component: ClasificacionesAdd },
  { path: "/clasificaciones/edit/:id", name: 'Editar Clasificación', component: ClasificacionesEdit },

  // CATOCUP Routers
  { path: '/catOcupacionales', name: 'Listado de Categorías Ocupacionales', component: CatOcupacionalList, exact: true},
  { path: '/catOcupacionales/add', name: 'Insertar Categoría Ocupacional', component: CatOcupacionalAdd},
  { path: "/catOcupacionales/edit/:id", name: 'Editar Categoría Ocupacional', component: CatOcuppacionalEdit },

  // GRUPESC Routers
  { path: '/gruposEscala', name: 'Listado de Grupos de Escala', component: GrupoEscalaList, exact: true},
  { path: '/gruposEscala/add', name: 'Insertar Grupo de Escala', component: GrupoEscalaAdd},
  { path: "/gruposEscala/edit/:id", name: 'Editar Grupo de Escala', component: GrupoEscalaEdit },

  // FuentePRoc Routers
  { path: '/fuentesProc', name: 'Listado de Fuentes de Procedencia', component: FuenteProcList, exact: true},
  { path: '/fuentesProc/add', name: 'Insertar Fuente de Procedencia', component: FuenteProcAdd},
  { path: "/fuentesProc/edit/:id", name: 'Editar Fuente de Procedencia', component: FuenteProcEdit },

  // MotivoBaja Routers
  { path: '/motivosBaja', name: 'Listado de Motivos de Baja', component: MotivoBajaList, exact: true},
  { path: '/motivosBaja/add', name: 'Insertar Motivo de Baja', component: MotivoBajaAdd},
  { path: "/motivosBaja/edit/:id", name: 'Editar Motivo de Baja', component: MotivoBajaEdit },

  // Nivel Prep Routers
  { path: '/nivelesPrep', name: 'Listado de Niveles de Preparación', component: NivelPrepList, exact: true},
  { path: '/nivelesPrep/add', name: 'Insertar Nivel de Preparación', component: NivelPrepAdd},
  { path: "/nivelesPrep/edit/:id", name: 'Editar Nivel de Preparación', component: NivelPrepEdit },

  // Unidad Routers
  { path: '/unidades', name: 'Listado de Unidades', component: UnidadList, exact: true},
  { path: '/unidades/add', name: 'Insertar Unidad', component: UnidadAdd},
  { path: "/unidades/edit/:id", name: 'Editar Unidad', component: UnidadEdit },

  // Unidad Org Routers
  { path: '/unidadesOrg', name: 'Listado de Unidades Organizativas', component: UnidadOrgList, exact: true},
  { path: '/unidadesOrg/add', name: 'Insertar Unidad Organizativa', component: UnidadOrgAdd},
  { path: "/unidadesOrg/edit/:id", name: 'Editar Unidad Organizativa', component: UnidadOrgEdit },

  // Cargo Routers
  { path: '/cargos', name: 'Listado de Cargos', component: CargoList, exact: true},
  { path: '/cargos/add', name: 'Insertar Cargo', component: CargoAdd},
  { path: "/cargos/edit/:id", name: 'Editar Cargo', component: CargoEdit },

  // Plaza Routers
  { path: '/plazas', name: 'Listado de Plazas', component: PlazaList, exact: true},
  { path: '/plazas/add', name: 'Insertar Plaza', component: PlazaAdd},
  { path: "/plazas/edit/:id", name: 'Editar Plaza', component: PlazaEdit },

  // Personal Routers
  { path: '/personal', name: 'Listado de Personal', component: PersonalList, exact: true},
  { path: '/personal/add', name: 'Insertar Personal', component: PersonalAdd},
  { path: "/personal/edit/:id", name: 'Editar Personal', component: PersonalEdit },


];

export default routes;
