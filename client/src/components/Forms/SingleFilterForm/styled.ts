import styled from 'styled-components';
import { Field } from 'react-final-form';

export const FormContainer = styled.div`
    width: 99%;
    text-decoration: none;
    display: flex;
    flex-wrap: wrap;
`;

export const FieldCustom = styled(Field)`
    margin: 0 auto;
    width: 95%;
    height: 40px;
    margin: 16px 10px !important;

    .css-1q6at85-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused
        .MuiOutlinedInput-notchedOutline {
        border-color: rgb(122, 122, 122);
    }
    .MuiFormControl-root {
        margin: 100px !important;
    }
    .css-1kty9di-MuiFormLabel-root-MuiInputLabel-root.Mui-focused {
        color: gray;
    }
`;
export const ButtonBlock = styled.div`
    margin-top: 10px;
    display: flex;
    justify-content: space-evenly;
`;
