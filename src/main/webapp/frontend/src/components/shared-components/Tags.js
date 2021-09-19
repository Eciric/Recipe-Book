import React from "react";
import { WithContext as ReactTags } from "react-tag-input";

const KeyCodes = { comma: 188, enter: [10, 13] };
const delimiters = [...KeyCodes.enter, KeyCodes.comma];

export const Tags = ({ tags, setTags, suggestions }) => {
    const handleDelete = (i) => {
        setTags(tags.filter((tag, index) => index !== i));
    };

    const handleAddition = (tag) => {
        setTags([...tags, tag]);
    };

    const handleDrag = (tag, currPos, newPos) => {
        const newTags = tags.slice();
        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);
        // re-render
        setTags(newTags);
    };

    const clearTags = () => {
        setTags([]);
    };

    return (
        <div className="tags-wrapper">
            <ReactTags
                tags={tags}
                handleDelete={handleDelete}
                handleAddition={handleAddition}
                handleDrag={handleDrag}
                suggestions={suggestions}
                delimiters={delimiters}
            />
            <button className="btn btn-secondary mt-3 mb-1" onClick={clearTags}>
                Clear selection
            </button>
        </div>
    );
};
