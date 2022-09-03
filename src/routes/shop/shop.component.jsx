
import './shop.styles.scss';
import { Route, Routes } from 'react-router-dom';
import CategoriesPreview from '../categories-preview/categories-preview.component';
import Category from '../category/category.component';
import { setCategoriesMap } from '../../store/categories/categories.action';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils';
import { fetchCategoriesAsync } from '../../store/categories/categories.action';

const Shop = () =>{
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCategoriesAsync());
    }, []);

    return (
        <Routes>
            <Route index element={<CategoriesPreview/>} />
            {/* ':category'  is a parameter passed by the path so .../hats the parameter is hats*/}
            <Route path=':category' element={<Category/>} />
        </Routes>
    );
}

export default Shop;