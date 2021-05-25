import { useState, useEffect } from "react";
import { base64toBlob } from "../services/base64ToBlob";
import { getAllRecipes } from "../services/recipeService";
import { RecipeList } from "./RecipeList";
import { SearchBar } from "./SearchBar";
import { NoRecipes } from "./NoRecipes";
import { Pagination } from "./Pagination";

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
                setLoading(false);
                setRecipes(newRecipes);
                setDisplayRecipes(newRecipes);
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
