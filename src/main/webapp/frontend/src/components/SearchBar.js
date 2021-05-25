import React from "react";

export const SearchBar = ({ text, recipes, callback }) => {
    const handleSearchQueryChange = (e) => {
        if (e.target.value === "") {
            callback(recipes);
        } else {
            let filteredRecipes = recipes.filter((recipe) =>
                recipe.title
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase())
            );
            callback(filteredRecipes);
        }
    };

    return (
        <div className="searchBar">
            <form className="form-inline my-5">
                <input
                    id="searchBar"
                    className="form-control auth-control form-control-lg"
                    type="search"
                    placeholder={text}
                    onChange={handleSearchQueryChange}
                    aria-label="Search"
                />
            </form>
        </div>
    );
};
