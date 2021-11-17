import { FC } from 'react';
import { IListColumns } from '@interfaces/types';
import { useAppSelector } from '@utils/hooks/useAppSelector';
import { loaderStatusSelector } from '@redux/selectors/loader';
import { SkeletonLoader } from '@components/SkeletonLoader/SkeletonLoader';
import { IArrButton } from '../ListDD';
import { Button, ButtonBlock, ListElementContainer } from '@components/List/ListElement/styled';

interface IProps {
    listColumns: IListColumns[];
    //cant be fixed because type Idata not accepted by function onclickFunc
    data: any;
    arrButton?: IArrButton[];
}

export const ListDDElement: FC<IProps> = ({ listColumns, data, arrButton }) => {
    const loaderStatus = useAppSelector(loaderStatusSelector);
    return (
        <ListElementContainer>
            {loaderStatus
                ? listColumns?.map(({ name }) => (
                      <div key={name}>
                          <SkeletonLoader width="60%" height="25px" />
                      </div>
                  ))
                : listColumns?.map(({ name }) => <div key={name}>{data[name]}</div>)}
            <ButtonBlock>
                {loaderStatus ? (
                    <SkeletonLoader width="50%" height="25px" />
                ) : (
                    arrButton?.map(({ item, onClickFunc }, index) => (
                        <Button onClick={onClickFunc(data)} key={index}>
                            {item}
                        </Button>
                    ))
                )}
            </ButtonBlock>
        </ListElementContainer>
    );
};
