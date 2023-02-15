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
    name: "apellidos",
    label: "Apellidos",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta) => {
        return <strong>{tableMeta.rowData[2]}</strong>;
      },
    },
  },{
    name: "sexo",
    label: "Sexo",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta) => {
        return <strong>{tableMeta.rowData[3]}</strong>;
      },
    },
  },{
    name: "ci",
    label: "CI",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta) => {
        return <strong>{tableMeta.rowData[4]}</strong>;
      },
    },
  },{
    name: "direccionParticular",
    label: "Dirección Particular",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta) => {
        return <strong>{tableMeta.rowData[5]}</strong>;
      },
    },
  },
  {
    name: "fechaAlta",
    label: "Fecha de Alta",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta) => {
        return <strong>{tableMeta.rowData[6]}</strong>;
      },
    },
  },
  {
    name: "fechaBaja",
    label: "Fecha de baja",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta) => {
        return <strong>{tableMeta.rowData[7]}</strong>;
      },
    },
  },
  {
    name: "nombre_fuenteProcedencia",
    label: "Fuente de Procedencia",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta) => {
        return <strong>{tableMeta.rowData[8]}</strong>;
      },
    },
  },
  {
    name: "nombre_motivoBaja",
    label: "Motivo de Baja",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta) => {
        return <strong>{tableMeta.rowData[9]}</strong>;
      },
    },
  },
  {
    name: "nombre_plaza",
    label: "Nombre de la Plaza",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta) => {
        return <strong>{tableMeta.rowData[10]}</strong>;
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
      print: false,
      download: false,
      display: true,
      customBodyRender: (value, tableMeta) => {
        const nombre = tableMeta.rowData[1];
        const id = tableMeta.rowData[0];
        return (
          <LinkContainer to={`/personal/edit/${id}`}>
            <Tooltip title={`Editar Personal: ${nombre}`} placement="bottom">
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
