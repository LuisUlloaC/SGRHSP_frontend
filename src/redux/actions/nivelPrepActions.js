import {
  NIVELPREPARACION_LIST_REQUEST,
  NIVELPREPARACION_LIST_SUCCESS,
  NIVELPREPARACION_LIST_FAIL,
  NIVELPREPARACION_ADD_REQUEST,
  NIVELPREPARACION_ADD_SUCCESS,
  NIVELPREPARACION_ADD_FAIL,
  NIVELPREPARACION_DELETE_REQUEST,
  NIVELPREPARACION_DELETE_SUCCESS,
  NIVELPREPARACION_DELETE_FAIL,
  NIVELPREPARACION_DETAILS_REQUEST,
  NIVELPREPARACION_DETAILS_SUCCESS,
  NIVELPREPARACION_DETAILS_FAIL,
  NIVELPREPARACION_EDIT_REQUEST,
  NIVELPREPARACION_EDIT_SUCCESS,
  NIVELPREPARACION_EDIT_FAIL,
} from "../constants/nivelPrepConstants";
import { defaultApi } from "../../publicUrl";
import axios from "axios";


export const getNivelPrepList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: NIVELPREPARACION_LIST_REQUEST,
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

    const { data } = await axios.get(`${defaultApi}/api/server/nivel_preparacion/`, config);

    dispatch({
      type: NIVELPREPARACION_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NIVELPREPARACION_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


export const addNivelPrep = (nivelPrep) => async (dispatch, getState) => {
  try {
    dispatch({
      type: NIVELPREPARACION_ADD_REQUEST,
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

    await axios.post(`${defaultApi}/api/server/nivel_preparacion/`, nivelPrep, config);

    dispatch({
      type: NIVELPREPARACION_ADD_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: NIVELPREPARACION_ADD_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deleteNivelPrep = (nivelesPrep) => async (dispatch, getState) => {
  try {
    dispatch({
      type: NIVELPREPARACION_DELETE_REQUEST,
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
    await axios.post(`${defaultApi}/api/server/nivel_preparacion/delete/`, nivelesPrep, config);

    dispatch({
      type: NIVELPREPARACION_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: NIVELPREPARACION_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const editNivelPrep = (id, values) => async (dispatch, getState) => {
  try {
    dispatch({
      type: NIVELPREPARACION_EDIT_REQUEST,
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

    const { data } = await axios.put(`${defaultApi}/api/server/nivel_preparacion/${id}/`,
      values,
      config
    );

    dispatch({
      type: NIVELPREPARACION_EDIT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NIVELPREPARACION_EDIT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getNivelPrepDetails = (id, allowAccess) => async (dispatch, getState) => {
      try {
        dispatch({
          type: NIVELPREPARACION_DETAILS_REQUEST,
        });

        if (allowAccess) {
          const { data } = await axios.get(
              `${defaultApi}/api/server/nivel_preparacion/${id}/`
          );
          dispatch({
            type: NIVELPREPARACION_DETAILS_SUCCESS,
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
              `${defaultApi}/api/server/nivel_preparacion/${id}/`,
              config
          );

          dispatch({
            type: NIVELPREPARACION_DETAILS_SUCCESS,
            payload: data,
          });
        }
      } catch (error) {
        dispatch({
          type: NIVELPREPARACION_DETAILS_FAIL,
          payload:
              error.response && error.response.data.detail
                  ? error.response.data.detail
                  : error.message,
        });
      }
    };