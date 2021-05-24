import { useState, useEffect } from "react";
import { base64toBlob } from "../services/base64ToBlob";
import { getAllRecipes } from "../services/recipeService";
import { RecipeList } from "./RecipeList";
import { SearchBar } from "./SearchBar";
import { NoRecipes } from "./NoRecipes";

const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [displayRecipes, setDisplayRecipes] = useState([]);
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

    const handleSearchPhraseChange = (e) => {
        if (e.target.value === "") {
            setDisplayRecipes(recipes);
        } else {
            let filteredRecipes = recipes.filter((recipe) =>
                recipe.title
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
            );
            setDisplayRecipes(filteredRecipes);
        }
    };

    return (
        <div className="home">
            <SearchBar callback={handleSearchPhraseChange} />
            <RecipeList
                loading={loading}
                recipes={displayRecipes}
                noRecipesComponent={<NoRecipes />}
            />
        </div>
    );
};

export default Home;
