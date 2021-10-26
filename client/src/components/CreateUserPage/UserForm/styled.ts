import styled from 'styled-components';
import { Field } from 'react-final-form';

export const FormContainer = styled.div`
    width: 45%;
    text-decoration: none;
    display: flex;
`;

export const FieldCustom = styled(Field)`
  width: 35%;
  height: 40px;
  margin: 16px 10px !important;

  .css-1q6at85-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused
  .MuiOutlinedInput-notchedOutline {
    border-color: rgb(122, 122, 122);
  }
  .MuiFormControl-root{
      margin: 100px !important;
  }
  .css-1kty9di-MuiFormLabel-root-MuiInputLabel-root.Mui-focused {
    color: black;
  }
`;
