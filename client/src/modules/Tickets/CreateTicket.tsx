import { CreateTicketForm } from '@components/Forms/TicketsForm/CreateTicketForm';
import { createTicketAction } from '@redux/actions/tickets';
import { FC } from 'react';
import { useDispatch } from 'react-redux';

export const CreateTicket: FC = () => {
    const dispatch = useDispatch();
    const onSubmit = (value: any) => {
        console.log(value);
        dispatch(createTicketAction(value));
    };

    return <CreateTicketForm onSubmit={onSubmit} />;
};
