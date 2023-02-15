import React, { useState, useEffect } from "react";
import { getGrupoEscalaList, deleteGruposEscala } from "../../../redux/actions/grupoEscalaActions";
import { useSelector, useDispatch } from "react-redux";
import { setSnackbar } from "../../../redux/reducers/snackbarReducer";
import {
  AddButtomListHeader,
  Loader,
  Message,
  listOptions,
  MUIDataTable,
  DeleteManyItemsModal,
} from "../../../containers/utils/index";
import {
  FormControlLabel,
  Switch,
  MuiThemeProvider,
  Tooltip,
  IconButton,
} from "@material-ui/core";
import {createTheme} from "@material-ui/core/styles";
import { columns } from "./options/listColumns";
import { GRUPOESCALA_DELETE_RESET } from "../../../redux/constants/grupoEscConstants";
import { FaTrash } from "react-icons/fa";
import {
  redirectLogin,
  tokenhasExpired,
} from "../../../containers/utils/userloginsettings.js";

function GrupoEscalaListScreen({ history }) {
  const dispatch = useDispatch();
  // States
  const [dense, setDense] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [rowsToDelete, setRowsToDelete] = useState([]);

  // User Login Selector
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  // Grupos Escala List Selector
  const gruposEscalaList = useSelector((state) => state.grupoEscalaList);
  const { loading, error, gruposEscala } = gruposEscalaList;
  // Delete Provinces Selector
  const deleteGruposEscalaSelector = useSelector((state) => state.grupoEscalaDelete);
  const { success: successDelete, error: errorDelete } = deleteGruposEscalaSelector;

  // Use Effect
  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else if (!userInfo.isProvinceSpecialist) {
      history.push("/403");
    } else {
      if (tokenhasExpired(userInfo)) {
        redirectLogin(history, dispatch);
      }
      dispatch(getGrupoEscalaList(false));
    }
    if (successDelete) {
      dispatch(
        setSnackbar(
          true,
          "success",
          "Grupo(s) de Escala eliminado(s) satisfactoriamente"
        )
      );
      dispatch({ type: GRUPOESCALA_DELETE_RESET });
    }
  }, [dispatch, userInfo, history, successDelete]);

  // Theme for the MUI-datatable
  const getMuiTheme = () =>
    createTheme({
      overrides: {
        MuiTableCell: {
          root: {
            padding: dense ? "-2px" : "7px",
          },
        },
      },
    });

  // Add method on Rows delete to the table
  listOptions.customToolbarSelect = ({ data }) => {
    return (
      <React.Fragment>
        <Tooltip title="Eliminar GRupos de Escala Seleccionadas" className="mr-2">
          <IconButton
            onClick={() => {
              let items = [];
              data.forEach((element) => {
                items.push(gruposEscala[element.dataIndex]);
              });
              setRowsToDelete(items);
              setShowModal(true);
            }}
          >
            <FaTrash />
          </IconButton>
        </Tooltip>
      </React.Fragment>
    );
  };

  // Remover Several Defaults Icons From Mui Datatable
  listOptions.selectableRows = "multiple";
  listOptions.download = true;
  listOptions.print = true;
  listOptions.viewColumns = false;
  listOptions.filter = false;

  // Close Modal To delete Users
  const closeModal = () => {
    setShowModal(false);
  };

  // Delete GRUPESC after confirmed
  const deleteComfirmedItems = (items) => {
    dispatch(deleteGruposEscala(items));
  };

  // Add Buttom to insert grupEsc to the table
  listOptions.customToolbar = () => {
    return <AddButtomListHeader addLink="/gruposEscala/add" title="Insertar Grupo de Escala" />;
  };

  return (
    <React.Fragment>
      {/* Error a la hora de eliminar un item del listado */}
      {errorDelete && <Message variant="danger">{errorDelete}</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <div>
          <MuiThemeProvider theme={getMuiTheme()}>
            <MUIDataTable
              title={`Listado de Grupos de Escala (${gruposEscala?.length})`}
              data={gruposEscala}
              columns={columns}
              options={listOptions}
            />
          </MuiThemeProvider>

          <FormControlLabel
            className="mt-3"
            control={
              <Switch
                checked={dense}
                onChange={(event) => setDense(event.target.checked)}
              />
            }
            label="Disminuir tamaño de la tabla"
          />

          <DeleteManyItemsModal
            showModal={showModal}
            objectType={"Grupo(s) de Escala"}
            items={rowsToDelete}
            deleteComfirmedItems={deleteComfirmedItems}
            closeModal={closeModal}
          />
        </div>
      )}
    </React.Fragment>
  );
}

export default GrupoEscalaListScreen;
