import { useState, useEffect } from "react";
import RecipeTile from "./RecipeTile";
import { base64toBlob } from "../services/base64ToBlob";
import { getAllRecipes } from "../services/recipeService";

const Home = () => {
    const [testRecipes, setTestRecipes] = useState([]);
    useEffect(() => {
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
                        contents: recipe.recipeData.recipe_text,
                        likes: recipe.recipeData.likes,
                        date: recipe.recipeData.date_created,
                        img: URL.createObjectURL(
                            base64toBlob(recipe.image, "image/png")
                        ),
                    });
                });
                setTestRecipes(newRecipes);
            });
    }, []);

    return (
        <div className="home">
            <div className="searchBar">
                <form className="form-inline my-5">
                    <input
                        id="searchBar"
                        className="form-control auth-control form-control-lg"
                        type="search"
                        placeholder="What are you looking for?"
                        aria-label="Search"
                    />
                </form>
            </div>
            <section className="recipeList">
                <div className="row justify-content-around">
                    {testRecipes.map((recipe) => {
                        return (
                            <RecipeTile
                                title={recipe.title}
                                img={recipe.img}
                                key={recipe.id}
                            />
                        );
                    })}
                </div>
            </section>
        </div>
    );
};

export default Home;
