import styled from 'styled-components';

export const UploaderBlock = styled.div`
    margin-left: 10px;
    width: 150px;
    position: relative;
`;
export const StyledLabel = styled.label``;
export const ImgBlock = styled.div`
    width: 100px;
    display: flex;
    & > div {
        position: relative;
    }
    & img {
        border-radius: 4px;
        height: 100px;
        width: 100px;
        object-fit: cover;
        margin: 5px;
    }
`;
export const CloseButton = styled.div`
    position: absolute;
    top: 5px;
    right: 2px;
    color: black;
    cursor: pointer;
    & :hover {
        opacity: 0.7;
    }
`;
export const StyledInput = styled.input`
    width: 200px;
    height: 60px;
    opacity: 0;
`;
export const ErrorBlock = styled.div`
    font-weight: 400;
    font-size: 0.75rem;
    color: red;
`;
export const LayoutImg = styled.div`
    position: absolute;
    width: 200px;
    height: 60px;
    border-radius: 4px;
    border: 1px solid gray;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;
