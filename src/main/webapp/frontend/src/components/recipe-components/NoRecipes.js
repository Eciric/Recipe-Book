import React from "react";
import { Link } from "react-router-dom";

export const NoRecipes = () => {
    return (
        <div className="noRecipes mb-5">
            <p>No recipes? Add some now!</p>
            <Link to="/recipecreator" className="my-1">
                <button type="button" className="btn btn-primary my-3">
                    Create your first recipe!
                </button>
            </Link>
        </div>
    );
};
