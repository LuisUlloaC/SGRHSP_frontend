import {
  NUMBERS,
  TRABXCLAS_DATA,
  TRABXCLAS_ERROR,
  TRABXCLAS_RESET,
  MUNXCLAS_SUCCESS,
  MUNXCLAS_DATA,
  MUNXCLAS_ERROR,
  TRABXCLAS_SUCCESS,
  MUNXCLAS_RESET,
  CATOCUPXTRAB_DATA,
  CATOCUPXTRAB_ERROR,
  CATOCUPXTRAB_SUCCESS,
  CATOCUPXTRAB_RESET,
  NIVPREPXTRAB_DATA,
  NIVPREPXTRAB_ERROR,
  NIVPREPXTRAB_SUCCESS,
  NIVPREPXTRAB_RESET,
  UNIDADORGXNIVPREP_DATA,
  UNIDADORGXNIVPREP_ERROR,
  UNIDADORGXNIVPREP_SUCCESS,
  UNIDADORGXNIVPREP_RESET
} from "../constants/dashboardConstants";

export const numbersReducers = (
  state = { users: 0},
  action
) => {
  switch (action.type) {
    case NUMBERS.GET_DATA:
      return { loading: true };

    case NUMBERS.DATA_SUCCESS:
      const data = action.payload;
      return {
        loading: false,
        users: data.users
      };

    case NUMBERS.DATA_ERROR:
      return { loading: false, error: action.payload };

    case NUMBERS.DATA_RESET:
      return { users: 0 };

    default:
      return state;
  }
};

export const trabXClasReducers = (
  state = { trabXClas: []},
  action
) => {
  switch (action.type) {
    case TRABXCLAS_DATA:
      return { loading: true };

    case TRABXCLAS_SUCCESS:
      return {
        loading: false,
        trabXClas: action.payload
      };

    case TRABXCLAS_ERROR:
      return { loading: false, error: action.payload };

    case TRABXCLAS_RESET:
      return {};

    default:
      return state;
  }
};

export const munXClasReducers = (
  state = { munXClas: []},
  action
) => {
  switch (action.type) {
    case MUNXCLAS_DATA:
      return { loading: true };

    case MUNXCLAS_SUCCESS:
      return {
        loading: false,
        munXClas: action.payload
      };

    case MUNXCLAS_ERROR:
      return { loading: false, error: action.payload };

    case MUNXCLAS_RESET:
      return {};

    default:
      return state;
  }
};


export const catOcupXTrabReducers = (
  state = { catOcupXTrab: []},
  action
) => {
  switch (action.type) {
    case CATOCUPXTRAB_DATA:
      return { loading: true };

    case CATOCUPXTRAB_SUCCESS:
      return {
        loading: false,
        catOcupXTrab: action.payload
      };

    case CATOCUPXTRAB_ERROR:
      return { loading: false, error: action.payload };

    case CATOCUPXTRAB_RESET:
      return {};

    default:
      return state;
  }
};



export const nivPrepXTrabReducers = (
  state = { nivPrepXTrab: []},
  action
) => {
  switch (action.type) {
    case NIVPREPXTRAB_DATA:
      return { loading: true };

    case NIVPREPXTRAB_SUCCESS:
      return {
        loading: false,
        nivPrepXTrab: action.payload
      };

    case NIVPREPXTRAB_ERROR:
      return { loading: false, error: action.payload };

    case NIVPREPXTRAB_RESET:
      return {};

    default:
      return state;
  }
};


export const unidadOrgXNivPrepReducers = (
  state = { unidadOrgXNivPrep: []},
  action
) => {
  switch (action.type) {
    case UNIDADORGXNIVPREP_DATA:
      return { loading: true };

    case UNIDADORGXNIVPREP_SUCCESS:
      return {
        loading: false,
        unidadOrgXNivPrep: action.payload
      };

    case UNIDADORGXNIVPREP_ERROR:
      return { loading: false, error: action.payload };

    case UNIDADORGXNIVPREP_RESET:
      return {};

    default:
      return state;
  }
};