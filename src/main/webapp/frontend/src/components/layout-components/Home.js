import { useState, useEffect } from "react";
import { base64toBlob } from "../../services/file-services/base64ToBlob";
import { getAllRecipes } from "../../services/recipe-services/recipeService";
import { RecipeList } from "../recipe-components/RecipeList";
import { NoRecipes } from "../recipe-components/NoRecipes";
import { SearchBar } from "../shared-components/SearchBar";
import { Pagination } from "../shared-components/Pagination";
import { getAllRecipeLikes } from "../../services/user-services/likeService";
import { getRecipeTags } from "../../services/recipe-services/tagsService";
import { getRecipeIngredients } from "../../services/recipe-services/ingredientsService";

const Home = () => {
    const [recipes, setRecipes] = useState([]);

    const [displayRecipes, setDisplayRecipes] = useState([]);
    const [currentRecipes, setCurrentRecipes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recipesPerPage] = useState(15);
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
                recipes.forEach((recipe, index) => {
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
                    getAllRecipeLikes(recipe.recipeData.recipe_id)
                        .then((res) => res.json())
                        .then((json) => {
                            newRecipes[index].likes = json.length;
                        });
                    getRecipeTags(recipe.recipeData.recipe_id).then((res) => {
                        const tags = [];
                        res.forEach((item) => {
                            tags.push(item.tag);
                        });
                        newRecipes[index].tags = tags;
                    });
                    getRecipeIngredients(recipe.recipeData.recipe_id).then(
                        (res) => {
                            const ingredients = [];
                            res.forEach((item) => {
                                ingredients.push(item.ingredient);
                            });
                            newRecipes[index].ingredients = ingredients;
                        }
                    );
                });

                setLoading(false);
                setRecipes(newRecipes);
                setDisplayRecipes(newRecipes);
                const indexOfLastRecipe = currentPage * recipesPerPage;
                const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
                setCurrentRecipes(
                    newRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe)
                );
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
            });
    }, [currentPage, recipesPerPage]);

    const updateSearch = (filteredRecipes) => {
        setCurrentPage(1);
        setDisplayRecipes(filteredRecipes);
        console.log(filteredRecipes);
        const indexOfLastRecipe = currentPage * recipesPerPage;
        const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
        setCurrentRecipes(
            filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe)
        );
    };

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
        const indexOfLastRecipe = currentPage * recipesPerPage;
        const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
        setCurrentRecipes(
            displayRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe)
        );
    };

    return (
        <div className="home">
            <h1 className="display-5 ms-3 mt-3" style={{ color: "#683ed1" }}>
                Your go to recipe portal
            </h1>
            <SearchBar
                text="Search for recipes"
                recipes={recipes}
                callback={updateSearch}
            />
            <hr />
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
