import { Button } from "@mui/material";

import RefreshIcon from "@mui/icons-material/Refresh";
import VpnKeyIcon from "@mui/icons-material/VpnKey";

export const ResetPasswordFields = [
  {
    type: "password",
    name: "newPassword",
    label: "Password",
    icon: <VpnKeyIcon fontSize="medium" />,
  },
  {
    type: "password",
    name: "newPasswordConfirm",
    label: "Confirm Password",
    icon: <VpnKeyIcon fontSize="medium" />,
  },
];

export const ButtonsData = {
  LoginButton: (
    <Button
      startIcon={<RefreshIcon />}
      size="large"
      color="inherit"
      variant="contained"
      type="submit"
    >
      Reset Password
    </Button>
  ),

  RegisterButton: "Log in",
  description: "Have an account ? ",
  path: "/auth/login",
};

export const MainText = {
  title: "Reset Password",
  description: "To reset your password Enter new password",
};
