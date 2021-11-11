import { Field } from 'react-final-form';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const FormContainer = styled.div`
  form {
    width: 80%;
    margin: auto;
  }
`;
export const ErrorMessage = styled.div`
  color: #d32f2f;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 400;
  font-size: 0.75rem;
  line-height: 1.66;
  letter-spacing: 0.03333em;
  text-align: left;
  margin-top: 3px;
  margin-right: 14px;
  margin-bottom: 0;
  margin-left: 14px;
`;

export const FieldCustom = styled(Field)`
${({ type }) => type !== 'checkbox' && `width: 100%; 
  height: 65px;
  margin: 10px 0 !important;

  .css-1q6at85-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused
  .MuiOutlinedInput-notchedOutline {
    border-color: rgb(122, 122, 122);
  };
  .css-1kty9di-MuiFormLabel-root-MuiInputLabel-root.Mui-focused {
    color: black;
  };`
}
`;

export const ButtonContainer = styled.div`
  width: 100%;
  margin-top: 15px;
`;

export const ForgotPassword = styled(Link)`
  display: flex;
  justify-content: end;
  text-decoration: none;
  color: #b1b1b1;
  font-weight: 400;
  margin-top: 5px;
`;
