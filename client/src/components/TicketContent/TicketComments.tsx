import { FC } from 'react';
import { CommentsSubject, CommentsText, TicketCommentsBlock } from './styled';

interface IProps {
    subject: string;
    text: string;
}

export const TicketComments: FC<IProps> = ({ subject, text }) => {
    return (
        <TicketCommentsBlock>
            <CommentsSubject>{subject}</CommentsSubject>
            <CommentsText>{text}</CommentsText>
        </TicketCommentsBlock>
    );
};
