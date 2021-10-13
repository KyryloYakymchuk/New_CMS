import { FC } from "react";
import { Form } from "react-final-form";
import { useSelector } from "react-redux";

import FormField from "@components/FormField/FormField";
import { AuthButtonContainer } from "@components/Auth/AuthButtons/AuthButtonsContainer/AuthButtonsContainer";

import {
  ButtonsData,
  LoginFields,
} from "@utils/constants/AuthField/LoginFields/LoginFields";
import { LoginValidator } from "@utils/validators/Auth/LoginValidator";

import {
  ButtonContainer,
  FieldCustom,
  FormContainer,
  ForgotPassword,
  ErrorMessage,
} from "@modules/Auth/styled/styled";
import { errorMessageSelector } from "@redux/selectors/error";

interface LoginProps {
  onSubmit: any;
}

export const LoginForm: FC<LoginProps> = ({ onSubmit }) => {
  const { LoginButton, RegisterButton, description, path } = ButtonsData;

  const errorMessage = useSelector(errorMessageSelector);

  return (
    <Form
      onSubmit={onSubmit}
      validate={LoginValidator}
      render={({ handleSubmit }) => (
        <FormContainer>
          <form onSubmit={handleSubmit}>
            <ErrorMessage>{errorMessage}</ErrorMessage>

            {LoginFields.map(({ type, name, label, icon }, index) => (
              <FieldCustom
                key={index}
                type={type}
                name={name}
                label={label}
                variant="outlined"
                component={FormField}
              >
                {icon}
              </FieldCustom>
            ))}
            <ForgotPassword to="/auth/reset">Forgot Password</ForgotPassword>
            <ButtonContainer>
              <AuthButtonContainer
                description={description}
                button={LoginButton}
                secondButton={RegisterButton}
                path={path}
              />
            </ButtonContainer>
          </form>
        </FormContainer>
      )}
    />
  );
};
