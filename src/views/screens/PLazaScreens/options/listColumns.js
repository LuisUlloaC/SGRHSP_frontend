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
    name: "cantidad",
    label: "Cantidad de plazas",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta) => {
        return <strong>{tableMeta.rowData[2]}</strong>;
      },
    },
  },{
    name: "necesarios",
    label: "Necesarias",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta) => {
        return <strong>{tableMeta.rowData[3]}</strong>;
      },
    },
  },{
    name: "cubiertas",
    label: "Plazas Cubiertas",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta) => {
        return <strong>{tableMeta.rowData[4]}</strong>;
      },
    },
  },{
    name: "mision",
    label: "Mision",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta) => {
        return <strong>{tableMeta.rowData[5]}</strong>;
      },
    },
  },
  {
    name: "nombre_unidadOrganizativa",
    label: "Unidad Organizativa",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta) => {
        return <strong>{tableMeta.rowData[6]}</strong>;
      },
    },
  },
  {
    name: "nombre_cargo",
    label: "Cargo",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta) => {
        return <strong>{tableMeta.rowData[7]}</strong>;
      },
    },
  },
  {
    name: "nombre_nivelPreparacion",
    label: "Nivel de Preparación",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value, tableMeta) => {
        return <strong>{tableMeta.rowData[8]}</strong>;
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
          <LinkContainer to={`/plazas/edit/${id}`}>
            <Tooltip title={`Editar Plaza: ${nombre}`} placement="bottom">
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
