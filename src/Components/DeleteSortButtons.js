import React from "react";
import { useTranslation } from "react-i18next";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { purple } from "@mui/material/colors";
import { red } from "@mui/material/colors";

const ColorButton = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  width: 200,
  marginTop: 20,
  "&:hover": {
    backgroundColor: purple[700],
  },
}));

const ColorButtonDelete = styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(red[500]),
  backgroundColor: red[500],
  width: 200,
  marginTop: 20,
  marginBottom: 20,
  "&:hover": {
    backgroundColor: red[700],
  },
}));

const DeleteSortButtons = (props) => {
  const { t } = useTranslation();
  const { TodosCopy, sortList, DeleteAllItems } = props;
  return (
    <div>
      {TodosCopy.length > 0 ? (
        <div>
          <ColorButton variant="contained" onClick={sortList}>
            {t("sort-list-btn")}
          </ColorButton>
        </div>
      ) : null}

      {TodosCopy.length > 0 ? (
        <div>
          <ColorButtonDelete variant="contained" onClick={DeleteAllItems}>
            {t("Delete-All-Items-btn")}
          </ColorButtonDelete>
        </div>
      ) : null}
    </div>
  );
};

export default DeleteSortButtons;
