import React, { useState, useEffect } from "react";
import { deleteComment } from "../../services/user-services/commentsService";

export const CommentSection = ({ comments, setReloadComments }) => {
    const [currentUsername, setCurrentUsername] = useState("");

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user) {
            setCurrentUsername(user.username);
        }
    }, []);

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

    return (
        <div className="container allComments">
            {comments.map((comment) => {
                let userImage = comment.image;
                let username = comment.username;
                let letDelete = username === currentUsername;
                let message = comment.message;
                let date = new Date(comment.date).toLocaleDateString("en-gb", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                });
                let id = comment.id;
                return (
                    <div key={id} className="container comment my-5">
                        <div className="image">
                            <a href={"/profile/" + username}>
                                <img
                                    id="recipeUserPicture"
                                    alt=""
                                    src={userImage}
                                />
                            </a>
                        </div>
                        <div className="text">
                            <div className="commentMeta">
                                <p id="name">
                                    <a
                                        id="creatorName"
                                        href={"/profile/" + username}
                                    >
                                        {username}
                                    </a>
                                </p>
                                <p id="date">{date}</p>
                            </div>

                            <div className="messageContent  text-break">
                                {message}
                            </div>
                        </div>
                        {letDelete && (
                            <div
                                className="deleteComment"
                                onClick={() => {
                                    handleDeleteClicked(id);
                                }}
                            >
                                <i className="fa fa-times"></i>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
};
