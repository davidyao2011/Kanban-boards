import React, { useState, useEffect } from "React";
import socketIO from "socket.io-client";
import { useParams } from "react-router-dom";

const socket = socketIO.connect("http://localhost:4000");

const Comments = () => {
  const [comment, setComment] = useState("");

  const addComment = (e) => {
    e.preventDefault();
    console.log({
      comment,
      userId: localStorage.getItem("userId"),
    });
    setComment("");
  };

  return (
    <div className="comments__container">
      <form className="comment__form" onSubmit={addComment}>
        <label htmlFor="comment">Add a comment</label>
        <textarea
          placeholder="Add your comment..."
          value={comment}
          id="comment"
          onChange={(e) => setComment(e.target.value)}
          rows={5}
          name="comment"
          required
        ></textarea>
        <button className="commentBtn">Add Comment</button>
      </form>

      <div className="comments_section">
        <h2>Existing Comments</h2>
        <div></div>
      </div>
    </div>
  );
};

export default Comments;
