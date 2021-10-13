import { FC } from "react";
import { Form } from "react-final-form";

import FormField from "@components/FormField/FormField";
import { AuthButtonContainer } from "@components/Auth/AuthButtons/AuthButtonsContainer/AuthButtonsContainer";

import {
  ButtonsData,
  RegisterFields,
} from "@utils/constants/AuthField/RegisterFields/RegisterFields";
import { RegisterValidator } from "@utils/validators/Auth/RegisterValidator";

import {
  ButtonContainer,
  FieldCustom,
  FormContainer,
} from "@modules/Auth/styled/styled";
import { errorMessageSelector } from "@redux/selectors/error";
import { useSelector } from "react-redux";

interface RegisterProps {
  onSubmit: any;
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
