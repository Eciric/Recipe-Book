import React from "react";
import { Tags } from "../Tags";

export const TagsFilter = ({ tags, setTags }) => {
    const suggestions = [
        { id: "gluten", text: "gluten" },
        { id: "gluten free", text: "gluten free" },
        { id: "lactose", text: "lactose" },
        { id: "lactose free", text: "lactose free" },
        { id: "vegan", text: "vegan" },
        { id: "vegetarian", text: "vegetarian" },
        { id: "pastry", text: "pastry" },
        { id: "sweets", text: "sweets" },
    ];
    return (
        <div>
            <p className="mb-5">Adjust tags to filter by</p>
            <Tags
                tags={tags}
                setTags={setTags}
                suggestions={suggestions}
            ></Tags>
        </div>
    );
};
