import { RESET_CONTAINER, SET_CURRENT_CONTAINER, SET_LOADING } from "../constants"

const initialState = {
    loading: false,
    data: {},
}
export default function (state = initialState, action) {
    switch (action.type) {
        case SET_LOADING: 
        return {
            ...state,
            loading: action.payload,
        };
        case SET_CURRENT_CONTAINER: 
        return {
            ...state,
            loading: false,
            data: action.payload,
        };
        case RESET_CONTAINER: 
        return {
            ...state,
            loading: false,
            data: {},
        };
        default:
            return state;
    }
}