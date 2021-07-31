import { useState, useEffect } from "react";
import { base64toBlob } from "../../services/file-services/base64ToBlob";
import { getAllRecipes } from "../../services/recipe-services/recipeService";
import { RecipeList } from "../recipe-components/RecipeList";
import { NoRecipes } from "../recipe-components/NoRecipes";
import { SearchBar } from "../shared-components/SearchBar";
import { Pagination } from "../shared-components/Pagination";

const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [displayRecipes, setDisplayRecipes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage] = useState(12);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getAllRecipes()
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                const recipes = json.recipes;
                let newRecipes = [];
                recipes.forEach((recipe) => {
                    newRecipes.push({
                        id: recipe.recipeData.recipe_id,
                        user_id: recipe.recipeData.user_id,
                        title: recipe.recipeData.title,
                        likes: recipe.recipeData.likes,
                        date: recipe.recipeData.date_created,
                        img: URL.createObjectURL(
                            base64toBlob(recipe.image, "image/png")
                        ),
                    });
                });

                let sortedRecipes = newRecipes.sort((first, second) => {
                    let compareVal = 0;
                    let firstTitle = first.title.toLowerCase();
                    let secondTitle = second.title.toLowerCase();
                    if (firstTitle > secondTitle) compareVal = 1;
                    else if (firstTitle < secondTitle) compareVal = -1;
                    return compareVal;
                });

                setLoading(false);
                setRecipes(sortedRecipes);
                setDisplayRecipes(sortedRecipes);
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
    }, []);

    const updateSearch = (filteredRecipes) => {
        setCurrentPage(1);
        setDisplayRecipes(filteredRecipes);
    };

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = displayRecipes.slice(
        indexOfFirstRecipe,
        indexOfLastRecipe
    );

    return (
        <div className="home">
            <SearchBar
                text="What are you looking for?"
                recipes={recipes}
                callback={updateSearch}
            />
            <RecipeList
                loading={loading}
                recipes={currentRecipes}
                noRecipesComponent={<NoRecipes />}
            />
            <Pagination
                recipesPerPage={recipesPerPage}
                totalRecipes={displayRecipes.length}
                callback={paginate}
            />
        </div>
    );
};

export default Home;
