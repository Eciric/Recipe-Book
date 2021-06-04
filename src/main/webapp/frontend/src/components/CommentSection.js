import React from "react";

export const CommentSection = ({ comments }) => {
    return (
        <div className="container allComments">
            {comments.map((comment) => {
                let userImage = comment.image;
                let username = comment.username;
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
                            <img
                                id="recipeUserPicture"
                                alt=""
                                src={userImage}
                            />
                        </div>
                        <div className="text">
                            <div className="commentMeta">
                                <p id="name">{username}</p>
                                <p id="date">{date}</p>
                            </div>

                            <div className="messageContent  text-break">
                                {message}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
