import { FC } from 'react';
import { Content, LineTitle, TicketInfoElementBlock } from './styled';

interface Сomments {
    text: string;
    subject: string;
}
interface IProps {
    value: string | number | boolean | Сomments[];
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
