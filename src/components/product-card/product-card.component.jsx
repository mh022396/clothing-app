import './product-card.styles.scss';
import Button from '../button/button.component';
import { addItemToCart } from '../../store/cart/cart.action';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { selecCartItems } from '../../store/cart/cart.selector';

const ProductCard = ({product}) => {
    //const {addItemToCart} = useContext(CartContext);
    const dispatch = useDispatch();
    const cartItems = useSelector(selecCartItems);

    const addProductToCart = () => dispatch(addItemToCart(cartItems, product));

    return(
        <div className='product-card-container'>
            <img src={product.imageUrl} alt={`${product.name}`}/>
            <div className='footer'>
                <span className='name'>{product.name}</span>
                <span className='price'>{product.price}</span>
            </div>
            <Button buttonType='inverted' onClick={addProductToCart} >Add to cart</Button>
        </div>
    );
}

export default ProductCard;