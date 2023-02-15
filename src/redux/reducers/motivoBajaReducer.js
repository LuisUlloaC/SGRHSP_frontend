import {
    MOTIVOBAJA_LIST_REQUEST,
    MOTIVOBAJA_LIST_SUCCESS,
    MOTIVOBAJA_LIST_FAIL,
    MOTIVOBAJA_ADD_REQUEST,
    MOTIVOBAJA_ADD_SUCCESS,
    MOTIVOBAJA_ADD_FAIL,
    MOTIVOBAJA_DELETE_REQUEST,
    MOTIVOBAJA_DELETE_SUCCESS,
    MOTIVOBAJA_DELETE_FAIL,
    MOTIVOBAJA_DETAILS_REQUEST,
    MOTIVOBAJA_DETAILS_SUCCESS,
    MOTIVOBAJA_DETAILS_FAIL,
    MOTIVOBAJA_EDIT_REQUEST,
    MOTIVOBAJA_EDIT_SUCCESS,
    MOTIVOBAJA_EDIT_FAIL,
    MOTIVOBAJA_ADD_RESET,
    MOTIVOBAJA_EDIT_RESET,
    MOTIVOBAJA_LIST_RESET,
    MOTIVOBAJA_DELETE_RESET,
    MOTIVOBAJA_DETAILS_RESET
} from "../constants/motivoBajaConstant";

export const motivoBajaListReducer = (state = {motivosBaja: []}, action) => {
    switch (action.type) {
        case MOTIVOBAJA_LIST_REQUEST:
            return {loading: true};

        case MOTIVOBAJA_LIST_SUCCESS:
            return {loading: false, motivosBaja: action.payload};

        case MOTIVOBAJA_LIST_FAIL:
            return {loading: false, error: action.payload};

        case MOTIVOBAJA_LIST_RESET:
            return {};

        default:
            return state;
    }
};

export const addMotivoBajaReducer = (state = {}, action) => {
    switch (action.type) {
        case MOTIVOBAJA_ADD_REQUEST:
            return {loading: true};

        case MOTIVOBAJA_ADD_SUCCESS:
            return {loading: false, success: true};

        case MOTIVOBAJA_ADD_FAIL:
            return {loading: false, error: action.payload};

        case MOTIVOBAJA_ADD_RESET:
            return {};

        default:
            return state;
    }
};

export const deleteMotivoBajaReducer = (state = {}, action) => {
    switch (action.type) {
        case MOTIVOBAJA_DELETE_REQUEST:
            return {loading: true};

        case MOTIVOBAJA_DELETE_SUCCESS:
            return {loading: false, success: true};

        case MOTIVOBAJA_DELETE_FAIL:
            return {loading: false, error: action.payload};

        case MOTIVOBAJA_DELETE_RESET:
            return {};

        default:
            return state;
    }
};

export const motivoBajaDetailsReducers = (state = {motivoBaja: {}}, action) => {
    switch (action.type) {
        case MOTIVOBAJA_DETAILS_REQUEST:
            return {...state, loading: true};

        case MOTIVOBAJA_DETAILS_SUCCESS:
            return {loading: false, motivoBaja: action.payload};

        case MOTIVOBAJA_DETAILS_FAIL:
            return {loading: false, error: action.payload};

        case MOTIVOBAJA_DETAILS_RESET:
            return {user: {}};

        default:
            return state;
    }
};

export const editMotivoBajaReducer = (state = {}, action) => {
    switch (action.type) {
        case MOTIVOBAJA_EDIT_REQUEST:
            return {loading: true};

        case MOTIVOBAJA_EDIT_SUCCESS:
            return {loading: false, success: true};

        case MOTIVOBAJA_EDIT_FAIL:
            return {loading: false, error: action.payload};

        case MOTIVOBAJA_EDIT_RESET:
            return {};

        default:
            return state;
    }
};
