import styled from 'styled-components';
interface IProps {
    error?: string;
    touched?: boolean;
}

export const Select = styled.select<IProps>`
    background-color: transparent;
    border: none;
    border-bottom: ${({ error, touched }) =>
        touched && error ? '1px solid red' : '1px solid black'};
    font-size: 18px;
    cursor: pointer;
    width: 500px;
    outline: none;
    padding: 5px 10px;
    margin-bottom: 15px;
    font-size: 18px;

    option {
        cursor: pointer;
        background: aliceblue;
        &:checked {
            background: lightgray;
        }
    }
`;

export const SelectContainer = styled.div``;
