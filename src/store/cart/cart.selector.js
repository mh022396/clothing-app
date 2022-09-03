import { createSelector } from "@reduxjs/toolkit";

const cartReducer = state => state.cart;

export const selectIsCartOpen = createSelector(
    [cartReducer],
    (cart) => cart.isCartOpen
);

export const selecCartItems = createSelector(
    [cartReducer],
    (cart) => cart.cartItems
);

export const selectCartTotal = createSelector(
    [selecCartItems],
    (cartItems) => {
        let total = 0;
        cartItems.forEach((item) => total = total + (item.quantity * item.price));
        return total;
    }
)