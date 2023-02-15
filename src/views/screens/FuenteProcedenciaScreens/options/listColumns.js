import { IconButton, Tooltip } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import { LinkContainer } from "react-router-bootstrap";

export const columns = [
  {
    name: "id",
    label: "",
    options: {
      filter: false,
      sort: false,
      display: false,
      viewColumns: false,
    },
  },
  {
    name: "nombre",
    label: "Nombre",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta) => {
        return <strong>{tableMeta.rowData[1]}</strong>;
      },
    },
  },
  {
    name: "Acciones",
    label: "",
    options: {
      filter: false,
      viewColumns: false,
      sort: false,
      print: true,
      download: false,
      customBodyRender: (value, tableMeta) => {
        const nombre = tableMeta.rowData[1];
        const id = tableMeta.rowData[0];
        return (
          <LinkContainer to={`/fuentesProc/edit/${id}`}>
            <Tooltip title={`Editar Fuente de Procedencia: ${nombre}`} placement="bottom">
              <IconButton>
                <EditIcon />
              </IconButton>
            </Tooltip>
          </LinkContainer>
        );
      },
    },
  },
];
