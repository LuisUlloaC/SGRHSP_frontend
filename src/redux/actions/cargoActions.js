import {
  CARGO_LIST_REQUEST,
  CARGO_LIST_SUCCESS,
  CARGO_LIST_FAIL,
  CARGO_ADD_REQUEST,
  CARGO_ADD_SUCCESS,
  CARGO_ADD_FAIL,
  CARGO_DELETE_REQUEST,
  CARGO_DELETE_SUCCESS,
  CARGO_DELETE_FAIL,
  CARGO_DETAILS_REQUEST,
  CARGO_DETAILS_SUCCESS,
  CARGO_DETAILS_FAIL,
  CARGO_EDIT_REQUEST,
  CARGO_EDIT_SUCCESS,
  CARGO_EDIT_FAIL,
} from "../constants/cargoConstants";
import { defaultApi } from "../../publicUrl";
import axios from "axios";


export const getCargosList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CARGO_LIST_REQUEST,
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

    const { data } = await axios.get(`${defaultApi}/api/server/cargo/`, config);

    dispatch({
      type: CARGO_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CARGO_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


export const addCargo = (cargo) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CARGO_ADD_REQUEST,
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

    await axios.post(`${defaultApi}/api/server/cargo/`, cargo, config);

    dispatch({
      type: CARGO_ADD_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: CARGO_ADD_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const deleteCargos = (cargo) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CARGO_DELETE_REQUEST,
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
    await axios.post(`${defaultApi}/api/server/cargo/delete/`, cargo, config);

    dispatch({
      type: CARGO_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: CARGO_DELETE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const editCargo = (id, values) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CARGO_EDIT_REQUEST,
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

    const { data } = await axios.put(`${defaultApi}/api/server/cargo/${id}/`,
      values,
      config
    );

    dispatch({
      type: CARGO_EDIT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CARGO_EDIT_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getCargoDetails = (id, allowAccess) => async (dispatch, getState) => {
      try {
        dispatch({
          type: CARGO_DETAILS_REQUEST,
        });

        if (allowAccess) {
          const { data } = await axios.get(
              `${defaultApi}/api/server/cargo/${id}/`
          );
          dispatch({
            type: CARGO_DETAILS_SUCCESS,
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
              `${defaultApi}/api/server/cargo/${id}/`,
              config
          );

          dispatch({
            type: CARGO_DETAILS_SUCCESS,
            payload: data,
          });
        }
      } catch (error) {
        dispatch({
          type: CARGO_DETAILS_FAIL,
          payload:
              error.response && error.response.data.detail
                  ? error.response.data.detail
                  : error.message,
        });
      }
    };
