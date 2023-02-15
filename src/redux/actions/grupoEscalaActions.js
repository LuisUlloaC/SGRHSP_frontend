import {
  GRUPOESCALA_LIST_REQUEST,
  GRUPOESCALA_LIST_SUCCESS,
  GRUPOESCALA_LIST_FAIL,
  GRUPOESCALA_ADD_REQUEST,
  GRUPOESCALA_ADD_SUCCESS,
  GRUPOESCALA_ADD_FAIL,
  GRUPOESCALA_DELETE_REQUEST,
  GRUPOESCALA_DELETE_SUCCESS,
  GRUPOESCALA_DELETE_FAIL,
  GRUPOESCALA_DETAILS_REQUEST,
  GRUPOESCALA_DETAILS_SUCCESS,
  GRUPOESCALA_DETAILS_FAIL,
  GRUPOESCALA_EDIT_REQUEST,
  GRUPOESCALA_EDIT_SUCCESS,
  GRUPOESCALA_EDIT_FAIL,
} from "../constants/grupoEscConstants";
import { defaultApi } from "../../publicUrl";
import axios from "axios";


export const getGrupoEscalaList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GRUPOESCALA_LIST_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${defaultApi}/api/server/grup_esc/`, config);

    dispatch({
      type: GRUPOESCALA_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GRUPOESCALA_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


export const addGrupoEscala = (grupoEscala) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GRUPOESCALA_ADD_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post(`${defaultApi}/api/server/grup_esc/`, grupoEscala, config);

    dispatch({
      type: GRUPOESCALA_ADD_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: GRUPOESCALA_ADD_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deleteGruposEscala = (gruposEscala) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GRUPOESCALA_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    await axios.post(`${defaultApi}/api/server/grup_esc/delete/`, gruposEscala, config);

    dispatch({
      type: GRUPOESCALA_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: GRUPOESCALA_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const editGrupoEscala = (id, values) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GRUPOESCALA_EDIT_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`${defaultApi}/api/server/grup_esc/${id}/`,
      values,
      config
    );

    dispatch({
      type: GRUPOESCALA_EDIT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GRUPOESCALA_EDIT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getGrupoEscalaDetails = (id, allowAccess) => async (dispatch, getState) => {
      try {
        dispatch({
          type: GRUPOESCALA_DETAILS_REQUEST,
        });

        if (allowAccess) {
          const { data } = await axios.get(
              `${defaultApi}/api/server/grup_esc/${id}/`
          );
          dispatch({
            type: GRUPOESCALA_DETAILS_SUCCESS,
            payload: data,
          });
        } else {
          const {
            userLogin: { userInfo },
          } = getState();

          const config = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userInfo.token}`,
            },
          };

          const { data } = await axios.get(
              `${defaultApi}/api/server/grup_esc/${id}/`,
              config
          );

          dispatch({
            type: GRUPOESCALA_DETAILS_SUCCESS,
            payload: data,
          });
        }
      } catch (error) {
        dispatch({
          type: GRUPOESCALA_DETAILS_FAIL,
          payload:
              error.response && error.response.data.detail
                  ? error.response.data.detail
                  : error.message,
        });
      }
    };
