import React, { useState, useEffect } from "react";
import { getFuenteProcList, deleteFuenteProc } from "../../../redux/actions/fuenteProcActions";
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
import { FUENTEPROCEDENCIA_DELETE_RESET } from "../../../redux/constants/fuengeProcConstant";
import { FaTrash } from "react-icons/fa";
import {
  redirectLogin,
  tokenhasExpired,
} from "../../../containers/utils/userloginsettings.js";

function FuenteProcListScreen({ history }) {
  const dispatch = useDispatch();
  // States
  const [dense, setDense] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [rowsToDelete, setRowsToDelete] = useState([]);

  // User Login Selector
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  // Grupos Escala List Selector
  const fuenteProcList = useSelector((state) => state.fuenteProcList);
  const { loading, error, fuentesProcedencia } = fuenteProcList;
  // Delete Provinces Selector
  const deleteFuenteProcSelector = useSelector((state) => state.fuenteProcDelete);
  const { success: successDelete, error: errorDelete } = deleteFuenteProcSelector;

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
      dispatch(getFuenteProcList(false));
    }
    if (successDelete) {
      dispatch(
        setSnackbar(
          true,
          "success",
          "Fuente(s) de Procedencia eliminada(s) satisfactoriamente"
        )
      );
      dispatch({ type: FUENTEPROCEDENCIA_DELETE_RESET });
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
        <Tooltip title="Eliminar Fuente(s) de Procedencia Seleccionadas" className="mr-2">
          <IconButton
            onClick={() => {
              let items = [];
              data.forEach((element) => {
                items.push(fuentesProcedencia[element.dataIndex]);
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
    dispatch(deleteFuenteProc(items));
  };

  // Add Buttom to insert grupEsc to the table
  listOptions.customToolbar = () => {
    return <AddButtomListHeader addLink="/fuentesProc/add" title="Insertar Fuente de Procedencia" />;
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
              title={`Listado de Fuentes de Procedencia (${fuentesProcedencia?.length})`}
              data={fuentesProcedencia}
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
            objectType={"Fuente(s) de Procedencia"}
            items={rowsToDelete}
            deleteComfirmedItems={deleteComfirmedItems}
            closeModal={closeModal}
          />
        </div>
      )}
    </React.Fragment>
  );
}

export default FuenteProcListScreen;
