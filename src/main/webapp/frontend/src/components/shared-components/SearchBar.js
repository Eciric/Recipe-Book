import React, { useState } from "react";
import { ExpandMore } from "@material-ui/icons";
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from "@material-ui/core";
import { Modal } from "react-bootstrap";
import { LikesFilter } from "./filter-components/LikesFilter";
import { DateFilter } from "./filter-components/DateFilter";
import { TagsFilter } from "./filter-components/TagsFilter";
import { IngredientsFilter } from "./filter-components/IngredientsFilter";

export const SearchBar = ({ text, recipes, callback }) => {
    const sortingOptions = [
        "title-asc",
        "title-desc",
        "tags-asc",
        "tags-desc",
        "likes-asc",
        "likes-desc",
    ];
    const filterOptions = ["tags", "date", "likes", "ingredients"];

    const [modalShow, setModalShow] = useState(false);

    const [selectedSortingOption, setSelectedSortingOption] = useState("");
    const [currentTags, setCurrentTags] = useState([]);
    const [currentIngredients, setCurrentIngredients] = useState([]);
    const [fromDate, setFromDate] = useState(0);
    const [toDate, setToDate] = useState(0);
    const [fromLikes, setFromLikes] = useState(0);
    const [toLikes, setToLikes] = useState(0);

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

    const handleSortingOptionClicked = (sortingOption) => {
        setSelectedSortingOption(sortingOption);
    };

    const handleSavingFilters = () => {
        console.log(recipes);
        if (selectedSortingOption) {
            sortRecipes();
        }
        setModalShow(false);
    };

    const sortRecipes = () => {
        const type = selectedSortingOption.split("-")[0];
        const dir = selectedSortingOption.split("-")[1];
        const sortedRecipes = recipes.sort((a, b) => {
            if (dir === "asc") {
                if (a[type] > b[type]) return 1;
                else return -1;
            } else {
                if (a[type] < b[type]) return 1;
                else return -1;
            }
        });
        callback(sortedRecipes);
    };

    return (
        <div className="searchBar row my-5">
            <div className="col-sm-12 col-md-10 searchBar__search mt-2">
                <input
                    id="searchBar"
                    className="search-control form-control-lg"
                    type="search"
                    placeholder={text}
                    onChange={handleSearchQueryChange}
                    aria-label="Search"
                />
            </div>
            <div className="col-sm-12 col-md-2 searchBar__filters mt-2">
                <button
                    className="filters__dialog-button btn btn-primary"
                    onClick={() => {
                        setModalShow(true);
                    }}
                >
                    Filters
                </button>
            </div>

            <Modal
                show={modalShow}
                onHide={() => {
                    setModalShow(false);
                }}
                size="md"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <h3>Filter and sort recipes here!</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4>Sort recipes by:</h4>
                    <div className="modal-body__sort text-center">
                        {sortingOptions.map((option) => {
                            const optionClass = "sort__" + option;
                            const sortDirection = option.split("-")[1];
                            return (
                                <div key={option} className={optionClass}>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => {
                                            handleSortingOptionClicked(option);
                                        }}
                                    >
                                        {option.charAt(0).toUpperCase() +
                                            option.slice(1).split("-")[0]}
                                        {sortDirection === "asc" ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                className="bi bi-caret-up-fill ms-1"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                                            </svg>
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="16"
                                                height="16"
                                                fill="currentColor"
                                                className="bi bi-caret-down-fill"
                                                viewBox="0 0 16 16"
                                            >
                                                <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                    <hr></hr>
                    <h4>Filter recipes by:</h4>
                    <div className="modal-body__filter">
                        {filterOptions.map((option) => {
                            return (
                                <Accordion
                                    key={option}
                                    className="accordion-custom"
                                >
                                    <AccordionSummary
                                        expandIcon={<ExpandMore />}
                                    >
                                        <h4>
                                            {option.charAt(0).toUpperCase() +
                                                option.slice(1)}
                                        </h4>
                                    </AccordionSummary>

                                    <AccordionDetails>
                                        {option === "tags" && (
                                            <TagsFilter
                                                tags={currentTags}
                                                setTags={setCurrentTags}
                                            ></TagsFilter>
                                        )}
                                        {option === "date" && (
                                            <DateFilter
                                                toDate={toDate}
                                                setToDate={setToDate}
                                                fromDate={fromDate}
                                                setFromDate={setFromDate}
                                            ></DateFilter>
                                        )}
                                        {option === "likes" && (
                                            <LikesFilter
                                                fromLikes={fromLikes}
                                                setFromLikes={setFromLikes}
                                                toLikes={toLikes}
                                                setToLikes={setToLikes}
                                            ></LikesFilter>
                                        )}
                                        {option === "ingredients" && (
                                            <IngredientsFilter
                                                ingredients={currentIngredients}
                                                setIngredients={
                                                    setCurrentIngredients
                                                }
                                            ></IngredientsFilter>
                                        )}
                                    </AccordionDetails>
                                </Accordion>
                            );
                        })}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        type="button"
                        className="btn btn-primary"
                        onClick={handleSavingFilters}
                    >
                        Save current settings
                    </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
