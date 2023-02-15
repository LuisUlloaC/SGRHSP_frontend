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
    FUENTEPROCEDENCIA_ADD_RESET,
    FUENTEPROCEDENCIA_EDIT_RESET,
    FUENTEPROCEDENCIA_LIST_RESET,
    FUENTEPROCEDENCIA_DELETE_RESET,
    FUENTEPROCEDENCIA_DETAILS_RESET
} from "../constants/fuengeProcConstant";

export const fuenteProcListReducer = (state = {fuentesProcedencia: []}, action) => {
    switch (action.type) {
        case FUENTEPROCEDENCIA_LIST_REQUEST:
            return {loading: true};

        case FUENTEPROCEDENCIA_LIST_SUCCESS:
            return {loading: false, fuentesProcedencia: action.payload};

        case FUENTEPROCEDENCIA_LIST_FAIL:
            return {loading: false, error: action.payload};

        case FUENTEPROCEDENCIA_LIST_RESET:
            return {};

        default:
            return state;
    }
};

export const addFuenteProcReducer = (state = {}, action) => {
    switch (action.type) {
        case FUENTEPROCEDENCIA_ADD_REQUEST:
            return {loading: true};

        case FUENTEPROCEDENCIA_ADD_SUCCESS:
            return {loading: false, success: true};

        case FUENTEPROCEDENCIA_ADD_FAIL:
            return {loading: false, error: action.payload};

        case FUENTEPROCEDENCIA_ADD_RESET:
            return {};

        default:
            return state;
    }
};

export const deleteFuenteProcReducer = (state = {}, action) => {
    switch (action.type) {
        case FUENTEPROCEDENCIA_DELETE_REQUEST:
            return {loading: true};

        case FUENTEPROCEDENCIA_DELETE_SUCCESS:
            return {loading: false, success: true};

        case FUENTEPROCEDENCIA_DELETE_FAIL:
            return {loading: false, error: action.payload};

        case FUENTEPROCEDENCIA_DELETE_RESET:
            return {};

        default:
            return state;
    }
};

export const fuenteProcDetailsReducers = (state = {fuenteProcedcencia: {}}, action) => {
    switch (action.type) {
        case FUENTEPROCEDENCIA_DETAILS_REQUEST:
            return {...state, loading: true};

        case FUENTEPROCEDENCIA_DETAILS_SUCCESS:
            return {loading: false, fuenteProcedcencia: action.payload};

        case FUENTEPROCEDENCIA_DETAILS_FAIL:
            return {loading: false, error: action.payload};

        case FUENTEPROCEDENCIA_DETAILS_RESET:
            return {user: {}};

        default:
            return state;
    }
};

export const editFuenteProcReducer = (state = {}, action) => {
    switch (action.type) {
        case FUENTEPROCEDENCIA_EDIT_REQUEST:
            return {loading: true};

        case FUENTEPROCEDENCIA_EDIT_SUCCESS:
            return {loading: false, success: true};

        case FUENTEPROCEDENCIA_EDIT_FAIL:
            return {loading: false, error: action.payload};

        case FUENTEPROCEDENCIA_EDIT_RESET:
            return {};

        default:
            return state;
    }
};
