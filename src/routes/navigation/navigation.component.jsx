import {Outlet, Link} from 'react-router-dom';
import { Fragment, useContext } from 'react';
import { ReactComponent as Crwnlogo } from '../../assets/crown.svg';
import '../navigation/navigation.styles.scss'
import { signOutUser } from '../../utils/firebase/firebase.utils';
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropDown from '../../components/cart-dropdown/cart-dropdown.component';
import { useSelector } from 'react-redux';
import { selectIsCartOpen } from '../../store/cart/cart.selector';

const Navigation = () => {
  
  //const {currentUser} = useContext(UserContext); //will remount on change to current user
  const currentUser =  useSelector((state) => state.user.currentUser); //will remount on change to current user
  //const {isCartOpen} = useContext(CartContext); //will remount on change to isCartOpen
  const isCartOpen = useSelector((state) => state.cart.isCartOpen);

  return (
    <Fragment>

      <div className='navigation'>
        <Link className='logo-container' to='/'>
          <Crwnlogo className='logo'/>
        </Link>
        
        <div className='nav-links-container'>
          <Link className='nav-link' to='/shop'>
            SHOP
          </Link>

          { currentUser 
            ?(
              <span className='nav-link' onClick={signOutUser}>SIGN OUT</span>
            )
            :(
              <Link className='nav-link' to='/auth'>
                SIGN-IN
              </Link>
            ) 
          }

          <CartIcon/>

        </div>
        {isCartOpen && <CartDropDown />}
        
      </div>

      <Outlet />
      
    </Fragment>

  );
}

export default Navigation;