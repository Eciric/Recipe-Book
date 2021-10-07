import React from "react";
import { Comment } from "./Comment";
import { deleteComment } from "../../services/user-services/commentsService";

export const CommentSection = ({ comments, setReloadComments, userImage }) => {
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
                return (
                    <Comment
                        key={comment.id}
                        comment={comment}
                        onDelete={handleDeleteClicked}
                        userImage={userImage}
                    ></Comment>
                );
            })}
        </div>
    );
};
