import { CART_ACTION_TYPES } from "./cart.type"
import { createAction } from "@reduxjs/toolkit"

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find((cartItem) => {
        return cartItem.id === productToAdd.id;
    });

    if(existingCartItem){
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem);
    }

    return [...cartItems, {...productToAdd, quantity: 1}];
}

const removeCartItem = (cartItems, productToRemove) => {
    console.log('remove');
    const existingCartItem = cartItems.find((cartItem) => {
        return cartItem.id === productToRemove.id;
    });

    if(existingCartItem){
        return cartItems.filter((item) => ((item.id === productToRemove.id && item.quantity > 1) || item.id !== productToRemove.id )).map((item) => {
            if(item.id === productToRemove.id){
                item.quantity = item.quantity - 1;
            }
            return item;
        });
    }
}

const clearItem = (cartItems, productToRemove) =>{
    return cartItems.filter((item) => (item.id !== productToRemove.id));
}

//Set cartitems action
export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = (addCartItem(cartItems, productToAdd));
    return ({type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: newCartItems});
}

//Set cartitems action
export const removeItemInCart = (cartItems, productToRemove) => {
    const newCartItems = (removeCartItem(cartItems, productToRemove));
    return ({type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: newCartItems});
}

//Set cartitems action
export const clearItemInCheckout = (cartItems, productToRemove) => {
    const newCartItems = (clearItem(cartItems, productToRemove));
    return ({type: CART_ACTION_TYPES.SET_CART_ITEMS, payload: newCartItems});
}

//Set cart open toggle action
export const setIsCartOpen = (boolean) => {
    return ({type: CART_ACTION_TYPES.SET_DROPDOWN_BOOL, payload: boolean});
}