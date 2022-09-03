import CategoryPreview from "../../components/category-preview/category-preview.component";
import { useSelector } from "react-redux";
import { selectCategoriesIsLoading, selectCategoriesMap } from "../../store/categories/categories.selector";
import { Fragment } from "react";
import Spinner from "../../components/spinner/spinner.component";

const CategoriesPreview = () =>{
    //const {categoriesMap} = useContext(CategoriesContext);
    const categoriesMap = useSelector(selectCategoriesMap);
    const isLoading = useSelector(selectCategoriesIsLoading);

    return (
        <Fragment>
            { isLoading ? <Spinner /> : 
                (
                    Object.keys(categoriesMap).map((title) => {
                        return(
                            <CategoryPreview key={title} title={title} products={categoriesMap[title]}/>
                        );
                    })
                )
            }
        </Fragment>
    );
}

export default CategoriesPreview;