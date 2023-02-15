import {
  CATOCUP_LIST_REQUEST,
  CATOCUP_LIST_SUCCESS,
  CATOCUP_LIST_FAIL,
  CATOCUP_ADD_REQUEST,
  CATOCUP_ADD_SUCCESS,
  CATOCUP_ADD_FAIL,
  CATOCUP_DELETE_REQUEST,
  CATOCUP_DELETE_SUCCESS,
  CATOCUP_DELETE_FAIL,
  CATOCUP_DETAILS_REQUEST,
  CATOCUP_DETAILS_SUCCESS,
  CATOCUP_DETAILS_FAIL,
  CATOCUP_EDIT_REQUEST,
  CATOCUP_EDIT_SUCCESS,
  CATOCUP_EDIT_FAIL,
} from "../constants/catOcupacionalConstants";
import { defaultApi } from "../../publicUrl";
import axios from "axios";


export const getCatOcupacionalList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CATOCUP_LIST_REQUEST,
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

    const { data } = await axios.get(`${defaultApi}/api/server/cat_ocupacional/`, config);

    dispatch({
      type: CATOCUP_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATOCUP_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


export const addCatOcupacional = (catOcupacional) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CATOCUP_ADD_REQUEST,
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

    await axios.post(`${defaultApi}/api/server/cat_ocupacional/`, catOcupacional, config);

    dispatch({
      type: CATOCUP_ADD_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: CATOCUP_ADD_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deleteCatOcupacionales = (catOcupacionales) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CATOCUP_DELETE_REQUEST,
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
    await axios.post(`${defaultApi}/api/server/cat_ocupacional/delete/`, catOcupacionales, config);

    dispatch({
      type: CATOCUP_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: CATOCUP_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const editCatOcupacional = (id, values) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CATOCUP_EDIT_REQUEST,
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

    const { data } = await axios.put(`${defaultApi}/api/server/cat_ocupacional/${id}/`,
      values,
      config
    );

    dispatch({
      type: CATOCUP_EDIT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATOCUP_EDIT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getCatOcupacionalDetails = (id, allowAccess) => async (dispatch, getState) => {
      try {
        dispatch({
          type: CATOCUP_DETAILS_REQUEST,
        });

        if (allowAccess) {
          const { data } = await axios.get(
              `${defaultApi}/api/server/cat_ocupacional/${id}/`
          );
          dispatch({
            type: CATOCUP_DETAILS_SUCCESS,
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
              `${defaultApi}/api/server/cat_ocupacional/${id}/`,
              config
          );

          dispatch({
            type: CATOCUP_DETAILS_SUCCESS,
            payload: data,
          });
        }
      } catch (error) {
        dispatch({
          type: CATOCUP_DETAILS_FAIL,
          payload:
              error.response && error.response.data.detail
                  ? error.response.data.detail
                  : error.message,
        });
      }
    };
