import { FC } from 'react';
import { Content, LineTitle, TicketInfoElementBlock } from './styled';

interface comments {
    text: string;
    subject: string;
}
interface IProps {
    value: string | number | boolean | comments[];
    label: string;
}

export const TicketInfoElement: FC<IProps> = ({ value, label }) => {
    return (
        <TicketInfoElementBlock>
            <LineTitle>{label}</LineTitle>
            <Content>{value}</Content>
        </TicketInfoElementBlock>
    );
};
