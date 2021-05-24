import React from "react";

export const SearchBar = ({ callback }) => {
    return (
        <div className="searchBar">
            <form className="form-inline my-5">
                <input
                    id="searchBar"
                    className="form-control auth-control form-control-lg"
                    type="search"
                    placeholder="What are you looking for?"
                    onChange={callback}
                    aria-label="Search"
                />
            </form>
        </div>
    );
};
