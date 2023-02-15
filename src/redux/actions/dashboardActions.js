import {
  NUMBERS,
  TRABXCLAS_DATA,
  TRABXCLAS_ERROR,
  MUNXCLAS_SUCCESS,
  MUNXCLAS_DATA,
  MUNXCLAS_ERROR,
  TRABXCLAS_SUCCESS,
  CATOCUPXTRAB_DATA,
  CATOCUPXTRAB_ERROR,
  CATOCUPXTRAB_SUCCESS,
  NIVPREPXTRAB_DATA,
  NIVPREPXTRAB_ERROR,
  NIVPREPXTRAB_SUCCESS,
  UNIDADORGXNIVPREP_DATA,
  UNIDADORGXNIVPREP_ERROR,
  UNIDADORGXNIVPREP_SUCCESS
} from "../constants/dashboardConstants";


import axios from "axios";
import { defaultApi } from '../../publicUrl';


export const getMainNumbers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: NUMBERS.GET_DATA,
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

    const { data } = await axios.get(
      `${defaultApi}/api/dashboard/getMainNumbers/`,
      config
    );

    dispatch({
      type: NUMBERS.DATA_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NUMBERS.DATA_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


export const getTrabajadoresXClasificacion = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: TRABXCLAS_DATA,
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

    const { data } = await axios.get(
      `${defaultApi}/api/dashboard/getTrabajadoresXClasificacion/`,
      config
    );

    dispatch({
      type: TRABXCLAS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: TRABXCLAS_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


export const getMunicipioXClasificacion = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: MUNXCLAS_DATA,
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

    const { data } = await axios.get(
      `${defaultApi}/api/dashboard/getMunicipioXClasificacion/`,
      config
    );

    dispatch({
      type: MUNXCLAS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MUNXCLAS_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getCatOcupXTrab = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: CATOCUPXTRAB_DATA,
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

    const { data } = await axios.get(
      `${defaultApi}/api/dashboard/getCatOcupXTrab/`,
      config
    );

    dispatch({
      type: CATOCUPXTRAB_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CATOCUPXTRAB_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getNivPrepXTrab = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: NIVPREPXTRAB_DATA,
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

    const { data } = await axios.get(
      `${defaultApi}/api/dashboard/getNivPrepXTrab/`,
      config
    );

    dispatch({
      type: NIVPREPXTRAB_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: NIVPREPXTRAB_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


export const getUnidadOrgXNivPrep = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: UNIDADORGXNIVPREP_DATA,
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

    const { data } = await axios.get(
      `${defaultApi}/api/dashboard/getUnidadOrgXNivPrep/`,
      config
    );

    dispatch({
      type: UNIDADORGXNIVPREP_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UNIDADORGXNIVPREP_ERROR,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

