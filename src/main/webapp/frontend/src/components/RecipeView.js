import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getRecipeById } from "../services/recipeService";

export const RecipeView = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Fetch recipe related data

        getRecipeById(id)
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });
    }, []);

    return (
        <div className="container my-5">
            <div className="recipeInfo">
                <p>Recipe Title</p>
                <p>Recipe img</p>
                <p>total likes and comments</p>
            </div>
            <div></div>
        </div>
    );
};
