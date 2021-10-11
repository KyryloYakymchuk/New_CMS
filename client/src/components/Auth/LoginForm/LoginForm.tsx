import { FC } from "react";
import { Form } from "react-final-form";

import FormField from "@components/FormField/FormField";
import { AuthButtonContainer } from "@components/Auth/AuthButtons/AuthButtonsContainer/AuthButtonsContainer";

import {
  LoginButtons,
  LoginFields,
} from "@utils/constants/AuthField/LoginFields/LoginFields";
import { LoginValidator } from "@utils/validators/Auth/LoginValidator";

import { ButtonContainer, FieldCustom, FormContainer } from "@modules/Auth/styled/styled";



interface LoginProps {
  onSubmit: any;
}

export const LoginForm: FC<LoginProps> = ({ onSubmit }) => {
  return (
    <Form
      onSubmit={onSubmit}
      validate={LoginValidator}
      render={({ handleSubmit }) => (
        <FormContainer>
          <form onSubmit={handleSubmit}>
            {LoginFields.map(({ type, name, label, icon }) => (
              <FieldCustom
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
              {LoginButtons.map(({ button }) => (
                <AuthButtonContainer button={button} />
              ))}
            </ButtonContainer>
          </form>
        </FormContainer>
      )}
    />
  );
};
