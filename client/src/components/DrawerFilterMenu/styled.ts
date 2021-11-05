import styled from 'styled-components';

export const FilterLayout = styled.div`
    width: 350px;
`;

export const FilterLayoutHeader = styled.div`
    width: 99%;
    margin: 0 auto;
    border-bottom: 1px solid black;
    position: relative;
`;
export const HeaderTitle = styled.div`
    font-size: 30px;
    margin: 30px 0 30px 20px;
`;
export const CloseButton = styled.div`
    position: absolute;
    top: 0px;
    right: 10px;
    & :hover {
        opacity: 0.8;
    }
`;
