import { IlistColums } from '@interfaces/types';
import { FC } from 'react';
import { IArrButton } from '../List';
import { Button, ButtonBlock, ListElementContainer } from './styled/styled';

interface IProps {
    listColums: IlistColums[];
    user: any;
    //cant be fixed because type IUser not accepted by function onclickFunc
    arrButton?: IArrButton[];
}

export const ListElement: FC<IProps> = ({ listColums, user, arrButton }) => {
    return (
        <ListElementContainer>
            {user
                ? listColums.map(({ name }) => 
                    <div key={name}>{user[name]}</div>)
                : null}
            <ButtonBlock>
                {arrButton?.map(({ item, onclickFunc }) => (
                    <Button onClick={onclickFunc(user)}>{item}</Button>
                ))}{' '}
            </ButtonBlock>
        </ListElementContainer>
    );
};
