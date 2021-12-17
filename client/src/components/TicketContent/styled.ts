import styled from 'styled-components';

export const TicketContentBlock = styled.div``;
export const TicketInfo = styled.div``;
export const Comments = styled.div``;
export const CommentsTitle = styled.div`
    font-size: 25px;
    font-weight: 500;
    margin: 20px 0;
`;

export const TicketInfoElementBlock = styled.div`
    display: flex;
    margin-bottom: 10px;
    align-items: flex-end;
`;

export const LineTitle = styled.div`
    font-size: 20px;
    padding-right: 10px;
`;
export const Content = styled.div`
    font-size: 16px;
`;

export const TicketCommentsBlock = styled.div`
    &:not(:last-child) {
        border-bottom: 1px solid black;
    }
    width: 60%;
    margin: 15px 0;
`;
export const CommentsSubject = styled.div`
    font-size: 20px;
    padding-bottom: 10px;
`;
export const CommentsText = styled.div`
    width: 100%;
`;
