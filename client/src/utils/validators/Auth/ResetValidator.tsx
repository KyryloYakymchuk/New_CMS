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
  if (!values.email) {
    errors.email = "Required";
  } else if (!emailRE.test(values.email)) {
    errors.email = "Invalid email address";
  }

  return errors;
};
