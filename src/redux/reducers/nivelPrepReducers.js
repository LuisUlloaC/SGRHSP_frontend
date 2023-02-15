import {
    NIVELPREPARACION_LIST_REQUEST,
    NIVELPREPARACION_LIST_SUCCESS,
    NIVELPREPARACION_LIST_FAIL,
    NIVELPREPARACION_ADD_REQUEST,
    NIVELPREPARACION_ADD_SUCCESS,
    NIVELPREPARACION_ADD_FAIL,
    NIVELPREPARACION_DELETE_REQUEST,
    NIVELPREPARACION_DELETE_SUCCESS,
    NIVELPREPARACION_DELETE_FAIL,
    NIVELPREPARACION_DETAILS_REQUEST,
    NIVELPREPARACION_DETAILS_SUCCESS,
    NIVELPREPARACION_DETAILS_FAIL,
    NIVELPREPARACION_EDIT_REQUEST,
    NIVELPREPARACION_EDIT_SUCCESS,
    NIVELPREPARACION_EDIT_FAIL,
    NIVELPREPARACION_ADD_RESET,
    NIVELPREPARACION_EDIT_RESET,
    NIVELPREPARACION_LIST_RESET,
    NIVELPREPARACION_DELETE_RESET,
    NIVELPREPARACION_DETAILS_RESET
} from "../constants/nivelPrepConstants";

export const nivelPrepListReducer = (state = {nivelesPrep: []}, action) => {
    switch (action.type) {
        case NIVELPREPARACION_LIST_REQUEST:
            return {loading: true};

        case NIVELPREPARACION_LIST_SUCCESS:
            return {loading: false, nivelesPrep: action.payload};

        case NIVELPREPARACION_LIST_FAIL:
            return {loading: false, error: action.payload};

        case NIVELPREPARACION_LIST_RESET:
            return {};

        default:
            return state;
    }
};

export const addNivelPrepReducer = (state = {}, action) => {
    switch (action.type) {
        case NIVELPREPARACION_ADD_REQUEST:
            return {loading: true};

        case NIVELPREPARACION_ADD_SUCCESS:
            return {loading: false, success: true};

        case NIVELPREPARACION_ADD_FAIL:
            return {loading: false, error: action.payload};

        case NIVELPREPARACION_ADD_RESET:
            return {};

        default:
            return state;
    }
};

export const deleteNivelPrepReducer = (state = {}, action) => {
    switch (action.type) {
        case NIVELPREPARACION_DELETE_REQUEST:
            return {loading: true};

        case NIVELPREPARACION_DELETE_SUCCESS:
            return {loading: false, success: true};

        case NIVELPREPARACION_DELETE_FAIL:
            return {loading: false, error: action.payload};

        case NIVELPREPARACION_DELETE_RESET:
            return {};

        default:
            return state;
    }
};

export const nivelPrepDetailsReducers = (state = {nivelPrep: {}}, action) => {
    switch (action.type) {
        case NIVELPREPARACION_DETAILS_REQUEST:
            return {...state, loading: true};

        case NIVELPREPARACION_DETAILS_SUCCESS:
            return {loading: false, nivelPrep: action.payload};

        case NIVELPREPARACION_DETAILS_FAIL:
            return {loading: false, error: action.payload};

        case NIVELPREPARACION_DETAILS_RESET:
            return {user: {}};

        default:
            return state;
    }
};

export const ediNivelPrepReducer = (state = {}, action) => {
    switch (action.type) {
        case NIVELPREPARACION_EDIT_REQUEST:
            return {loading: true};

        case NIVELPREPARACION_EDIT_SUCCESS:
            return {loading: false, success: true};

        case NIVELPREPARACION_EDIT_FAIL:
            return {loading: false, error: action.payload};

        case NIVELPREPARACION_EDIT_RESET:
            return {};

        default:
            return state;
    }
};
