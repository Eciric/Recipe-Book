import React, { useState, useEffect } from "react";
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

    const [tempRecipes, setTempRecipes] = useState([]);

    const [selectedSortingOption, setSelectedSortingOption] = useState("");
    const [currentTags, setCurrentTags] = useState([]);
    const [currentIngredients, setCurrentIngredients] = useState([]);
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [fromLikes, setFromLikes] = useState("");
    const [toLikes, setToLikes] = useState("");

    useEffect(() => {
        setTempRecipes(recipes);
    }, [recipes]);

    const handleSearchQueryChange = (e) => {
        if (e.target.value === "") {
            callback(tempRecipes);
        } else {
            let filteredRecipes = tempRecipes.filter((recipe) =>
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
        if (selectedSortingOption) {
            sortRecipes();
        }

        filter();

        setModalShow(false);
    };

    const sortRecipes = () => {
        console.log(recipes);
        const type = selectedSortingOption.split("-")[0];
        const dir = selectedSortingOption.split("-")[1];
        const sortedRecipes = tempRecipes.sort((a, b) => {
            if (dir === "asc") {
                if (a[type] > b[type]) return 1;
                else return -1;
            } else {
                if (a[type] < b[type]) return 1;
                else return -1;
            }
        });
        setTempRecipes(sortedRecipes);
        console.log(recipes);
    };

    const filterIngredients = (filterRecipes) => {
        const flattenedIngredients = currentIngredients.map(
            (ingredient) => ingredient.text
        );
        const filteredRecipes = filterRecipes.filter((recipe) => {
            const matchingIngredients = recipe.ingredients.filter(
                (ingredient) => flattenedIngredients.includes(ingredient)
            );
            return matchingIngredients && matchingIngredients.length;
        });
        setTempRecipes(filteredRecipes);
        return filteredRecipes;
    };

    const filterTags = (filterRecipes) => {
        const flattenedTags = currentTags.map((tag) => tag.text);
        const filteredRecipes = filterRecipes.filter((recipe) => {
            const matchingTags = recipe.tags.filter((tag) =>
                flattenedTags.includes(tag)
            );
            return matchingTags && matchingTags.length;
        });
        setTempRecipes(filteredRecipes);
        return filteredRecipes;
    };

    const filterDate = (filterRecipes) => {
        const filteredRecipes = filterRecipes.filter((recipe) => {
            const recipeDate = new Date(recipe.date);
            const from = new Date(fromDate);
            const to = new Date(toDate);
            return (
                recipeDate.getTime() >= from.getTime() &&
                recipeDate.getTime() <= to.getTime()
            );
        });
        setTempRecipes(filteredRecipes);
        return filteredRecipes;
    };

    const filterLikes = (filterRecipes) => {
        const filteredRecipes = filterRecipes.filter(
            (recipe) => recipe.likes >= fromLikes && recipe.likes <= toLikes
        );
        setTempRecipes(filteredRecipes);
        return filteredRecipes;
    };

    const filter = () => {
        let filterRecipes = tempRecipes;

        if (currentIngredients.length) {
            filterRecipes = filterIngredients(filterRecipes);
        }

        if (currentTags.length) {
            filterRecipes = filterTags(filterRecipes);
        }

        if (fromDate && toDate) {
            filterRecipes = filterDate(filterRecipes);
        }

        if (fromLikes && toLikes) {
            filterRecipes = filterLikes(filterRecipes);
        }

        callback(filterRecipes);
    };

    const resetFilters = () => {
        setCurrentIngredients([]);
        setCurrentTags([]);
        setSelectedSortingOption("");
        setToDate(0);
        setFromDate(0);
        setToLikes(0);
        setFromLikes(0);
        console.log(recipes);
        setTempRecipes(recipes);
        callback(recipes);
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
                    <i className="bi bi-funnel me-2"></i>
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
                                            <i className="bi bi-caret-up-fill ms-2"></i>
                                        ) : (
                                            <i className="bi bi-caret-down-fill ms-2"></i>
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
                    <div className="row">
                        <div className="col-6">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={resetFilters}
                            >
                                Reset settings
                            </button>
                        </div>
                        <div className="col-6">
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleSavingFilters}
                            >
                                Save current settings
                            </button>
                        </div>
                    </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
};
