import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";

import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import PersonIcon from "@mui/icons-material/Person";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import AddIcon from "@mui/icons-material/Add";

export const RegisterFields = [
  {
    type: "text",
    name: "firstname",
    label: "Firstname",
    placeholder: "Firstname",
    icon: <PersonIcon fontSize="medium" />,
  },
  {
    type: "text",
    name: "lastname",
    label: "Lastname",
    placeholder: "Lastname",
    icon: <PersonOutlineIcon fontSize="medium" />,
  },
  {
    type: "text",
    name: "email",
    label: "Email",
    placeholder: "Email",
    icon: <AlternateEmailIcon fontSize="medium" />,
  },
  {
    type: "text",
    name: "phone",
    label: "Phone Number",
    placeholder: "Phone Number",
    icon: <PhoneIphoneIcon fontSize="medium" />,
  },
  {
    type: "password",
    name: "password",
    label: "Password",
    placeholder: "Password",
    icon: <VpnKeyIcon fontSize="medium" />,
  },
  {
    type: "password",
    name: "confirmPassword",
    label: "Confirm Password",
    placeholder: "Confirm Password",
    icon: <VpnKeyIcon fontSize="medium" />,
  },
];

export const RegisterButtons = [
  {
    button: (
      <Button
        startIcon={<AddIcon />}
        size="large"
        color="inherit"
        variant="contained"
        type="submit"
      >
        Sign Up
      </Button>
    ),
  },
  {
    button: (
      <NavLink to="/auth/login">
        <Button
          startIcon={<LockOpenIcon />}
          size="large"
          color="inherit"
          variant="outlined"
          type="button"
        >
          Sign In
        </Button>
      </NavLink>
    ),
  },
];
