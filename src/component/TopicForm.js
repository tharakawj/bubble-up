import React from "react";

const TopicForm = ({ text, disabled, buttonText, onChange, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <textarea value={text} onChange={onChange} disabled={disabled} />
    <button type="submit" disabled={disabled}>
      {buttonText}
    </button>
  </form>
);

export default TopicForm;
