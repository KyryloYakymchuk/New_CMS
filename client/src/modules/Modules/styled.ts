import styled from 'styled-components';

export const ButtonContainer = styled.div`
    margin:15px 10px 0 0;
    display: flex;
    & :first-child{
        margin-right: 15px;
    }
`;

export const FormContainer = styled.div`
    width: 500px;
    h3{
        text-align: center;
        margin: 5px 0 15px 0;
    }
`;
export const Label = styled.label`
    margin-right: 15px;
    color: rgba(0, 0, 0, 0.6);
        font-family: "Roboto","Helvetica","Arial",sans-serif;
        font-weight: 400;
        font-size: 14px;
        cursor: pointer;
        user-select: none;
`;
