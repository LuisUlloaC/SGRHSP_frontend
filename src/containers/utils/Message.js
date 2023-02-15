import React from "react";
import { CAlert } from "@coreui/react";

function Message({ variant, children }) {

  return (
    <div>
      <CAlert color={variant} closeButton>
        {children}
      </CAlert>
    </div>
  );
}

export default Message;
