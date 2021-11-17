import styled from 'styled-components';

export const Select = styled.select`
    background-color: transparent;
    border: none;
    border-bottom: 1px solid black;
    font-size: 18px;
    cursor: pointer;
    width: 500px;
    outline: none;
    padding: 5px 10px;
    margin-bottom: 15px;
    font-size: 18px;

    option {
        cursor: pointer;
        background:aliceblue;
        &:checked{
            background:lightgray;

        }
    }
`;

export const SelectContainer = styled.div`
`;
