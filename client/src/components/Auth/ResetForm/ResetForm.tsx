import { FC } from "react";
import { useSelector } from "react-redux";
import { Form } from "react-final-form";

import { errorMessageSelector } from "@redux/selectors/error";

import FormField from "@components/FormField/FormField";
import { AuthButtonContainer } from "@components/Auth/AuthButtons/AuthButtonsContainer/AuthButtonsContainer";

import {
  ResetPasswordFields,
  ButtonsData,
} from "@utils/constants/AuthField/ResetPasswordFields/ResetPasswordFields";

import { ResetPasswordValidator } from "@utils/validators/Auth/ResetPasswordValidator";

import {
  ButtonContainer,
  ErrorMessage,
  FieldCustom,
  FormContainer,
} from "@modules/Auth/styled/styled";

interface LoginProps {
  onSubmit: any;
}

export const ResetForm: FC<LoginProps> = ({ onSubmit }) => {
  const { LoginButton, RegisterButton, description, path } = ButtonsData;

  const errorMessage = useSelector(errorMessageSelector);
  return (
    <Form
      onSubmit={onSubmit}
      validate={ResetPasswordValidator}
      render={({ handleSubmit }) => (
        <FormContainer>
          <form onSubmit={handleSubmit}>
            <ErrorMessage>{errorMessage}</ErrorMessage>
            {ResetPasswordFields.map(({ type, name, label, icon }, index) => (
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
