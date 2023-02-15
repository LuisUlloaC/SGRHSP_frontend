import React, { useState, useEffect } from "react";
import { getMunicipiosList, deleteMunicipios } from "../../../redux/actions/municipiosActions";
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
import { OBJECT_DELETE_RESET } from "../../../redux/constants/objectsConstants";
import { FaTrash } from "react-icons/fa";
import {
  redirectLogin,
  tokenhasExpired,
} from "../../../containers/utils/userloginsettings.js";

function MunicipioListScreen({ history }) {
  const dispatch = useDispatch();
  // States
  const [dense, setDense] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [rowsToDelete, setRowsToDelete] = useState([]);

  // User Login Selector
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  // Provinces List Selector
  const municipiosList = useSelector((state) => state.municipiosList);
  const { loading, error, municipios } = municipiosList;
  // Delete Provinces Selector
  const deleteMunicipiosSelector = useSelector((state) => state.municipioDelete);
  const { success: successDelete, error: errorDelete } = deleteMunicipiosSelector;

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
      dispatch(getMunicipiosList(false));
    }
    if (successDelete) {
      dispatch(
        setSnackbar(
          true,
          "success",
          "Municipio(s) eliminada(s) satisfactoriamente"
        )
      );
      dispatch({ type: OBJECT_DELETE_RESET });
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
        <Tooltip title="Eliminar Municipios Seleccionadas" className="mr-2">
          <IconButton
            onClick={() => {
              let items = [];
              data.forEach((element) => {
                items.push(municipios[element.dataIndex]);
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

  // Delete Users after confirmed
  const deleteComfirmedItems = (items) => {
    dispatch(deleteMunicipios(items));
  };

  // Add Buttom to insert municipios to the table
  listOptions.customToolbar = () => {
    return <AddButtomListHeader addLink="/municipios/add" title="Insertar Municipio" />;
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
              title={`Listado de Municipios (${municipios?.length})`}
              data={municipios}
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
            objectType={"Municipio(s)"}
            items={rowsToDelete}
            deleteComfirmedItems={deleteComfirmedItems}
            closeModal={closeModal}
          />
        </div>
      )}
    </React.Fragment>
  );
}

export default MunicipioListScreen;
