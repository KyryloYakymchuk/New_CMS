import styled from 'styled-components';

export const UserPageContainer = styled.div`
    overflow-y: auto;
`;
export const PageHeader = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    & div {
        margin: 0 10px;
    }
`;
export const ListBlock = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: auto;
`;
