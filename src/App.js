import Home from "./routes/home/home.component";
import {Routes, Route} from 'react-router-dom';
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";
import Shop from "./routes/shop/shop.component";
import Checkout from "./routes/checkout/checkout.component";

import { useEffect } from "react";
import { onAuthStateChangedListener, signOutUser, createUserDocumentFromAuth } from "./utils/firebase/firebase.utils";
import { setCurrentUser } from "./store/user/user.action";
import { useDispatch } from "react-redux";

 const App = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    //called when mounting
    const unsub = onAuthStateChangedListener((user) => {//user will be the auth value in 
        if(user){
            createUserDocumentFromAuth(user);//creates doc on firebase if it doesnt already exist for user
        }
        dispatch(setCurrentUser(user)); //This component and its children are rendered again with the change of state
    });

    // will run this unsubscribe function call back on unmount
    return unsub;
  }, [dispatch]);

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />}/>
        {/* Shop will have its own routes */}
        <Route path='shop/*' element={<Shop />}/>
        <Route path='auth' element={<Authentication />}/>
        <Route path='checkout' element= {<Checkout />} />
      </Route>
    </Routes>
  );
}

export default App;
