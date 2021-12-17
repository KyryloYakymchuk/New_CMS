import { CreateTicketForm } from '@components/Forms/TicketsForm/CreateTicketForm';
import { createTicketAction } from '@redux/actions/tickets';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { ICreateTicketActionPayload } from '@redux/types/tickets';

export const CreateTicket: FC = () => {
    const dispatch = useDispatch();
    const onSubmit = (value: ICreateTicketActionPayload) => {
        dispatch(createTicketAction(value));
    };
    return <CreateTicketForm onSubmit={onSubmit} />;
};
