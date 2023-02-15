import {
    PROVINCE_LIST_REQUEST,
    PROVINCE_LIST_SUCCESS,
    PROVINCE_LIST_FAIL,
    PROVINCE_ADD_REQUEST,
    PROVINCE_ADD_SUCCESS,
    PROVINCE_ADD_FAIL,
    PROVINCE_DELETE_REQUEST,
    PROVINCE_DELETE_SUCCESS,
    PROVINCE_DELETE_FAIL,
    PROVINCE_DETAILS_REQUEST,
    PROVINCE_DETAILS_SUCCESS,
    PROVINCE_DETAILS_FAIL,
    PROVINCE_EDIT_REQUEST,
    PROVINCE_EDIT_SUCCESS,
    PROVINCE_EDIT_FAIL,
    PROVINCE_ADD_RESET,
    PROVINCE_EDIT_RESET,
    PROVINCE_LIST_RESET,
    PROVINCE_DELETE_RESET,
    PROVINCE_DETAILS_RESET
} from "../constants/provinceConstants";

export const provinceListReducer = (state = {provinces: []}, action) => {
    switch (action.type) {
        case PROVINCE_LIST_REQUEST:
            return {loading: true};

        case PROVINCE_LIST_SUCCESS:
            return {loading: false, provinces: action.payload};

        case PROVINCE_LIST_FAIL:
            return {loading: false, error: action.payload};

        case PROVINCE_LIST_RESET:
            return {};

        default:
            return state;
    }
};

export const addProvinceReducer = (state = {}, action) => {
    switch (action.type) {
        case PROVINCE_ADD_REQUEST:
            return {loading: true};

        case PROVINCE_ADD_SUCCESS:
            return {loading: false, success: true};

        case PROVINCE_ADD_FAIL:
            return {loading: false, error: action.payload};

        case PROVINCE_ADD_RESET:
            return {};

        default:
            return state;
    }
};

export const deleteProvincesReducer = (state = {}, action) => {
    switch (action.type) {
        case PROVINCE_DELETE_REQUEST:
            return {loading: true};

        case PROVINCE_DELETE_SUCCESS:
            return {loading: false, success: true};

        case PROVINCE_DELETE_FAIL:
            return {loading: false, error: action.payload};

        case PROVINCE_DELETE_RESET:
            return {};

        default:
            return state;
    }
};

export const provinceDetailsReducers = (state = {province: {}}, action) => {
    switch (action.type) {
        case PROVINCE_DETAILS_REQUEST:
            return {...state, loading: true};

        case PROVINCE_DETAILS_SUCCESS:
            return {loading: false, province: action.payload};

        case PROVINCE_DETAILS_FAIL:
            return {loading: false, error: action.payload};

        case PROVINCE_DETAILS_RESET:
            return {user: {}};

        default:
            return state;
    }
};

export const editProvinceReducer = (state = {}, action) => {
    switch (action.type) {
        case PROVINCE_EDIT_REQUEST:
            return {loading: true};

        case PROVINCE_EDIT_SUCCESS:
            return {loading: false, success: true};

        case PROVINCE_EDIT_FAIL:
            return {loading: false, error: action.payload};

        case PROVINCE_EDIT_RESET:
            return {};

        default:
            return state;
    }
};
