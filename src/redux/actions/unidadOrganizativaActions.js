import {
  OBJECT_LIST_REQUEST,
  OBJECT_LIST_SUCCESS,
  OBJECT_LIST_FAIL,
  OBJECT_ADD_REQUEST,
  OBJECT_ADD_SUCCESS,
  OBJECT_ADD_FAIL,
  OBJECT_DELETE_REQUEST,
  OBJECT_DELETE_SUCCESS,
  OBJECT_DELETE_FAIL,
  OBJECT_DETAILS_REQUEST,
  OBJECT_DETAILS_SUCCESS,
  OBJECT_DETAILS_FAIL,
  OBJECT_EDIT_REQUEST,
  OBJECT_EDIT_SUCCESS,
  OBJECT_EDIT_FAIL,
} from "../constants/objectsConstants";
import { defaultApi } from "../../publicUrl";
import axios from "axios";


export const getUnidadOrgList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: OBJECT_LIST_REQUEST,
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

    const { data } = await axios.get(`${defaultApi}/api/server/unidad_organizativa/`, config);

    dispatch({
      type: OBJECT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: OBJECT_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


export const addUnidadOrg = (unidadOrg) => async (dispatch, getState) => {
  try {
    dispatch({
      type: OBJECT_ADD_REQUEST,
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

    await axios.post(`${defaultApi}/api/server/unidad_organizativa/`, unidadOrg, config);

    dispatch({
      type: OBJECT_ADD_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: OBJECT_ADD_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deleteUnidadesOrg = (unidadesOrg) => async (dispatch, getState) => {
  try {
    dispatch({
      type: OBJECT_DELETE_REQUEST,
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
    await axios.post(`${defaultApi}/api/server/unidad_organizativa/delete/`, unidadesOrg, config);

    dispatch({
      type: OBJECT_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: OBJECT_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const editUnidadOrg = (id, values) => async (dispatch, getState) => {
  try {
    dispatch({
      type: OBJECT_EDIT_REQUEST,
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

    const { data } = await axios.put(`${defaultApi}/api/server/unidad_organizativa/${id}/`,
      values,
      config
    );

    dispatch({
      type: OBJECT_EDIT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: OBJECT_EDIT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getUnidadOrgDetails = (id, allowAccess) => async (dispatch, getState) => {
      try {
        dispatch({
          type: OBJECT_DETAILS_REQUEST,
        });

        if (allowAccess) {
          const { data } = await axios.get(
              `${defaultApi}/api/server/unidad_organizativa/${id}/`
          );
          dispatch({
            type: OBJECT_DETAILS_SUCCESS,
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
              `${defaultApi}/api/server/unidad_organizativa/${id}/`,
              config
          );

          dispatch({
            type: OBJECT_DETAILS_SUCCESS,
            payload: data,
          });
        }
      } catch (error) {
        dispatch({
          type: OBJECT_DETAILS_FAIL,
          payload:
              error.response && error.response.data.detail
                  ? error.response.data.detail
                  : error.message,
        });
      }
    };
