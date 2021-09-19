import React from "react";

export const DateFilter = ({ fromDate, setFromDate, toDate, setToDate }) => {
    return (
        <div className="filter__date">
            <p className="">Adjust the date</p>
            <div className="d-flex">
                <div className="date__from me-2">
                    <label className="my-2">From</label>
                    <input
                        type="date"
                        className="form-control"
                        onChange={(e) => setFromDate(e.target.value)}
                        value={fromDate}
                    />
                </div>
                <div className="date__to">
                    <label className="my-2">To</label>
                    <input
                        type="date"
                        className="form-control"
                        onChange={(e) => setToDate(e.target.value)}
                        value={toDate}
                    />
                </div>
            </div>
        </div>
    );
};
