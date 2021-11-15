import styled from 'styled-components';
import { Field } from 'react-final-form';

export const FormContainer = styled.div`
    width: 900px;
    text-decoration: none;
    display: flex;
    flex-wrap: wrap;
`;

export const FieldCustom = styled(Field)`
    width: 35%;
    height: 40px;
    margin: 5px 10px 40px 5px !important;

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
export const SelectFieldCustom = styled(Field)``;
export const ButtonContainer = styled.div`
    display: flex;
    & > div {
        margin-right: 40px;
        & button {
            min-width: 10px;
            font-size: 13px;
        }
    }
`;
