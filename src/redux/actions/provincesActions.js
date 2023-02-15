import {
  PROVINCE_LIST_REQUEST,
  PROVINCE_LIST_SUCCESS,
  PROVINCE_LIST_FAIL,
  PROVINCE_ADD_REQUEST,
  PROVINCE_ADD_SUCCESS,
  PROVINCE_ADD_FAIL,
  PROVINCE_DELETE_REQUEST,
  PROVINCE_DELETE_SUCCESS,
  PROVINCE_DELETE_FAIL,
  PROVINCE_DETAILS_REQUEST,
  PROVINCE_DETAILS_SUCCESS,
  PROVINCE_DETAILS_FAIL,
  PROVINCE_EDIT_REQUEST,
  PROVINCE_EDIT_SUCCESS,
  PROVINCE_EDIT_FAIL,
} from "../constants/provinceConstants";
import { defaultApi } from "../../publicUrl";
import axios from "axios";


export const getProvincesList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROVINCE_LIST_REQUEST,
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

    const { data } = await axios.get(`${defaultApi}/api/server/provincias/`, config);

    dispatch({
      type: PROVINCE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error){
    dispatch({
      type: PROVINCE_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


export const addProvince = (province) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROVINCE_ADD_REQUEST,
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

    await axios.post(`${defaultApi}/api/server/provincias/`, province, config);

    dispatch({
      type: PROVINCE_ADD_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PROVINCE_ADD_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deleteProvinces = (provinces) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROVINCE_DELETE_REQUEST,
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
    await axios.post(`${defaultApi}/api/server/provincias/delete/`, provinces, config);

    dispatch({
      type: PROVINCE_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: PROVINCE_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const editProvince = (id, values) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROVINCE_EDIT_REQUEST,
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

    const { data } = await axios.put(`${defaultApi}/api/server/provincias/${id}/`,
      values,
      config
    );

    dispatch({
      type: PROVINCE_EDIT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PROVINCE_EDIT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getProvinceDetails = (id, allowAccess) => async (dispatch, getState) => {
      try {
        dispatch({
          type: PROVINCE_DETAILS_REQUEST,
        });

        if (allowAccess) {
          const { data } = await axios.get(
              `${defaultApi}/api/server/provincias/${id}/`
          );
          dispatch({
            type: PROVINCE_DETAILS_SUCCESS,
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
              `${defaultApi}/api/server/provincias/${id}/`,
              config
          );

          dispatch({
            type: PROVINCE_DETAILS_SUCCESS,
            payload: data,
          });
        }
      } catch (error) {
        dispatch({
          type: PROVINCE_DETAILS_FAIL,
          payload:
              error.response && error.response.data.detail
                  ? error.response.data.detail
                  : error.message,
        });
      }
    };
