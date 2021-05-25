import React from "react";

export const Pagination = ({ recipesPerPage, totalRecipes, callback }) => {
    const pageNumbers = [];
    const upperBound = Math.ceil(totalRecipes / recipesPerPage);
    for (let i = 1; i <= upperBound; i++) {
        pageNumbers.push(i);
    }
    console.log(pageNumbers);
    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map((number) => (
                    <li key={number} className="page-item">
                        <a
                            onClick={() => callback(number)}
                            className="page-link"
                        >
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};
