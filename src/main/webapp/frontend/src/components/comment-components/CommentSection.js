import React from "react";
import { Comment } from "./Comment";

export const CommentSection = ({ comments, setReloadComments, userImage }) => {
    return (
        <div className="allComments">
            {comments.map((comment) => {
                return (
                    <Comment
                        key={comment.id}
                        comment={comment}
                        setReloadComments={setReloadComments}
                        userImage={userImage}
                    ></Comment>
                );
            })}
        </div>
    );
};
