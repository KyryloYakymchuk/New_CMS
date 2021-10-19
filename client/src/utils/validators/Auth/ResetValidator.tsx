import { emailRE } from "../RegularExpressions";

interface ValidatorProps {
  email: string;
}

interface errorsProps {
  email?: string;
}

export const ResetValidator = (values: ValidatorProps) => {
  const errors: errorsProps = {};
  // EMAIL
  (!values.email && (errors.email = "Required")) ||
    (!emailRE.test(values.email) && (errors.email = "Invalid email address"));

  return errors;
};
