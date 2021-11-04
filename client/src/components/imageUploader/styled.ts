import styled from 'styled-components';

export const UploaderBlock = styled.div`
    margin-left: 10px;
    width: 150px;
    position: relative;
`;
export const StyledLabel = styled.label``;
export const ImgBlock = styled.div`
    height: 152px;
    width: 152px;
    & img {
        border-radius: 4px;
        height: 152px;
        width: 152px;
        object-fit: cover;
    }
`;
export const CloseButton = styled.div`
    position: absolute;
    top: -3px;
    right: -29px;
    color: black;
    cursor: pointer;
    & :hover {
        opacity: 0.7;
    }
`;
export const StyledInput = styled.input`
    width: 150px;
    height: 150px;
    opacity: 0;
    top: 0;
    left: 0;
    position: absolute;
    cursor: pointer;
`;
export const ErrorBlock = styled.div`
    font-weight: 400;
    font-size: 0.75rem;
    color: red;
`;
export const LayoutImg = styled.div`
    height: 150px;
    width: 150px;
    border-radius: 4px;
    border: 1px solid gray;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
