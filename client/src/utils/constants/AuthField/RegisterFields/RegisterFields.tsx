import { Button } from "@mui/material";

import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import PersonIcon from "@mui/icons-material/Person";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import AddIcon from "@mui/icons-material/Add";
import TodayIcon from "@mui/icons-material/Today";

export const RegisterFields = [
  {
    type: "text",
    name: "email",
    label: "Email",
    placeholder: "Email",
    icon: <AlternateEmailIcon fontSize="medium" />,
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
    name: "phone",
    label: "Phone Number",
    placeholder: "Phone Number",
    icon: <PhoneIphoneIcon fontSize="medium" />,
  },

  {
    type: "date",
    name: "birthday",
    label: "Birthday",
    placeholder: "Birthday",
    icon: <TodayIcon fontSize="medium" />,
  },
];

export const ButtonsData = {
  RegisterButton: (
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

  LoginButton: "Log in",
  description: "Have an account ? ",
  path: "/auth/login",
};

export const MainText = {
  title: "Create new account",
  description: "Enter with your data details to create a new account",
};
