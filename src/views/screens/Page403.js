import { CImg, CContainer, CRow, CCol, CButton } from "@coreui/react";
import Logo from "../../assets/img/logo.png";
import React from "react";
import { LinkContainer } from "react-router-bootstrap";

function Page403() {
  return (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        <div className="text-center">
          <CImg
            src={Logo}
            className="c-sidebar-brand-full"
            alt="logo"
            height={200}
          />
        </div>
        <CRow className="justify-content-center">
          <CCol md="5">
            <div className="clearfix">
              <h1 className="float-left display-3 mr-4">403</h1>
              <h4 className="pt-3">Error. Acceso denegado.</h4>
              <p className="text-muted float-left">
                Usted no tiene permisos para acceder a esta Url del sistema
              </p>
            </div>
            <div className="text-center">
              <LinkContainer to="/">
                <CButton color="danger">Volver al Sistema</CButton>
              </LinkContainer>
            </div>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
}

export default Page403;
