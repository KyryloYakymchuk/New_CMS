import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";

import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import AddIcon from "@mui/icons-material/Add";

export const LoginFields = [
  {
    type: "text",
    name: "email",
    label: "Email",
    icon: <AlternateEmailIcon fontSize="medium" />,
  },
  {
    type: "password",
    name: "password",
    label: "Password",
    icon: <VpnKeyIcon fontSize="medium" />,
  },
];

export const LoginButtons = [
  {
    button: (
      <Button
        startIcon={<LockOpenIcon />}
        size="large"
        color="inherit"
        variant="contained"
        type="submit"
      >
        Sign In
      </Button>
    ),
  },
  {
    button: (
      <NavLink to="/auth/register">
        <Button
          startIcon={<AddIcon />}
          size="large"
          color="inherit"
          variant="outlined"
          type="button"
        >
          Sign Up
        </Button>
      </NavLink>
    ),
  },
];
