import React from "react";
import { useTranslation } from "react-i18next";
import Button from "@mui/material/Button";

function Todo(props) {
  const { t } = useTranslation();
  return (
    <div className="item-box">
      <div>{props.text}</div>
      <div>
        <Button
          variant="outlined"
          color="error"
          onClick={() => props.DeleteTodo(props.id)}
        >
          {t("delete-btn")}
        </Button>
      </div>
      <div>
        <Button variant="outlined" color="success" className="drag-btn">
          {t("sort-btn")}
        </Button>
      </div>
    </div>
  );
}

export default Todo;
