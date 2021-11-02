import { FC } from 'react';
import { IListColumns } from '@interfaces/types';
import { IArrButton } from '../List';
import { Button, ButtonBlock, ListElementContainer } from './styled';

interface IProps {
    listColumns: IListColumns[];
    //cant be fixed because type IUser not accepted by function onclickFunc
    user: any;
    arrButton?: IArrButton[];
}

export const ListElement: FC<IProps> = ({ listColumns, user, arrButton }) => {
    return (
        <ListElementContainer>
            {listColumns?.map(({ name }) => (
                <div key={name}>{user[name]}</div>
            ))}
            <ButtonBlock>
                {arrButton?.map(({ item, onClickFunc }) => (
                    <Button onClick={onClickFunc(user)}>{item}</Button>
                ))}
            </ButtonBlock>
        </ListElementContainer>
    );
};
