import React from "react";
import { MAX_TOPIC_LENGTH } from "../constants/appConstants";

const TopicForm = ({ text, disabled, buttonText, onChange, onSubmit }) => {
  const submitDisabled =
    disabled || text.length === 0 || text.length > MAX_TOPIC_LENGTH;
  return (
    <form onSubmit={onSubmit}>
      <textarea
        className="form-control"
        placeholder="Type your topic here..."
        value={text}
        onChange={onChange}
        disabled={disabled}
      />
      <span
        className={text.length > MAX_TOPIC_LENGTH ? "error" : ""}
      >{`${text.length}/${MAX_TOPIC_LENGTH}`}</span>
      <button
        type="submit"
        className="btn btn-primary pull-right submit-button"
        disabled={submitDisabled}
      >
        {buttonText}
      </button>
    </form>
  );
};

export default TopicForm;
