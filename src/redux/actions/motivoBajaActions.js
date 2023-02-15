import {
  MOTIVOBAJA_ADD_FAIL,
  MOTIVOBAJA_ADD_REQUEST,
  MOTIVOBAJA_ADD_SUCCESS,
  MOTIVOBAJA_DELETE_FAIL,
  MOTIVOBAJA_DELETE_REQUEST,
  MOTIVOBAJA_DELETE_SUCCESS, MOTIVOBAJA_DETAILS_FAIL,
  MOTIVOBAJA_DETAILS_REQUEST, MOTIVOBAJA_DETAILS_SUCCESS,
  MOTIVOBAJA_EDIT_FAIL,
  MOTIVOBAJA_EDIT_REQUEST,
  MOTIVOBAJA_EDIT_SUCCESS,
  MOTIVOBAJA_LIST_FAIL,
  MOTIVOBAJA_LIST_REQUEST,
  MOTIVOBAJA_LIST_SUCCESS,
} from "../constants/motivoBajaConstant";
import { defaultApi } from "../../publicUrl";
import axios from "axios";


export const getMotivoBajaList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: MOTIVOBAJA_LIST_REQUEST,
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

    const { data } = await axios.get(`${defaultApi}/api/server/motivo_baja/`, config);

    dispatch({
      type: MOTIVOBAJA_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MOTIVOBAJA_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


export const addMotivoBaja = (motivoBaja) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MOTIVOBAJA_ADD_REQUEST,
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

    await axios.post(`${defaultApi}/api/server/motivo_baja/`, motivoBaja, config);

    dispatch({
      type: MOTIVOBAJA_ADD_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: MOTIVOBAJA_ADD_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deleteMotivoBaja = (motivosBaja) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MOTIVOBAJA_DELETE_REQUEST,
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
    await axios.post(`${defaultApi}/api/server/motivo_baja/delete/`, motivosBaja, config);

    dispatch({
      type: MOTIVOBAJA_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: MOTIVOBAJA_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const editMotivoBaja = (id, values) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MOTIVOBAJA_EDIT_REQUEST,
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

    const { data } = await axios.put(`${defaultApi}/api/server/motivo_baja/${id}/`,
      values,
      config
    );

    dispatch({
      type: MOTIVOBAJA_EDIT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MOTIVOBAJA_EDIT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getMotivoBajaDetails = (id, allowAccess) => async (dispatch, getState) => {
      try {
        dispatch({
          type: MOTIVOBAJA_DETAILS_REQUEST,
        });

        if (allowAccess) {
          const { data } = await axios.get(
              `${defaultApi}/api/server/motivo_baja/${id}/`
          );
          dispatch({
            type: MOTIVOBAJA_DETAILS_SUCCESS,
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
              `${defaultApi}/api/server/motivo_baja/${id}/`,
              config
          );

          dispatch({
            type: MOTIVOBAJA_DETAILS_SUCCESS,
            payload: data,
          });
        }
      } catch (error) {
        dispatch({
          type: MOTIVOBAJA_DETAILS_FAIL,
          payload:
              error.response && error.response.data.detail
                  ? error.response.data.detail
                  : error.message,
        });
      }
    };