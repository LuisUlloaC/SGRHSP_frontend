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
    OBJECT_ADD_RESET,
    OBJECT_EDIT_RESET,
    OBJECT_LIST_RESET,
    OBJECT_DELETE_RESET,
    OBJECT_DETAILS_RESET
} from "../constants/objectsConstants";

export const unidadOrgListReducer = (state = {unidadesOrg: []}, action) => {
    switch (action.type) {
        case OBJECT_LIST_REQUEST:
            return {loading: true};

        case OBJECT_LIST_SUCCESS:
            return {loading: false, unidadesOrg: action.payload};

        case OBJECT_LIST_FAIL:
            return {loading: false, error: action.payload};

        case OBJECT_LIST_RESET:
            return {};

        default:
            return state;
    }
};

export const addUnidadOrgReducer = (state = {}, action) => {
    switch (action.type) {
        case OBJECT_ADD_REQUEST:
            return {loading: true};

        case OBJECT_ADD_SUCCESS:
            return {loading: false, success: true};

        case OBJECT_ADD_FAIL:
            return {loading: false, error: action.payload};

        case OBJECT_ADD_RESET:
            return {};

        default:
            return state;
    }
};

export const deleteUnidadesOrgReducer = (state = {}, action) => {
    switch (action.type) {
        case OBJECT_DELETE_REQUEST:
            return {loading: true};

        case OBJECT_DELETE_SUCCESS:
            return {loading: false, success: true};

        case OBJECT_DELETE_FAIL:
            return {loading: false, error: action.payload};

        case OBJECT_DELETE_RESET:
            return {};

        default:
            return state;
    }
};

export const unidadOrgDetailsReducers = (state = {unidadOrg: {}}, action) => {
    switch (action.type) {
        case OBJECT_DETAILS_REQUEST:
            return {...state, loading: true};

        case OBJECT_DETAILS_SUCCESS:
            return {loading: false, unidad: action.payload};

        case OBJECT_DETAILS_FAIL:
            return {loading: false, error: action.payload};

        case OBJECT_DETAILS_RESET:
            return {user: {}};

        default:
            return state;
    }
};

export const editUnidadOrgReducer = (state = {}, action) => {
    switch (action.type) {
        case OBJECT_EDIT_REQUEST:
            return {loading: true};

        case OBJECT_EDIT_SUCCESS:
            return {loading: false, success: true};

        case OBJECT_EDIT_FAIL:
            return {loading: false, error: action.payload};

        case OBJECT_EDIT_RESET:
            return {};

        default:
            return state;
    }
};
