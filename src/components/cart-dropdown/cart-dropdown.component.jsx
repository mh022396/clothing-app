import './cart-dropdown.styles.scss';
import Button from '../button/button.component';
import CartItem from '../cart-item/cart-item.component';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selecCartItems } from '../../store/cart/cart.selector';

const CartDropDown = () => {
    //const {cartItems} = useContext(CartContext);
    const cartItems = useSelector(selecCartItems);
    const navigate = useNavigate();

    const goToCheckout = () => {
        navigate('/checkout');
    }

    return(
        <div className='cart-dropdown-container'>
            <div className='cart-items'>
                {cartItems.map((item) => {return(<CartItem key={item.id} cartItem={item}/>);})}
            </div>
            <Button onClick={goToCheckout}>GO TO CHECKOUT</Button>
        </div>
    );
}

export default CartDropDown;