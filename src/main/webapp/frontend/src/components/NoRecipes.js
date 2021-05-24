import React from "react";

export const NoRecipes = () => {
    return (
        <div className="noRecipes mb-5">
            <p>No recipes? Add some now!</p>
            <a href="/recipecreator" className="my-1">
                <button type="button" className="btn btn-primary my-3">
                    Create your first recipe!
                </button>
            </a>
        </div>
    );
};
