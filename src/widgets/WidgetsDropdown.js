import React from "react";
import { HiUserGroup } from "react-icons/all";
import { CWidgetDropdown, CRow, CCol } from "@coreui/react";

const WidgetsDropdown = ({ users }) => {
  return (
    <CRow>
      <CCol sm="6" lg="3">
        <CWidgetDropdown
          color="gradient-success"
          header={users}
          text="Usuarios del Sistema"
          className="pb-3"
        >
          <HiUserGroup size={24} />
        </CWidgetDropdown>
      </CCol>
    </CRow>
  );
};

export default WidgetsDropdown;
