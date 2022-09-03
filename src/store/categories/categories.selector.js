import { createSelector } from "@reduxjs/toolkit";

const selectCategoryReducer = (state) => state.categories;

export const selectCategoriesMap = createSelector(
    [selectCategoryReducer], //get categories
    (categories) => categories.categories.reduce((acc, category) => { //if different run this and trigger re render
        const {title, items} = category; 
        acc[title.toLowerCase()] = items; //looping through the snap shot will add to object: {title: items->(id, imageUrl, name, price)}
        return acc;
    }, {})
    )

export const selectCategoriesIsLoading = createSelector(
    [selectCategoryReducer], 
    (categories) => {return categories.isLoading;}
    )