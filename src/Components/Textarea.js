import React from "react";

const Textarea = (props) => {
  const { TodosCopy, inputValue, textareaChange } = props;
  return (
    <>
      {TodosCopy.length > 0 ? (
        <div>
          <textarea
            className="w-50 mt-2"
            name=""
            value={inputValue}
            onChange={textareaChange}
            id=""
            cols="30"
            rows="10"
          ></textarea>
        </div>
      ) : null}
    </>
  );
};

export default Textarea;
