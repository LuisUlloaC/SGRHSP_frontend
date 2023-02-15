import {
  FUENTEPROCEDENCIA_LIST_REQUEST,
  FUENTEPROCEDENCIA_LIST_SUCCESS,
  FUENTEPROCEDENCIA_LIST_FAIL,
  FUENTEPROCEDENCIA_ADD_REQUEST,
  FUENTEPROCEDENCIA_ADD_SUCCESS,
  FUENTEPROCEDENCIA_ADD_FAIL,
  FUENTEPROCEDENCIA_DELETE_REQUEST,
  FUENTEPROCEDENCIA_DELETE_SUCCESS,
  FUENTEPROCEDENCIA_DELETE_FAIL,
  FUENTEPROCEDENCIA_DETAILS_REQUEST,
  FUENTEPROCEDENCIA_DETAILS_SUCCESS,
  FUENTEPROCEDENCIA_DETAILS_FAIL,
  FUENTEPROCEDENCIA_EDIT_REQUEST,
  FUENTEPROCEDENCIA_EDIT_SUCCESS,
  FUENTEPROCEDENCIA_EDIT_FAIL,
} from "../constants/fuengeProcConstant";
import { defaultApi } from "../../publicUrl";
import axios from "axios";


export const getFuenteProcList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: FUENTEPROCEDENCIA_LIST_REQUEST,
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

    const { data } = await axios.get(`${defaultApi}/api/server/fuente_proc/`, config);

    dispatch({
      type: FUENTEPROCEDENCIA_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FUENTEPROCEDENCIA_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


export const addFuenteProc = (fuenteProcedencia) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FUENTEPROCEDENCIA_ADD_REQUEST,
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

    await axios.post(`${defaultApi}/api/server/fuente_proc/`, fuenteProcedencia, config);

    dispatch({
      type: FUENTEPROCEDENCIA_ADD_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: FUENTEPROCEDENCIA_ADD_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deleteFuenteProc = (fuenteProcedencia) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FUENTEPROCEDENCIA_DELETE_REQUEST,
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
    await axios.post(`${defaultApi}/api/server/clasificacion/delete/`, fuenteProcedencia, config);

    dispatch({
      type: FUENTEPROCEDENCIA_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: FUENTEPROCEDENCIA_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const editFuenteProc = (id, values) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FUENTEPROCEDENCIA_EDIT_REQUEST,
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

    const { data } = await axios.put(`${defaultApi}/api/server/fuente_proc/${id}/`,
      values,
      config
    );

    dispatch({
      type: FUENTEPROCEDENCIA_EDIT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FUENTEPROCEDENCIA_EDIT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getFuenteProcDetails = (id, allowAccess) => async (dispatch, getState) => {
      try {
        dispatch({
          type: FUENTEPROCEDENCIA_DETAILS_REQUEST,
        });

        if (allowAccess) {
          const { data } = await axios.get(
              `${defaultApi}/api/server/fuente_proc/${id}/`
          );
          dispatch({
            type: FUENTEPROCEDENCIA_DETAILS_SUCCESS,
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
              `${defaultApi}/api/server/fuente_proc/${id}/`,
              config
          );

          dispatch({
            type: FUENTEPROCEDENCIA_DETAILS_SUCCESS,
            payload: data,
          });
        }
      } catch (error) {
        dispatch({
          type: FUENTEPROCEDENCIA_DETAILS_FAIL,
          payload:
              error.response && error.response.data.detail
                  ? error.response.data.detail
                  : error.message,
        });
      }
    };
