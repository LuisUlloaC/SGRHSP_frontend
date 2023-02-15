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
    PLAZA_ADD_RESET,
    PLAZA_EDIT_RESET,
    PLAZA_LIST_RESET,
    PLAZA_DELETE_RESET,
    PLAZA_DETAILS_RESET
} from "../constants/plazaConstant";

export const plazaListReducer = (state = {plazas: []}, action) => {
    switch (action.type) {
        case PLAZA_LIST_REQUEST:
            return {loading: true};

        case PLAZA_LIST_SUCCESS:
            return {loading: false, plazas: action.payload};

        case PLAZA_LIST_FAIL:
            return {loading: false, error: action.payload};

        case PLAZA_LIST_RESET:
            return {};

        default:
            return state;
    }
};

export const addPlazaReducer = (state = {}, action) => {
    switch (action.type) {
        case PLAZA_ADD_REQUEST:
            return {loading: true};

        case PLAZA_ADD_SUCCESS:
            return {loading: false, success: true};

        case PLAZA_ADD_FAIL:
            return {loading: false, error: action.payload};

        case PLAZA_ADD_RESET:
            return {};

        default:
            return state;
    }
};

export const deletePlazaReducer = (state = {}, action) => {
    switch (action.type) {
        case PLAZA_DELETE_REQUEST:
            return {loading: true};

        case PLAZA_DELETE_SUCCESS:
            return {loading: false, success: true};

        case PLAZA_DELETE_FAIL:
            return {loading: false, error: action.payload};

        case PLAZA_DELETE_RESET:
            return {};

        default:
            return state;
    }
};

export const plazaDetailsReducers = (state = {plaza: {}}, action) => {
    switch (action.type) {
        case PLAZA_DETAILS_REQUEST:
            return {...state, loading: true};

        case PLAZA_DETAILS_SUCCESS:
            return {loading: false, plaza: action.payload};

        case PLAZA_DETAILS_FAIL:
            return {loading: false, error: action.payload};

        case PLAZA_DETAILS_RESET:
            return {user: {}};

        default:
            return state;
    }
};

export const editPlazaReducer = (state = {}, action) => {
    switch (action.type) {
        case PLAZA_EDIT_REQUEST:
            return {loading: true};

        case PLAZA_EDIT_SUCCESS:
            return {loading: false, success: true};

        case PLAZA_EDIT_FAIL:
            return {loading: false, error: action.payload};

        case PLAZA_EDIT_RESET:
            return {};

        default:
            return state;
    }
};
