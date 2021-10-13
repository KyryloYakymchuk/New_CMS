interface ValidatorProps {
  email: string;
}

interface errorsProps {
  email?: string;
}

export const ResetPasswordValidator = (values: ValidatorProps) => {
  const errors: errorsProps = {};
  // EMAIL
  (!values.email && (errors.email = "Required")) ||
    (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/g.test(
      values.email
    ) &&
      (errors.email = "Invalid email address"));

  return errors;
};
