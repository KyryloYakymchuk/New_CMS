import { FC } from 'react';
import { IListColumns } from '@interfaces/types';
import { ListTitleContainer } from './styled';

interface IProps {
    listColumns: IListColumns[];
}

export const ListTitle: FC<IProps> = ({ listColumns }) => {

    return (
        <ListTitleContainer>
            {listColumns.map(({ title }) => (<div>{title}</div>))}
            <div>interact</div>
        </ListTitleContainer>
    );
};


