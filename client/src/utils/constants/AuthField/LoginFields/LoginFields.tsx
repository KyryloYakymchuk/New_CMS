import { Button } from "@mui/material";

import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import LockOpenIcon from "@mui/icons-material/LockOpen";

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

export const ButtonsData = {
  LoginButton: (
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

  RegisterButton: "Register",
  description: " Don`t have an account ?",
  path: "/auth/register",
};

export const MainText = {
  title: "Hello ! Welcome back.",
  description:
    "Log in with your data that you entered during Your registrarion",
};
