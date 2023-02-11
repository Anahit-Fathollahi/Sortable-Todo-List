import React, { useEffect, useState, useRef } from "react";
import DeleteSortButtons from "./DeleteSortButtons";
import Textarea from "./Textarea";
import { useTranslation } from "react-i18next";
import Todo from "./Todo";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import "./Layout.scss";

function Layout() {
  const { t } = useTranslation();
  const [Todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [inputValue, setinputValue] = useState("");
  const inputref = useRef(null);
  const dragItem = useRef();
  const dragOverItem = useRef();

  useEffect(() => {
    inputref.current.focus();
  }, []);

  useEffect(() => {
    const jsonText = JSON.stringify(Todos).slice(1, -1);
    setinputValue("[" + jsonText + "]");
  }, [Todos]);

  // add item to list
  const addTodo = (todo) => {
    const newTodos = [...Todos, todo];
    setTodos(newTodos);
  };

  // delete item from list and textarea
  const DeleteTodo = (id) => {
    setTodos(Todos.filter((todo) => todo.id !== id));
    const jsonText = JSON.stringify(Todos).slice(1, -1);
    setinputValue("{" + jsonText + "}");
  };

  // delete all items from list and textarea
  const DeleteAllItems = () => {
    setTodos([]);
    const jsonText = JSON.stringify(Todos).slice(1, -1);
    setinputValue("{" + jsonText + "}");
  };

  // get value from form input and set it into state
  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  // submit form and call addTodo method to give argument
  const handleSubmitForm = (event) => {
    event.preventDefault();
    addTodo({
      text: text,
      id: Math.random(),
    });
    setText("");
  };

  // method for change textarea
  const textareaChange = (event) => {
    setinputValue(event.target.value);
    const changedTodos = JSON.parse("[" + inputValue.slice(1, -1) + "]");
    const newTodos = [...changedTodos.slice(1, -1)];
    setTodos(newTodos);
  };

  //  Sort list by name of items
  const sortList = () => {
    const newTodos = [...Todos];
    const strAscending = newTodos.sort((a, b) => (a.text > b.text ? 1 : -1));
    console.log(strAscending);
    setTodos(strAscending);
  };

  // get copy of state of list
  let TodosCopy = [...Todos];

  // item that start for change location
  const dragStart = (e, position) => {
    dragItem.current = position;
    console.log(e.target.innerHTML);
  };

  // items we pass over when dragging
  const dragEnter = (e, position) => {
    dragOverItem.current = position;
    console.log(e.target.innerHTML);
  };

  // method for drop item
  const drop = (e) => {
    const copyListItems = [...TodosCopy];
    const dragItemContent = copyListItems[dragItem.current];
    copyListItems.splice(dragItem.current, 1);
    copyListItems.splice(dragOverItem.current, 0, dragItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setTodos(copyListItems);
  };

  return (
    <>
      <form onSubmit={handleSubmitForm} className="todoForm">
        <TextField
          fullWidth
          label={t("Todo-placeholder-input")}
          id="fullWidth"
          variant="outlined"
          value={text}
          inputRef={inputref}
          onChange={handleInputChange}
          focused
        />

        <Button
          onSubmit={handleSubmitForm}
          variant="contained"
          disabled={!text}
          className="submit-btn"
          onClick={handleSubmitForm}
        >
          {t("submit-btn")}
        </Button>
      </form>

      <DeleteSortButtons
        TodosCopy={TodosCopy}
        sortList={sortList}
        DeleteAllItems={DeleteAllItems}
      />

      {TodosCopy.map((todo, index) => {
        return (
          <div
            onDragStart={(e) => dragStart(e, index)}
            onDragEnter={(e) => dragEnter(e, index)}
            onDragEnd={drop}
            key={index}
            draggable
          >
            <Todo
              key={Math.random()}
              id={todo.id}
              DeleteTodo={() => DeleteTodo(todo.id)}
              text={todo.text}
            />
          </div>
        );
      })}

      <Textarea
        TodosCopy={TodosCopy}
        inputValue={inputValue}
        textareaChange={textareaChange}
      />
    </>
  );
}

export default Layout;
