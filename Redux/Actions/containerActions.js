import Toast from "react-native-toast-message"
import baseURL from "../../assets/common/baseUrl"

import {
    SET_CURRENT_CONTAINER,
    SET_LOADING,
    RESET_CONTAINER
} from '../constants';

export const getContainerById = (container) => {
    return async dispatch => {
        dispatch(setLoading(true))
        return await fetch(`${baseURL}containers/${container.id}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
        })
        .then((res) => res.json())
        .then((data) => {
            if (data) {
                console.log('Success Get Container')
                dispatch(setContainer(data))
                return data
            } else {
                dispatch(setContainer({}))
            }
        })
        .catch((err) => {
            console.log(err)
            Toast.show({
                topOffset: 60,
                type: "error",
                text1: "Please provide correct id",
                text2: ""
            });
        });
    }
};

export const resetContainer = () => {
    return {
        type: RESET_CONTAINER,
    }
}

export const setContainer = (container) => {
    return {
        type: SET_CURRENT_CONTAINER,
        payload: container
    }
}

export const setLoading = (loading) => {
    return {
        type: SET_LOADING,
        payload: loading
    }
}