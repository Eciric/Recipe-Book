import React from "react";

export const Pagination = ({ recipesPerPage, totalRecipes, callback }) => {
    const pageNumbers = [];
    const upperBound = Math.ceil(totalRecipes / recipesPerPage);
    for (let i = 1; i <= upperBound; i++) {
        pageNumbers.push(i);
    }
    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map((number) => (
                    <li key={number} className="page-item">
                        <button
                            onClick={() => callback(number)}
                            className="page-link"
                        >
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
