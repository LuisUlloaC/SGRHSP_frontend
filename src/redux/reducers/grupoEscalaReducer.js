import {
    GRUPOESCALA_LIST_REQUEST,
    GRUPOESCALA_LIST_SUCCESS,
    GRUPOESCALA_LIST_FAIL,
    GRUPOESCALA_ADD_REQUEST,
    GRUPOESCALA_ADD_SUCCESS,
    GRUPOESCALA_ADD_FAIL,
    GRUPOESCALA_DELETE_REQUEST,
    GRUPOESCALA_DELETE_SUCCESS,
    GRUPOESCALA_DELETE_FAIL,
    GRUPOESCALA_DETAILS_REQUEST,
    GRUPOESCALA_DETAILS_SUCCESS,
    GRUPOESCALA_DETAILS_FAIL,
    GRUPOESCALA_EDIT_REQUEST,
    GRUPOESCALA_EDIT_SUCCESS,
    GRUPOESCALA_EDIT_FAIL,
    GRUPOESCALA_ADD_RESET,
    GRUPOESCALA_EDIT_RESET,
    GRUPOESCALA_LIST_RESET,
    GRUPOESCALA_DELETE_RESET,
    GRUPOESCALA_DETAILS_RESET
} from "../constants/grupoEscConstants";

export const grupoEscalaListReducer = (state = {gruposEscala: []}, action) => {
    switch (action.type) {
        case GRUPOESCALA_LIST_REQUEST:
            return {loading: true};

        case GRUPOESCALA_LIST_SUCCESS:
            return {loading: false, gruposEscala: action.payload};

        case GRUPOESCALA_LIST_FAIL:
            return {loading: false, error: action.payload};

        case GRUPOESCALA_LIST_RESET:
            return {};

        default:
            return state;
    }
};

export const addGrupoEscalaReducer = (state = {}, action) => {
    switch (action.type) {
        case GRUPOESCALA_ADD_REQUEST:
            return {loading: true};

        case GRUPOESCALA_ADD_SUCCESS:
            return {loading: false, success: true};

        case GRUPOESCALA_ADD_FAIL:
            return {loading: false, error: action.payload};

        case GRUPOESCALA_ADD_RESET:
            return {};

        default:
            return state;
    }
};

export const deleteGruposEscalaReducer = (state = {}, action) => {
    switch (action.type) {
        case GRUPOESCALA_DELETE_REQUEST:
            return {loading: true};

        case GRUPOESCALA_DELETE_SUCCESS:
            return {loading: false, success: true};

        case GRUPOESCALA_DELETE_FAIL:
            return {loading: false, error: action.payload};

        case GRUPOESCALA_DELETE_RESET:
            return {};

        default:
            return state;
    }
};

export const grupoEscalaDetailsReducers = (state = {grupoEscala: {}}, action) => {
    switch (action.type) {
        case GRUPOESCALA_DETAILS_REQUEST:
            return {...state, loading: true};

        case GRUPOESCALA_DETAILS_SUCCESS:
            return {loading: false, grupoEscala: action.payload};

        case GRUPOESCALA_DETAILS_FAIL:
            return {loading: false, error: action.payload};

        case GRUPOESCALA_DETAILS_RESET:
            return {user: {}};

        default:
            return state;
    }
};

export const editGrupoEscalaReducer = (state = {}, action) => {
    switch (action.type) {
        case GRUPOESCALA_EDIT_REQUEST:
            return {loading: true};

        case GRUPOESCALA_EDIT_SUCCESS:
            return {loading: false, success: true};

        case GRUPOESCALA_EDIT_FAIL:
            return {loading: false, error: action.payload};

        case GRUPOESCALA_EDIT_RESET:
            return {};

        default:
            return state;
    }
};
