import {useParams} from 'react-router-dom';
import {useState, useEffect, Fragment } from 'react';
import ProductCard from '../../components/product-card/product-card.component';
import './category.styles.scss';
import { useSelector } from 'react-redux';
import { selectCategoriesMap, selectCategoriesIsLoading } from '../../store/categories/categories.selector';
import Spinner from '../../components/spinner/spinner.component';

const Category = () => {
    const {category} = useParams();
    //const {categoriesMap} = useContext(CategoriesContext);
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);
    const [products, setProducts] = useState(categoriesMap[category]);

    useEffect(() => {
        setProducts(categoriesMap[category]);
    }, [category, categoriesMap])

    return (
        <Fragment>
            <h2 className='category-title'>{category.toUpperCase()}</h2>
            {
                isLoading ? (<Spinner />) : 
                (
                    <div className='category-container'>
                        {
                            products &&
                            products.map((product) => <ProductCard product={product} key={product.id} />)
                        }
                    </div>
                )
            }

        </Fragment>
    );
}

export default Category;