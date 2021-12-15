import { FC } from 'react';
import { Comments, CommentsTitle, TicketContentBlock, TicketInfo } from './styled';
import { ISetTicketsPayload } from '@redux/types/tickets';
import { tickeInfoLine } from '@utils/constants/Tickets/TicketInfoField';
import { TicketInfoElement } from './TicketInfoElement';
import { TicketComments } from './TicketComments';
import { CommentForm } from '@components/Forms/TicketsForm/CommentForm';
import { ICommentsForm } from '@interfaces/types';
import { useDispatch } from 'react-redux';
import { addNewComment } from '@redux/actions/tickets';

interface IProps {
    currentTicket: ISetTicketsPayload;
    answerFormStatus: boolean;
    setAnswerFormStatus: (value: boolean) => void;
}

export const TicketContent: FC<IProps> = ({
    currentTicket,
    answerFormStatus,
    setAnswerFormStatus
}) => {
    const dispatch = useDispatch();
    const onSubmit = (value: ICommentsForm) => {
        value.destination = currentTicket.email;
        value.ticketID = currentTicket.ticketID;
        console.log(value);
        setAnswerFormStatus(false);
        dispatch(addNewComment(value));
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
                {currentTicket?.comments?.[0] ? (
                    <CommentsTitle>Answer history</CommentsTitle>
                ) : null}
                {currentTicket?.comments?.map(({ text, subject }) => (
                    <TicketComments subject={subject} text={text} />
                ))}
            </Comments>
            {answerFormStatus ? (
                <CommentForm onSubmit={onSubmit} setAnswerFormStatus={setAnswerFormStatus} />
            ) : null}
        </TicketContentBlock>
    );
};
