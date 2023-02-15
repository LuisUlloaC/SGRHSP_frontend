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
    CARGO_ADD_RESET,
    CARGO_EDIT_RESET,
    CARGO_LIST_RESET,
    CARGO_DELETE_RESET,
    CARGO_DETAILS_RESET
} from "../constants/cargoConstants";

export const cargoListReducer = (state = {cargos: []}, action) => {
    switch (action.type) {
        case CARGO_LIST_REQUEST:
            return {loading: true};

        case CARGO_LIST_SUCCESS:
            return {loading: false, cargos: action.payload};

        case CARGO_LIST_FAIL:
            return {loading: false, error: action.payload};

        case CARGO_LIST_RESET:
            return {};

        default:
            return state;
    }
};

export const addCargoReducer = (state = {}, action) => {
    switch (action.type) {
        case CARGO_ADD_REQUEST:
            return {loading: true};

        case CARGO_ADD_SUCCESS:
            return {loading: false, success: true};

        case CARGO_ADD_FAIL:
            return {loading: false, error: action.payload};

        case CARGO_ADD_RESET:
            return {};

        default:
            return state;
    }
};

export const deleteCargoReducer = (state = {}, action) => {
    switch (action.type) {
        case CARGO_DELETE_REQUEST:
            return {loading: true};

        case CARGO_DELETE_SUCCESS:
            return {loading: false, success: true};

        case CARGO_DELETE_FAIL:
            return {loading: false, error: action.payload};

        case CARGO_DELETE_RESET:
            return {};

        default:
            return state;
    }
};

export const cargoDetailsReducers = (state = {cargo: {}}, action) => {
    switch (action.type) {
        case CARGO_DETAILS_REQUEST:
            return {...state, loading: true};

        case CARGO_DETAILS_SUCCESS:
            return {loading: false, cargo: action.payload};

        case CARGO_DETAILS_FAIL:
            return {loading: false, error: action.payload};

        case CARGO_DETAILS_RESET:
            return {user: {}};

        default:
            return state;
    }
};

export const editCargoReducer = (state = {}, action) => {
    switch (action.type) {
        case CARGO_EDIT_REQUEST:
            return {loading: true};

        case CARGO_EDIT_SUCCESS:
            return {loading: false, success: true};

        case CARGO_EDIT_FAIL:
            return {loading: false, error: action.payload};

        case CARGO_EDIT_RESET:
            return {};

        default:
            return state;
    }
};
