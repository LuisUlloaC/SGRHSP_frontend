import {
  PLAZA_LIST_REQUEST,
  PLAZA_LIST_SUCCESS,
  PLAZA_LIST_FAIL,
  PLAZA_ADD_REQUEST,
  PLAZA_ADD_SUCCESS,
  PLAZA_ADD_FAIL,
  PLAZA_DELETE_REQUEST,
  PLAZA_DELETE_SUCCESS,
  PLAZA_DELETE_FAIL,
  PLAZA_DETAILS_REQUEST,
  PLAZA_DETAILS_SUCCESS,
  PLAZA_DETAILS_FAIL,
  PLAZA_EDIT_REQUEST,
  PLAZA_EDIT_SUCCESS,
  PLAZA_EDIT_FAIL,
} from "../constants/plazaConstant";
import { defaultApi } from "../../publicUrl";
import axios from "axios";


export const getPlazasList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PLAZA_LIST_REQUEST,
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

    const { data } = await axios.get(`${defaultApi}/api/server/plaza/`, config);

    dispatch({
      type: PLAZA_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PLAZA_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


export const addPlaza = (cargo) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PLAZA_ADD_REQUEST,
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

    await axios.post(`${defaultApi}/api/server/plaza/`, cargo, config);

    dispatch({
      type: PLAZA_ADD_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PLAZA_ADD_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deletePlazas = (cargo) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PLAZA_DELETE_REQUEST,
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
    await axios.post(`${defaultApi}/api/server/plaza/delete/`, cargo, config);

    dispatch({
      type: PLAZA_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PLAZA_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const editPlaza = (id, values) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PLAZA_EDIT_REQUEST,
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

    const { data } = await axios.put(`${defaultApi}/api/server/plaza/${id}/`,
      values,
      config
    );

    dispatch({
      type: PLAZA_EDIT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PLAZA_EDIT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getPlazaDetails = (id, allowAccess) => async (dispatch, getState) => {
      try {
        dispatch({
          type: PLAZA_DETAILS_REQUEST,
        });

        if (allowAccess) {
          const { data } = await axios.get(
              `${defaultApi}/api/server/plaza/${id}/`
          );
          dispatch({
            type: PLAZA_DETAILS_SUCCESS,
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
              `${defaultApi}/api/server/plaza/${id}/`,
              config
          );

          dispatch({
            type: PLAZA_DETAILS_SUCCESS,
            payload: data,
          });
        }
      } catch (error) {
        dispatch({
          type: PLAZA_DETAILS_FAIL,
          payload:
              error.response && error.response.data.detail
                  ? error.response.data.detail
                  : error.message,
        });
      }
    };
