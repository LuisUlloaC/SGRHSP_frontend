import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Logo from "../assets/img/logo.png";
import {
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavTitle,
  CSidebarNavDropdown,
  CSidebarNavItem,
  CImg,
  CSidebarMinimizer,
} from "@coreui/react";

// Icons
import CIcon from "@coreui/icons-react";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import AddIcon from "@material-ui/icons/Add";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import GroupIcon from "@material-ui/icons/Group";
import {
  FaHotel,
  FaThList,
  SiWorkplace,
  FaCompass
} from "react-icons/all";

const vars = {
  '--cui-sidebar-toggler-hover-bg': 'danger',
  marginBottom: "-3px",
  marginTop: "-3px"
}

const TheSidebar = () => {
  const dispatch = useDispatch();

  let show = useSelector((state) => state.sidebarShow.sidebarShow);
  if (show === undefined) {
    show = "responsive";
  }

  // User Login Selector
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;



  return (
    <CSidebar
      show={show}
      className="sideBackground"
      onShowChange={(val) => dispatch({ type: "set", sidebarShow: val })}
    >
      {/* Logo */}
      <CSidebarBrand className="d-md-down-none bg-white borderAux" to="/">
        <CImg
          src={Logo}
          className="c-sidebar-brand-full"
          alt="logo"
          height={65}
        />
      </CSidebarBrand>
      {/* Home Dashboard */}
      <CSidebarNav>
        <CSidebarNavItem
          name="Panel Administrativo"
          to="/dashboard"
          icon={<HomeOutlinedIcon className="c-sidebar-nav-icon" />}
        />
        <CSidebarNavTitle style={vars}>
          {userInfo?.isProvinceSpecialist
            ? " Gestionar datos"
            : "Gestionar usuarios"}
        </CSidebarNavTitle>

        {userInfo?.isAdmin && (
          <div>
            {/* Users */}
            <CSidebarNavDropdown
              name="Usuarios"
              icon={<GroupIcon className="c-sidebar-nav-icon" />}
            >
              {/* User List */}
              <CSidebarNavItem
                name="Listado"
                to="/users/list"
                icon={
                  <CIcon name="cil-list" customClasses="c-sidebar-nav-icon" />
                }
              />
              {/* User Add */}
              <CSidebarNavItem
                name="Insertar Usuario"
                to="/users/list/add"
                icon={<PersonAddIcon className="c-sidebar-nav-icon" />}
              />
            </CSidebarNavDropdown>

          </div>
        )}

        {userInfo?.isProvinceSpecialist && (
          <div>
            {/* PROVS */}
            <CSidebarNavDropdown
              name="Provincias"
              icon={<FaCompass className="c-sidebar-nav-icon" />}
            >
              {/* PROV List */}
              <CSidebarNavItem
                name="Listado"
                to="/provincias/"
                icon={
                  <CIcon name="cil-list" customClasses="c-sidebar-nav-icon" />
                }
              />
              {/* PROV Add */}
              <CSidebarNavItem
                name="Insertar Provincia"
                to="/provincias/add"
                icon={<AddIcon className="c-sidebar-nav-icon" />}
              />
            </CSidebarNavDropdown>

              {/* MUN */}
            <CSidebarNavDropdown
              name="Municipios"
              icon={<FaCompass className="c-sidebar-nav-icon" />}
            >
              {/* MUN List */}
              <CSidebarNavItem
                name="Listado"
                to="/municipios/"
                icon={
                  <CIcon name="cil-list" customClasses="c-sidebar-nav-icon" />
                }
              />
              {/* MUN Add */}
              <CSidebarNavItem
                name="Insertar Municipio"
                to="/municipios/add"
                icon={<AddIcon className="c-sidebar-nav-icon" />}
              />
            </CSidebarNavDropdown>

               {/* UNIDAD ORGANIZATIVA */}
            <CSidebarNavDropdown
              name="Unidades Organizativas"
              icon={<FaHotel className="c-sidebar-nav-icon" />}
            >
              {/* UNIDAD ORG List */}
              <CSidebarNavItem
                name="Listado"
                to="/unidadesOrg/"
                icon={
                  <CIcon name="cil-list" customClasses="c-sidebar-nav-icon" />
                }
              />
              {/* UNIDAD ORG Add */}
              <CSidebarNavItem
                name="Insertar Unidad Organizativa"
                to="/unidadesOrg/add"
                icon={<AddIcon className="c-sidebar-nav-icon" />}
              />
            </CSidebarNavDropdown>

               {/* UNIDAD */}
            <CSidebarNavDropdown
              name="Unidades"
              icon={<FaHotel className="c-sidebar-nav-icon" />}
            >
              {/* UNIDAD List */}
              <CSidebarNavItem
                name="Listado"
                to="/unidades/"
                icon={
                  <CIcon name="cil-list" customClasses="c-sidebar-nav-icon" />
                }
              />
              {/* UNIDAD Add */}
              <CSidebarNavItem
                name="Insertar Unidad"
                to="/unidades/add"
                icon={<AddIcon className="c-sidebar-nav-icon" />}
              />
            </CSidebarNavDropdown>

               {/* CATEGORIA OCUPACIONAL */}
            <CSidebarNavDropdown
              name="Categorías Ocupacionales"
              icon={<SiWorkplace className="c-sidebar-nav-icon" />}
            >
              {/* CAT_OC List */}
              <CSidebarNavItem
                name="Listado"
                to="/catOcupacionales/"
                icon={
                  <CIcon name="cil-list" customClasses="c-sidebar-nav-icon" />
                }
              />
              {/* CAT_OC Add */}
              <CSidebarNavItem
                name="Insertar Categoría Ocupacional"
                to="/catOcupacionales/add"
                icon={<AddIcon className="c-sidebar-nav-icon" />}
              />
            </CSidebarNavDropdown>

            {/* NIVEL DE PREPARACION */}
            <CSidebarNavDropdown
              name="Niveles de Preparación"
              icon={<SiWorkplace className="c-sidebar-nav-icon" />}
            >
              {/* NIVELPREP List */}
              <CSidebarNavItem
                name="Listado"
                to="/nivelesPrep/"
                icon={
                  <CIcon name="cil-list" customClasses="c-sidebar-nav-icon" />
                }
              />
              {/* NIVELPREP Add */}
              <CSidebarNavItem
                name="Insertar Nivel de Preparación"
                to="/nivelesPrep/add"
                icon={<AddIcon className="c-sidebar-nav-icon" />}
              />
            </CSidebarNavDropdown>

            {/*MOTIVO BAJA*/}
            <CSidebarNavDropdown
              name="Motivos de Baja"
              icon={<SiWorkplace className="c-sidebar-nav-icon" />}
            >
              {/* MOT BAJA List */}
              <CSidebarNavItem
                name="Listado"
                to="/motivosBaja/"
                icon={
                  <CIcon name="cil-list" customClasses="c-sidebar-nav-icon" />
                }
              />
              {/* MOT BAJA Add */}
              <CSidebarNavItem
                name="Insertar Motivo de Baja"
                to="/motivosBaja/add"
                icon={<AddIcon className="c-sidebar-nav-icon" />}
              />
            </CSidebarNavDropdown>

               {/* CARGO */}
            <CSidebarNavDropdown
              name="Cargos"
              icon={<SiWorkplace className="c-sidebar-nav-icon" />}
            >
              {/* CARGO List */}
              <CSidebarNavItem
                name="Listado"
                to="/cargos/"
                icon={
                  <CIcon name="cil-list" customClasses="c-sidebar-nav-icon" />
                }
              />
              {/* CARGO Add */}
              <CSidebarNavItem
                name="Insertar Cargo"
                to="/cargos/add"
                icon={<AddIcon className="c-sidebar-nav-icon" />}
              />
            </CSidebarNavDropdown>

            {/* FUENTEPROC */}
            <CSidebarNavDropdown
              name="Fuentes de Procedencia"
              icon={<SiWorkplace className="c-sidebar-nav-icon" />}
            >
              {/* FUENTEPROC List */}
              <CSidebarNavItem
                name="Listado"
                to="/fuentesProc/"
                icon={
                  <CIcon name="cil-list" customClasses="c-sidebar-nav-icon" />
                }
              />
              {/* FUENTEPROC Add */}
              <CSidebarNavItem
                name="Insertar Fuente de Procedencia"
                to="/fuentesProc/add"
                icon={<AddIcon className="c-sidebar-nav-icon" />}
              />
            </CSidebarNavDropdown>

               {/* PLAZA */}
            <CSidebarNavDropdown
              name="Plazas"
              icon={<FaThList className="c-sidebar-nav-icon" />}
            >
              {/* PLAZA List */}
              <CSidebarNavItem
                name="Listado"
                to="/plazas/"
                icon={
                  <CIcon name="cil-list" customClasses="c-sidebar-nav-icon" />
                }
              />
              {/* MUN Add */}
              <CSidebarNavItem
                name="Insertar PLaza"
                to="/plazas/add"
                icon={<AddIcon className="c-sidebar-nav-icon" />}
              />
            </CSidebarNavDropdown>

               {/* GRUPOS ESCALA */}
            <CSidebarNavDropdown
              name="Grupos de Escala"
              icon={<FaThList className="c-sidebar-nav-icon" />}
            >
              {/* GRUPOS_ESCALA List */}
              <CSidebarNavItem
                name="Listado"
                to="/gruposEscala/"
                icon={
                  <CIcon name="cil-list" customClasses="c-sidebar-nav-icon" />
                }
              />
              {/* GRUPPOS_ESCALA Add */}
              <CSidebarNavItem
                name="Insertar Grupo de Esccala"
                to="/gruposEscala/add"
                icon={<AddIcon className="c-sidebar-nav-icon" />}
              />
            </CSidebarNavDropdown>

               {/* CLASIFICACION */}
            <CSidebarNavDropdown
              name="Clasificaciones"
              icon={<FaThList className="c-sidebar-nav-icon" />}
            >
              {/* CLAS List */}
              <CSidebarNavItem
                name="Listado"
                to="/clasificaciones/"
                icon={
                  <CIcon name="cil-list" customClasses="c-sidebar-nav-icon" />
                }
              />
              {/* CLAS Add */}
              <CSidebarNavItem
                name="Insertar Clasificación"
                to="/clasificaciones/add"
                icon={<AddIcon className="c-sidebar-nav-icon" />}
              />
            </CSidebarNavDropdown>

            {/* PERSONAL */}
            <CSidebarNavDropdown
              name="Personal"
              icon={<FaThList className="c-sidebar-nav-icon" />}
            >
              {/* Personal List */}
              <CSidebarNavItem
                name="Listado"
                to="/personal/"
                icon={
                  <CIcon name="cil-list" customClasses="c-sidebar-nav-icon" />
                }
              />
              {/* Personal Add */}
              <CSidebarNavItem
                name="Insertar Personal"
                to="/personal/add"
                icon={<AddIcon className="c-sidebar-nav-icon" />}
              />
            </CSidebarNavDropdown>

          </div>
        )}
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
