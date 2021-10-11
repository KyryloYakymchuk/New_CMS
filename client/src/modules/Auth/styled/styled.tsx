import { Field, Form } from "react-final-form";
import styled from "styled-components";

export const FormContainer = styled.div`
  form {
    width: 80%;
    margin: auto;
    margin-top: 5%;
  }
`;
export const FieldCustom = styled(Field)`
  width: 100%;
  margin: 10px 0 !important;

  .css-1q6at85-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused
    .MuiOutlinedInput-notchedOutline {
    border-color: rgb(122, 122, 122);
  }
  .css-1kty9di-MuiFormLabel-root-MuiInputLabel-root.Mui-focused {
    color: black;
  }
`;

export const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-top: 15%;
  a {
    text-decoration: none;
    color: black;
  }
`;
