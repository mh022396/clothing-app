import './checkout-item.styles.scss';
import { removeItemInCart, addItemToCart, clearItemInCheckout } from '../../store/cart/cart.action';
import { useDispatch, useSelector } from 'react-redux';
import { selecCartItems } from '../../store/cart/cart.selector';

const CheckoutItem = ({cartItem}) => {
    const dispatch = useDispatch();
    const cartItems = useSelector(selecCartItems);
    //const {removeItemInCheckout, addItemToCart, removeItemInCart} = useContext(CartContext);

    const removeItem = () => dispatch(clearItemInCheckout(cartItems, cartItem));
    const decrementItem = () => dispatch(removeItemInCart(cartItems, cartItem));
    const incrementItem = () => dispatch(addItemToCart(cartItems,cartItem));

    return (
        <div className="checkout-item-container">
            <div className="image-container">
                <img src={cartItem.imageUrl} alt={`${cartItem.name}`} />
            </div>
            <span className='name'>{cartItem.name}</span>
            <span className='quantity'>
                <div className="arrow" onClick={decrementItem}>&#10094;</div>
                <span className='value'>{cartItem.quantity}</span>
                <div className="arrow" onClick={incrementItem}>&#10095;</div>
            </span>
            <span className='price'>{`$${cartItem.price * cartItem.quantity}.00`}</span>
            <div className="remove-button" onClick={removeItem}>&#10005;</div>
        </div>
    );
}

export default CheckoutItem;