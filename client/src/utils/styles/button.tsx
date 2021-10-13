import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(() => ({
  Button: {
    "& .css-1xkosnu-MuiButtonBase-root-MuiButton-root": {
      backgroundColor: "rgb(240, 50, 84)",
      color: "white",
      width: "100%",
      padding: "13px 0",
      "&:hover": {
        backgroundColor: "white",
        color: "rgb(240, 50, 84)",
      },
    },
    "& .css-1qozpde-MuiButtonBase-root-MuiButton-root": {
      backgroundColor: "rgb(240, 50, 84)",
      color: "white",
      width: "100%",

      "&:hover": {
        backgroundColor: "white",
        color: "rgb(240, 50, 84)",
      },
    },
  },
}));
