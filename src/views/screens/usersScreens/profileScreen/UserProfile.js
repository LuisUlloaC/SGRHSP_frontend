import CIcon from "@coreui/icons-react";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import { IconButton, Tooltip } from "@material-ui/core";
import { setSnackbar } from "../../../../redux/reducers/snackbarReducer";
import { getUserDetails, updateUser } from "../../../../redux/actions/userActions";
import {
  CBadge,
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CFormGroup,
  CInput,
  CInvalidFeedback,
  CLabel,
  CRow,
} from "@coreui/react";
import { Loader, Message } from "../../../../containers/utils";
import {
  validationProfileSchema,
  initialProfileValues,
} from "./userProfileValidation";
import ChangePasswordModal from "./ChangePasswordModal";
import { USER_UPDATE_RESET } from "../../../../redux/constants/userConstants";
import {
  redirectLogin,
  tokenhasExpired,
} from "../../../../containers/utils/userloginsettings.js";

function UserProfile({ history }) {
  const dispatch = useDispatch();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  // Login User Selector
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  // User details Selector
  const userDetails = useSelector((state) => state.userDetails);
  const { user, loading, error } = userDetails;
  // User Update Profile Selector
  const userUpdate = useSelector((state) => state.userUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate;

  // Init Profile Values
  initialProfileValues.username = user?.username;
  initialProfileValues.first_name = user?.first_name;
  initialProfileValues.last_name = user?.last_name;
  initialProfileValues.email = user?.email;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      dispatch(getUserDetails("profile"));
    }
    if (tokenhasExpired(userInfo)) {
      redirectLogin(history, dispatch);
    }
    if (successUpdate) {
      dispatch(
        setSnackbar(true, "success", "Perf??l actualizado satisfactoriamente")
      );
      dispatch({ type: USER_UPDATE_RESET });
    }
  }, [userInfo, history, dispatch, successUpdate]);

  // Form with the initials values of the user
  const formik = useFormik({
    initialValues: initialProfileValues,
    validationSchema: validationProfileSchema,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: (user) => {
      dispatch(updateUser("profile", user));
    },
  });

  const handleOnClickPassword = () => {
    setShowPasswordModal(true);
  };

  const closeModal = () => {
    setShowPasswordModal(false);
  };

  return (
    <div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <CCard className="shadow">
          <ChangePasswordModal
            showPasswordModal={showPasswordModal}
            closeModal={closeModal}
          />
          <CCardHeader>
            <CRow>
              <CCol xs="12" sm="8" md="8">
                <h4 className="text-muted">
                  <CIcon name="cil-user" size="xl" className="text-center" />{" "}
                  Perf??l de Usuario
                </h4>
              </CCol>
              <CCol xs="12" sm="4" md="4">
                <div className="card-header-actions">
                  <Tooltip
                    title="Cambiar Contrase??a"
                    className="float-right"
                    onClick={handleOnClickPassword}
                  >
                    <IconButton>
                      <CIcon name="cil-settings" />
                    </IconButton>
                  </Tooltip>
                </div>
              </CCol>
            </CRow>
          </CCardHeader>

          <CCardBody>
            <form onSubmit={formik.handleSubmit} className="m-3">
              {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}

              <h5 className="text-muted mb-4">Mis caracter??sticas</h5>
              {/* NOMBRE DE USUARIO */}
              <CFormGroup row>
                <CCol md="3">
                  <CLabel>Nombre de Usuario</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Nombre de usuario"
                    value={formik.values.username}
                    invalid={Boolean(formik.errors.username)}
                    valid={
                      formik.touched.username &&
                      !Boolean(formik.errors.username)
                    }
                    onChange={formik.handleChange}
                  />
                  <CInvalidFeedback>{formik.errors.username}</CInvalidFeedback>
                </CCol>
              </CFormGroup>

              {/* NOMBRE */}
              <CFormGroup row>
                <CCol md="3">
                  <CLabel>Nombre</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Nombre"
                    value={formik.values.name}
                    invalid={Boolean(formik.errors.username)}
                    valid={
                      formik.touched.username &&
                      !Boolean(formik.errors.username)
                    }
                    onChange={formik.handleChange}
                  />
                  <CInvalidFeedback>{formik.errors.username}</CInvalidFeedback>
                </CCol>
              </CFormGroup>

              {/* CORREO */}
              <CFormGroup row>
                <CCol md="3">
                  <CLabel>Correo Electr??nico</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CInput
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Correo"
                    autoComplete="email"
                    value={formik.values.email}
                    invalid={
                      formik.touched.email && Boolean(formik.errors.email)
                    }
                    valid={
                      formik.touched.email && !Boolean(formik.errors.email)
                    }
                    onChange={formik.handleChange}
                  />
                  <CInvalidFeedback>
                    {formik.touched.email && formik.errors.email}
                  </CInvalidFeedback>
                </CCol>
              </CFormGroup>

              {/* ROL DE USUARIO */}
              <CFormGroup row>
                <CCol md="3">
                  <CLabel>Rol de Usuario</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CBadge>
                    <h4>
                      <CBadge
                        color={
                          user.rol === "Administrador" ? "success" : "info"
                        }
                      >
                        {user.rol}
                      </CBadge>
                    </h4>
                  </CBadge>
                </CCol>
              </CFormGroup>

              {/* Fecha de Registro */}
              <CFormGroup row>
                <CCol md="3">
                  <CLabel>Fecha de Registro</CLabel>
                </CCol>
                <CCol xs="12" md="9">
                  <CBadge>
                    <h4>
                      <CBadge color="light">
                        {user.date_joined?.substring(0, 10)}
                      </CBadge>
                    </h4>
                  </CBadge>
                </CCol>
              </CFormGroup>
              <CCardFooter>
                <div className="float-right">
                  {loadingUpdate && <Loader />}

                  <CButton
                    variant="outline"
                    color="light"
                    type="button"
                    onClick={(e) => {
                      formik.resetForm();
                      dispatch(
                        setSnackbar(true, "info", "Formulario reseteado")
                      );
                    }}
                    className="text-black-50"
                  >
                    <CIcon name="cil-x" /> Resetear Formulario
                  </CButton>
                  <CButton color="success" type="submit" className="ml-2">
                    <CIcon name="cil-scrubber" /> Actualizar Perf??l
                  </CButton>
                </div>
              </CCardFooter>
            </form>
          </CCardBody>
        </CCard>
      )}
    </div>
  );
}

export default UserProfile;
