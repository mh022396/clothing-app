import { CATEGORIES_ACTION_TYPE } from "./categories.type"
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils";

export const setCategoriesMap = (categoriesArray) => {
    return {type: CATEGORIES_ACTION_TYPE.SET_CATEGORIES, payload: categoriesArray};
}

export const fetchCategoriesStart = () => {
    return {type: CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_START};
}

export const fetchCategoriesSuccess = (categoriesArray) => {
    return {type: CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_SUCCESS, payload: categoriesArray};
}

export const fetchCategoriesFailure = (error) => {
    return {type: CATEGORIES_ACTION_TYPE.FETCH_CATEGORIES_FAILED, payload: error};
}

export const fetchCategoriesAsync =  () => async (dispatch) => {
    dispatch(fetchCategoriesStart());
    try {
        const categoriesArray = await getCategoriesAndDocuments();
        dispatch(fetchCategoriesSuccess(categoriesArray));
    } catch (error) {
        dispatch(fetchCategoriesFailure(error));
    }
}