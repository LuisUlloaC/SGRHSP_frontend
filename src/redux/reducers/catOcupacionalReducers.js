import {
    CATOCUP_LIST_REQUEST,
    CATOCUP_LIST_SUCCESS,
    CATOCUP_LIST_FAIL,
    CATOCUP_ADD_REQUEST,
    CATOCUP_ADD_SUCCESS,
    CATOCUP_ADD_FAIL,
    CATOCUP_DELETE_REQUEST,
    CATOCUP_DELETE_SUCCESS,
    CATOCUP_DELETE_FAIL,
    CATOCUP_DETAILS_REQUEST,
    CATOCUP_DETAILS_SUCCESS,
    CATOCUP_DETAILS_FAIL,
    CATOCUP_EDIT_REQUEST,
    CATOCUP_EDIT_SUCCESS,
    CATOCUP_EDIT_FAIL,
    CATOCUP_ADD_RESET,
    CATOCUP_EDIT_RESET,
    CATOCUP_LIST_RESET,
    CATOCUP_DELETE_RESET,
    CATOCUP_DETAILS_RESET
} from "../constants/catOcupacionalConstants";

export const catOcupacionalListReducer = (state = {catOcupacionales: []}, action) => {
    switch (action.type) {
        case CATOCUP_LIST_REQUEST:
            return {loading: true};

        case CATOCUP_LIST_SUCCESS:
            return {loading: false, catOcupacionales: action.payload};

        case CATOCUP_LIST_FAIL:
            return {loading: false, error: action.payload};

        case CATOCUP_LIST_RESET:
            return {};

        default:
            return state;
    }
};

export const addCatOcupacionalReducer = (state = {}, action) => {
    switch (action.type) {
        case CATOCUP_ADD_REQUEST:
            return {loading: true};

        case CATOCUP_ADD_SUCCESS:
            return {loading: false, success: true};

        case CATOCUP_ADD_FAIL:
            return {loading: false, error: action.payload};

        case CATOCUP_ADD_RESET:
            return {};

        default:
            return state;
    }
};

export const deleteCatOcupacionalesReducer = (state = {}, action) => {
    switch (action.type) {
        case CATOCUP_DELETE_REQUEST:
            return {loading: true};

        case CATOCUP_DELETE_SUCCESS:
            return {loading: false, success: true};

        case CATOCUP_DELETE_FAIL:
            return {loading: false, error: action.payload};

        case CATOCUP_DELETE_RESET:
            return {};

        default:
            return state;
    }
};

export const catOcupacionalDetailsReducers = (state = {catOcupacional: {}}, action) => {
    switch (action.type) {
        case CATOCUP_DETAILS_REQUEST:
            return {...state, loading: true};

        case CATOCUP_DETAILS_SUCCESS:
            return {loading: false, catOcupacional: action.payload};

        case CATOCUP_DETAILS_FAIL:
            return {loading: false, error: action.payload};

        case CATOCUP_DETAILS_RESET:
            return {user: {}};

        default:
            return state;
    }
};

export const editCatOcupacionalReducer = (state = {}, action) => {
    switch (action.type) {
        case CATOCUP_EDIT_REQUEST:
            return {loading: true};

        case CATOCUP_EDIT_SUCCESS:
            return {loading: false, success: true};

        case CATOCUP_EDIT_FAIL:
            return {loading: false, error: action.payload};

        case CATOCUP_EDIT_RESET:
            return {};

        default:
            return state;
    }
};
