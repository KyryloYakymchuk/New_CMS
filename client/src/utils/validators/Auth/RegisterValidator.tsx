interface ValidatorProps {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

interface errorsProps {
  firstname?: string;
  lastname?: string;
  email?: string;
  phone?: string;
  password?: string;
  confirmPassword?: string;
}

export const RegisterValidator = (values: ValidatorProps) => {
  const errors: errorsProps = {};

  // EMAIL
  (!values.email && (errors.email = "Required")) ||
    (!/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/g.test(
      values.email
    ) &&
      (errors.email = "Invalid email address"));
  // PASSWORD
  (!values.password && (errors.password = "Required")) ||
    (/(\s)/g.test(values.password) &&
      (errors.password = "Password must not contain spaces ")) ||
    (values?.password?.length < 8 &&
      (errors.password =
        "Minimum 8 characters, at least 1 letter and 1 number")) ||
    (/[^a-zA-Z0-9]/g.test(values.password) &&
      (errors.password = "Password must not contain cyrillic "));

  // CONFIRM PASSWORD
  (!values.confirmPassword && (errors.confirmPassword = "Required")) ||
    (values.password !== values.confirmPassword &&
      (errors.confirmPassword = "Passwords must match"));

  // first name

  if (!values.firstname) errors.firstname = "Required";
  else if (values.firstname.length > 30)
    errors.firstname = "Must have a maximum of 15 characters";
  else if (!values.firstname.match("^[a-zA-Z]+$"))
    errors.firstname = "The first name must contain only letters";
  else if (!values.firstname.match(/^[A-Z]/))
    errors.firstname = "First letter must be in upper case";

  //last name

  if (!values.lastname) errors.lastname = "Required";
  else if (values.lastname.length > 30)
    errors.lastname = "Must have a maximum of 15 characters";
  else if (!values.lastname.match("^[a-zA-Z]+$"))
    errors.lastname = "The last name must contain only letters";
  else if (!values.lastname.match(/^[A-Z]/))
    errors.lastname = "First letter must be in upper case";

  if (!values.phone) errors.phone = "Required";
  else if (values.phone.match(/[^0-9]/))
    errors.phone = "The phone number must contain only numbers";
  else if (!values.phone.match(/^\+?\d[0-9]{9,15}$/))
    errors.phone = "Invalid Phone!";

  return errors;
};
