import React from "react";

export const LikesFilter = ({
    fromLikes,
    setFromLikes,
    toLikes,
    setToLikes,
}) => {
    return (
        <div className="filter__likes">
            <p className="">Adjust the amount of likes</p>
            <div className="d-flex">
                <div className="likes__from me-2">
                    <label className="my-2">From</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Minimum likes..."
                        onChange={(e) => setFromLikes(e.target.value)}
                        value={fromLikes}
                    />
                </div>
                <div className="likes__to">
                    <label className="my-2">To</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Maximum likes..."
                        onChange={(e) => setToLikes(e.target.value)}
                        value={toLikes}
                    />
                </div>
            </div>
        </div>
    );
};
