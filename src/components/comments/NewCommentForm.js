import { useEffect, useRef, useState } from "react";
import useHttp from "../../hooks/use-http";
import { addComment } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./NewCommentForm.module.css";

const NewCommentForm = (props) => {
  const commentTextRef = useRef();
  const { sendRequest, status, error } = useHttp(addComment);
  const { onAddComment, quoteId } = props;
  const [theComment, setTheComment] = useState();
  useEffect(() => {
    if (status === "completed" && !error) {
      onAddComment();
    }
  }, [onAddComment, status, error]);

  const submitFormHandler = (event) => {
    event.preventDefault();
    const comment = commentTextRef.current.value;
    setTheComment(commentTextRef.current.value);
    // optional: Could validate here
    if (comment === "") {
      return;
    }

    // send comment to server
    sendRequest({ commentData: { text: comment }, quoteId });
    setTheComment("");
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status === "pending" && <LoadingSpinner />}
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor="comment">Your Comment</label>
        <textarea
          id="comment"
          value={theComment}
          rows="5"
          ref={commentTextRef}
        ></textarea>
      </div>
      <div className={classes.actions}>
        <button className="btn">Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
