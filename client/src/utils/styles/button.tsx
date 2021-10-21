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
  pinkButton: {
    "& .css-1xkosnu-MuiButtonBase-root-MuiButton-root": {
      backgroundColor: "rgb(240, 50, 84)",
      color: "white",

      padding: "8px 15px",
      "&:hover": {
        backgroundColor: "white",
        color: "rgb(240, 50, 84)",
      },
    },
    "& .css-1qozpde-MuiButtonBase-root-MuiButton-root": {
      backgroundColor: "rgb(240, 50, 84)",
      color: "white",

      "&:hover": {
        backgroundColor: "white",
        color: "rgb(240, 50, 84)",
      },
    },
  },
  greyButton: {
    "& .css-1xkosnu-MuiButtonBase-root-MuiButton-root": {
      backgroundColor: "rgb(145, 145, 145)",
      color: "white",

      padding: "8px 15px",
      "&:hover": {
        backgroundColor: "white",
        color: "rgb(145, 145, 145)",
      },
    },
    "& .css-1qozpde-MuiButtonBase-root-MuiButton-root": {
      backgroundColor: "rgb(145, 145, 145)",
      color: "white",

      "&:hover": {
        backgroundColor: "white",
        color: "rgb(145, 145, 145)",
      },
    },
  },
  interactButton: {
    "& .MuiButton-root": {
      minWidth: "0",
    },

    "& .css-1xkosnu-MuiButtonBase-root-MuiButton-root": {
      color: "black",

      padding: "3px 3px",
      "&:hover": {
        color: "rgb(240, 50, 84)",
      },
    },

    "& .css-1qozpde-MuiButtonBase-root-MuiButton-root": {
      //backgroundColor: "rgb(240, 50, 84)",
      color: "white",

      "&:hover": {
        color: "rgb(240, 50, 84)",
      },
    },
  },
}));
