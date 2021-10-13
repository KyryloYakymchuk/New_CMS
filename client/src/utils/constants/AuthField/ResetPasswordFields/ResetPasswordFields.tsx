import { Button } from "@mui/material";

import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import EmailIcon from "@mui/icons-material/Email";

export const ResetPasswordFields = [
  {
    type: "text",
    name: "email",
    label: "Email",
    icon: <AlternateEmailIcon fontSize="medium" />,
  },
];

export const ButtonsData = {
  LoginButton: (
    <Button
      startIcon={<EmailIcon />}
      size="large"
      color="inherit"
      variant="contained"
      type="submit"
    >
      Send email
    </Button>
  ),

  RegisterButton: "Log in",
  description: "Have an account ? ",
  path: "/auth/login",
};

export const MainText = {
  title: "Reset Password",
  description: "To reset your password enter your email",
};
