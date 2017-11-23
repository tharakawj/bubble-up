import React from "react";

const TopicForm = ({ text, disabled, buttonText, onChange, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <textarea
      className="form-control"
      placeholder="Type your topic here..."
      value={text}
      onChange={onChange}
      disabled={disabled}
    />
    <button
      type="submit"
      className="btn btn-primary pull-right submit-button"
      disabled={disabled}
    >
      {buttonText}
    </button>
  </form>
);

export default TopicForm;
