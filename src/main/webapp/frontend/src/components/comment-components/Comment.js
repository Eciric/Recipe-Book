import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { TextField } from "@material-ui/core";
import {
    changeCommentMessage,
    fetchReplies,
} from "../../services/user-services/commentsService";

export const Comment = ({ comment, onDelete, userImage }) => {
    const [currentUsername, setCurrentUsername] = useState("");
    const [formattedDate, setFormattedDate] = useState("");
    const [toggleEdit, setToggleEdit] = useState(false);
    const [newMessage, setNewMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const [reply, setReply] = useState("");
    const [replies, setReplies] = useState("");
    const [toggleReplies, setToggleReplies] = useState(false);
    const [toggleReply, setToggleReply] = useState(false);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            setCurrentUsername(user.username);
        }

        setFormattedDate(
            new Date(comment.date).toLocaleDateString("en-gb", {
                year: "numeric",
                month: "long",
                day: "numeric",
            })
        );
        setNewMessage(comment.message);

        fetchReplies(comment.id)
            .then((res) => res.json())
            .then((json) => console.log(json))
            .catch(() => {});
    }, [comment]);

    const handleMessageChange = (e) => {
        setNewMessage(e.target.value);
    };

    const updateCommentMessage = () => {
        setLoading(true);
        changeCommentMessage(comment.id, newMessage)
            .then((res) => res.json)
            .then(
                () => {
                    comment.message = newMessage;
                    setLoading(false);
                    setToggleEdit(false);
                },
                () => {
                    setLoading(false);
                    setToggleEdit(false);
                }
            );
    };

    const handleSubmitReply = () => {};

    return (
        <div className="comment-wrapper  my-5">
            <div key={comment.id} className="container comment">
                <div className="image">
                    <a href={"/profile/" + comment.username}>
                        <img
                            id="recipeUserPicture"
                            alt=""
                            src={comment.image}
                        />
                    </a>
                </div>
                <div className="text">
                    <div className="commentMeta">
                        <p id="name">
                            <a
                                id="creatorName"
                                href={"/profile/" + comment.username}
                            >
                                {comment.username}
                            </a>
                        </p>
                        <p id="date">{formattedDate}</p>
                    </div>
                    {toggleEdit ? (
                        <div className="edit-comment">
                            <TextField
                                id="standard-basic"
                                className="recipeComment"
                                multiline={true}
                                value={newMessage}
                                onChange={handleMessageChange}
                            />

                            <div className="comment-edit-controls">
                                <button
                                    onClick={() => {
                                        setNewMessage(comment.message);
                                        setToggleEdit(false);
                                    }}
                                    className="btn btn-text cancel-comment-edit"
                                    style={{ color: "darkred" }}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={updateCommentMessage}
                                    className="btn btn-text save-comment-edit"
                                    style={{ color: "#683ed1" }}
                                >
                                    Save
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="messageContent  text-break">
                            {comment.message}
                        </div>
                    )}
                </div>
                {currentUsername === comment.username && (
                    <Dropdown>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">
                            <i className="bi bi-three-dots-vertical"></i>
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                            <Dropdown.Item
                                onClick={() => {
                                    setToggleEdit(true);
                                }}
                            >
                                <i className="bi bi-pencil me-2"></i>
                                Edit
                            </Dropdown.Item>
                            <Dropdown.Item
                                onClick={() => {
                                    onDelete(comment.id);
                                }}
                            >
                                <i className="bi bi-trash me-2"></i>
                                Delete
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                )}
                <div className="reply">
                    <button
                        onClick={() => {
                            setToggleReply(true);
                        }}
                        className="btn btn-secondary btn-sm"
                    >
                        <i className="bi bi-reply me-2"></i>
                        Reply
                    </button>
                </div>
            </div>
            {toggleReply && (
                <div
                    className="container createComment mt-4"
                    style={{ width: "60%" }}
                >
                    <div className="image">
                        <img id="recipeUserPicture" alt="" src={userImage} />
                    </div>
                    <div className="text">
                        <TextField
                            id="standard-basic"
                            className="recipeComment"
                            multiline={true}
                            label="Add a reply..."
                            value={reply}
                            onChange={(e) => {
                                setReply(e.target.value);
                            }}
                        />
                        <button
                            className="btn btn-submit mt-3"
                            onClick={handleSubmitReply}
                        >
                            Submit
                        </button>
                    </div>
                </div>
            )}
            {toggleReplies && <div className="container replies"></div>}
        </div>
    );
};
