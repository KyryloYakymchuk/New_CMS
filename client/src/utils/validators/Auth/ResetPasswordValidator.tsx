interface ValidatorProps {
  password: string;
  confirmPassword: string;
}

interface errorsProps {
  password?: string;
  confirmPassword?: string;
}

export const ResetPasswordValidator = (values: ValidatorProps) => {
  const errors: errorsProps = {};

  const passwordRegSpaces = /(\s)/g.test(values.password);
  const passwordRegCyrillic = /[^a-zA-Z0-9]/g.test(values.password);
  
  // PASSWORD
  (!values.password && (errors.password = "Required")) ||
    (passwordRegSpaces &&
      (errors.password = "Password must not contain spaces ")) ||
    (values?.password?.length < 8 &&
      (errors.password =
        "Minimum 8 characters, at least 1 letter and 1 number")) ||
    (passwordRegCyrillic &&
      (errors.password = "Password must not contain cyrillic "));

  // CONFIRM PASSWORD
  !values.confirmPassword &&
    (errors.confirmPassword = "Required") &&
    values.password !== values.confirmPassword &&
    (errors.confirmPassword = "Passwords must match");

  return errors;
};
