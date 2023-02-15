import React from "react";
import { CFooter } from "@coreui/react";

const TheFooter = () => {
  const dateYear = new Date().getFullYear();
  return (
    <CFooter fixed={false}>
      <div>
        Control de Plantilla
        <span className="ml-1">&copy; {dateYear}</span>
      </div>
      <div className="mfs-auto">
        <span className="mr-1">Hecho por la</span>
        Universidad de Camagüey
      </div>
    </CFooter>
  );
};

export default React.memo(TheFooter);
