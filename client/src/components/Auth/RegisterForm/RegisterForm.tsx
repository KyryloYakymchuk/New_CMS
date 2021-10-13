import { FC } from "react";
import { Form } from "react-final-form";
import { useSelector } from "react-redux";

import { errorMessageSelector } from "@redux/selectors/error";

import {
  ButtonsData,
  RegisterFields,
} from "@utils/constants/AuthField/RegisterFields/RegisterFields";
import { RegisterValidator } from "@utils/validators/Auth/RegisterValidator";

import { IFormValues } from "@modules/Auth/Register";

import FormField from "@components/FormField/FormField";
import { AuthButtonContainer } from "@components/Auth/AuthButtons/AuthButtonsContainer/AuthButtonsContainer";

import {
  ButtonContainer,
  ErrorMessage,
  FieldCustom,
  FormContainer,
} from "@modules/Auth/styled/styled";

interface RegisterProps {
  onSubmit: (value: IFormValues) => void;
}

export const RegisterForm: FC<RegisterProps> = ({ onSubmit }) => {
  const { RegisterButton, LoginButton, description, path } = ButtonsData;

  const errorMessage = useSelector(errorMessageSelector);

  return (
    <Form
      onSubmit={onSubmit}
      validate={RegisterValidator}
      render={({ handleSubmit }) => (
        <FormContainer>
          <form onSubmit={handleSubmit}>
            <ErrorMessage>{errorMessage}</ErrorMessage>

            {RegisterFields.map(({ type, name, label, icon }, index) => (
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
                button={RegisterButton}
                secondButton={LoginButton}
                path={path}
              />
            </ButtonContainer>
          </form>
        </FormContainer>
      )}
    />
  );
};
