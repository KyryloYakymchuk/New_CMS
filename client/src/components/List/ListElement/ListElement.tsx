import { FC } from 'react';
import { IListColumns } from '@interfaces/types';
import { IArrButton } from '../List';
import { Button, ButtonBlock, ListElementContainer } from './styled';
import { useAppSelector } from '@utils/hooks/useAppSelector';
import { loaderStatusSelector } from '@redux/selectors/loader';
import { SkeletonLoader } from '@components/SkeletonLoader/SkeletonLoader';

interface IProps {
    listColumns: IListColumns[];
    //cant be fixed because type IUser not accepted by function onclickFunc
    user: any;
    arrButton?: IArrButton[];
}

export const ListElement: FC<IProps> = ({ listColumns, user, arrButton }) => {
    const loaderStatus = useAppSelector(loaderStatusSelector);

    return (
        <ListElementContainer>
            {loaderStatus
                ? listColumns?.map(({ name }) => (
                      <div>
                          <SkeletonLoader key={name} width="60%" height="25px" />
                      </div>
                  ))
                : listColumns?.map(({ name }) => <div key={name}>{user[name]}</div>)}
            <ButtonBlock>
                {loaderStatus ? (
                    <SkeletonLoader width="50%" height="25px" />
                ) : (
                    arrButton?.map(({ item, onClickFunc }, index) => (
                        <Button onClick={onClickFunc(user)} key={index}>
                            {item}
                        </Button>
                    ))
                )}
            </ButtonBlock>
        </ListElementContainer>
    );
};
