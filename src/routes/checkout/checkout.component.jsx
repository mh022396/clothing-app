import './checkout.styles.scss';
import { useEffect } from 'react';
import CheckoutItem from '../../components/checkout-item/checkout-item.component';
import { useDispatch, useSelector } from 'react-redux';
import { selecCartItems, selectCartTotal } from '../../store/cart/cart.selector';
import { setIsCartOpen } from '../../store/cart/cart.action';
import PaymentForm from '../../components/payment-form/payment-form.component';

const Checkout = () => {
    
    const dispatch = useDispatch();

    //const {cartItems, setIsCartOpen, cartTotal} = useContext(CartContext);
    const cartItems = useSelector(selecCartItems);
    const cartTotal = useSelector(selectCartTotal);


    useEffect(() => {
        dispatch(setIsCartOpen(false));
    }, []);

    return(
        <div className='checkout-container'>
            <div className='checkout-header'>
                <div className='header-block'>
                    <span>Product</span>
                </div>
                <div className='header-block'>
                    <span>Description</span>
                </div>
                <div className='header-block'>
                    <span>Quantity</span>
                </div>
                <div className='header-block'>
                    <span>Price</span>
                </div>
                <div className='header-block'>
                    <span>Remove</span>
                </div>
            </div>
                {
                    cartItems.map((item) => {
                        return (
                            <CheckoutItem key={item.id} cartItem={item}/>
                        );
                    })
                }
                <span className='total'>Total: {`$${cartTotal}.00`}</span>
                <PaymentForm />
                
        </div>
    );
}

export default Checkout;