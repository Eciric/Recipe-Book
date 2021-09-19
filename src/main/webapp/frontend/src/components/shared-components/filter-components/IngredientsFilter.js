import React from "react";
import { Tags } from "../Tags";

export const IngredientsFilter = ({ ingredients, setIngredients }) => {
    const suggestions = [
        { id: "chicken", text: "chicken" },
        { id: "egg", text: "egg" },
        { id: "milk", text: "milk" },
        { id: "flour", text: "flour" },
        { id: "beef", text: "beef" },
        { id: "avocado", text: "avocado" },
        { id: "corn", text: "corn" },
        { id: "pasta", text: "pasta" },
    ];
    return (
        <div>
            <p className="mb-2">Adjust ingredients to filter by</p>
            <Tags
                tags={ingredients}
                setTags={setIngredients}
                suggestions={suggestions}
            ></Tags>
        </div>
    );
};
