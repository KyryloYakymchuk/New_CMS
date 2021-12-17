import { FC } from 'react';
import { Comments, CommentsTitle, TicketContentBlock, TicketInfo } from './styled';
import { ISetTicketsPayload } from '@redux/types/tickets';
import { Loader } from '@components/Loader/Loader';
import { tickeInfoLine } from '@utils/constants/Tickets/TicketInfoField';
import { TicketInfoElement } from './TicketInfoElement';
import { TicketComments } from './TicketComments';
import { CommentForm } from '@components/Forms/TicketsForm/CommentForm';
import { ICommentsForm } from '@interfaces/types';
import { useDispatch } from 'react-redux';
import { addNewComment } from '@redux/actions/tickets';

interface IProps {
    currentTicket: ISetTicketsPayload;
    isCommentFormVisible: boolean;
    setIsCommentFormVisible: (value: boolean) => void;
}

export const TicketContent: FC<IProps> = ({
    currentTicket,
    isCommentFormVisible,
    setIsCommentFormVisible
}) => {
    const dispatch = useDispatch();
    const onSubmit = (value: ICommentsForm) => {
        const reqObj = {
            ...value,
            destination: currentTicket.email,
            ticketID: currentTicket.ticketID
        };
        setIsCommentFormVisible(false);
        dispatch(addNewComment(reqObj));
    };
    return (
        <TicketContentBlock>
            <TicketInfo>
                {tickeInfoLine.map(({ value, label }) => (
                    <TicketInfoElement
                        label={label}
                        value={currentTicket?.[value as keyof typeof currentTicket]}
                    />
                ))}
            </TicketInfo>
            <Comments>
                {currentTicket?.comments?.length ? (
                    <CommentsTitle>Answer history</CommentsTitle>
                ) : null}
                {currentTicket?.comments?.map(({ text, subject }) => (
                    <TicketComments subject={subject} text={text} />
                )) || <Loader />}
            </Comments>
            {isCommentFormVisible ? (
                <CommentForm
                    onSubmit={onSubmit}
                    setIsCommentFormVisible={setIsCommentFormVisible}
                />
            ) : null}
        </TicketContentBlock>
    );
};
