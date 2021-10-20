import { AuthRoutes } from "@utils/enums/routes";
import { Icons } from "../MenuItem/icon";

export const LoginFields = [
  {
    type: "text",
    name: "email",
    label: "Email",
    icon: Icons.EmailIcon,
  },
  {
    type: "password",
    name: "password",
    label: "Password",
    icon: Icons.PasswordIcon,
  },
];

export const ButtonsData = {
  buttonIcon: Icons.LoginIcon,
  buttonText: "Sign In",
  linkText: "Register",
  description: "Don`t have an account ?",
  path: AuthRoutes.REGISTER,
};

export const MainText = {
  title: "Hello ! Welcome back.",
  description:
    "Log in with your data that you entered during Your registrarion",
};
