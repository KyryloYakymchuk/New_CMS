import { passwordCyrillicRE, passwordSpacesRE } from "../RegularExpressions";

interface ValidatorProps {
  newPassword: string;
  newPasswordConfirm: string;
}

interface errorsProps {
  newPassword?: string;
  newPasswordConfirm?: string;
}

export const ResetPasswordValidator = (values: ValidatorProps) => {
  const errors: errorsProps = {};

  // PASSWORD
  if (!values.newPassword) {
    errors.newPassword = "Required";
  } else if (passwordSpacesRE.test(values.newPassword)) {
    errors.newPassword = "Password must not contain spaces";
  } else if (values?.newPassword?.length < 8) {
    errors.newPassword = "Minimum 8 characters";
  } else if (passwordCyrillicRE.test(values.newPassword)) {
    errors.newPassword = "Password must not contain cyrillic";
  }

  // CONFIRM PASSWORD

  if (!values.newPasswordConfirm) {
    errors.newPasswordConfirm = "Required";
  } else if (values.newPassword !== values.newPasswordConfirm) {
    errors.newPasswordConfirm = "Passwords must match";
  }

  return errors;
};
