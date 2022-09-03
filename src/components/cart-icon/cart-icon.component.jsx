import './cart-icon.styles.scss';
import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsCartOpen, selecCartItems } from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';

const CartIcon = () => {
    //const {isCartOpen, setIsCartOpen, cartItems} = useContext(CartContext);
    const dispatch = useDispatch();
    const cartItems = useSelector(selecCartItems);
    const isCartOpen = useSelector(selectIsCartOpen);

    const toggleIsCartopen = () =>{
        dispatch(setIsCartOpen(!isCartOpen));
    }

    const countTotalItems = () => {
        let count = 0;
        cartItems.forEach( (item) => (count = count + item.quantity));
        return count;
    }

    return(
        <div className='cart-icon-container' onClick={toggleIsCartopen}>
            <ShoppingIcon className='shopping-icon'/>
            <span className='item-count'>{countTotalItems()}</span>
        </div>
    );
}

export default CartIcon;