import styled from 'styled-components';

interface IProps {
    error?: string;
    touched?: boolean;
}
export const ButtonContainer = styled.div`
    margin: 15px 10px 0 0;
    display: flex;
    & :first-child {
        margin-right: 15px;
    }
`;

export const FormContainer = styled.div`
    width: 500px;
    h3 {
        text-align: center;
        margin: 20px 0 0 0;
    }
`;
export const Label = styled.label<IProps>`
    margin-top: 10px;
    margin-left: 12px;
    display: flex;
    align-items: center;
    color: ${({ error, touched }) => (touched && error ? '#d32f2f' : 'rgba(0, 0, 0, 0.6)')};
    font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
    font-weight: 400;
    font-size: 13px;
    cursor: pointer;
    user-select: none;
    span {
        margin-left: 15px;
    }
`;
