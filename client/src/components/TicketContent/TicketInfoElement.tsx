import { FC } from 'react';
import { Content, LineTitle, TicketInfoElementBlock } from './styled';

interface IProps {
    value: string | number | boolean | { text: string; subject: string }[];
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
