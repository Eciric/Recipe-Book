import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { TextField } from "@material-ui/core";
import {
    addComment,
    changeCommentMessage,
    deleteComment,
    fetchReplies,
} from "../../services/user-services/commentsService";
import { useParams } from "react-router";
import { CommentSection } from "./CommentSection";
import { base64toBlob } from "../../services/file-services/base64ToBlob";
import { getUserData } from "../../services/user-services/userService";
import { Link } from "react-router-dom";

export const Comment = ({ comment, setReloadComments, userImage }) => {
    const { id } = useParams();
    const [currentUser, setCurrentUser] = useState({});
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
            setCurrentUser(user);
        }

        setFormattedDate(
            new Date(comment.date).toLocaleDateString("en-gb", {
                year: "numeric",
                month: "long",
                day: "numeric",
            })
        );
        setNewMessage(comment.message);
    }, [comment]);

    const getParsedComments = async (json) => {
        let newComments = [];
        for (let i = 0; i < json.length; i++) {
            const user = await getUserData(null, json[i].user_id);
            let image = base64toBlob(user.profile_picture, "image/png");
            const objectURL = URL.createObjectURL(image);
            newComments.push({
                id: json[i].comment_id,
                username: user.username,
                message: json[i].message,
                date: json[i].date_created,
                image: objectURL,
                reply_comment_id: json[i].reply_comment_id,
            });
        }
        return newComments;
    };

    // Fetches recipe comments
    useEffect(() => {
        fetchReplies(comment.id)
            .then(async (json) => {
                let parsedComments = await getParsedComments(json);
                setReplies(parsedComments);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [comment.id]);

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

    const handleDeleteClicked = (id) => {
        deleteComment(id)
            .then((res) => {
                if (res.ok) {
                    setReloadComments(true);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleSubmitReply = () => {
        addComment(id, currentUser.id, reply, comment.id)
            .then((res) => {
                if (res.ok) {
                    setReloadComments(true);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div className="comment-wrapper  my-5">
            <div key={comment.id} className="comment">
                <div className="image">
                    <Link to={"/profile/" + comment.username}>
                        <img
                            id="recipeUserPicture"
                            alt=""
                            src={comment.image}
                        />
                    </Link>
                </div>
                <div className="text">
                    <div className="commentMeta">
                        <p id="name">
                            <Link
                                id="creatorName"
                                to={"/profile/" + comment.username}
                            >
                                {comment.username}
                            </Link>
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
                {currentUser.username === comment.username && (
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
                                    handleDeleteClicked(comment.id);
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
                            toggleReply
                                ? setToggleReply(false)
                                : setToggleReply(true);
                        }}
                        className="btn btn-secondary btn-sm"
                    >
                        <i className="bi bi-reply me-2"></i>
                        Reply
                    </button>
                </div>
                {replies.length > 0 && (
                    <div className="toggle-replies">
                        {!toggleReplies ? (
                            <button
                                className="btn btn-text"
                                onClick={() => {
                                    setToggleReplies(true);
                                }}
                            >
                                <i className="bi bi-arrow-90deg-down me-2"></i>
                                Toggle Replies {`(${replies.length})`}
                            </button>
                        ) : (
                            <button
                                className="btn btn-text"
                                onClick={() => {
                                    setToggleReplies(false);
                                }}
                            >
                                <i className="bi bi-arrow-90deg-up me-2"></i>
                                Collapse replies {`(${replies.length})`}
                            </button>
                        )}
                    </div>
                )}
            </div>
            {toggleReply && (
                <div className="createComment mt-4">
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

            {toggleReplies && (
                <div className="replies">
                    <CommentSection
                        comments={replies}
                        userImage={userImage}
                        setReloadComments={setReloadComments}
                    />
                </div>
            )}
        </div>
    );
};
