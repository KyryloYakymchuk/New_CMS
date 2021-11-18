import { IListColumns } from '@interfaces/types';
import { useAppSelector } from '@utils/hooks/useAppSelector';
import { loaderStatusSelector } from '@redux/selectors/loader';
import { SkeletonLoader } from '@components/SkeletonLoader/SkeletonLoader';

import { Button, ButtonBlock, ListElementContainer } from '@components/List/ListElement/styled';
import { IArrButton } from '../ListDD';


interface IProps<T> {
    listColumns: IListColumns[];
    //cant be fixed because type Idata not accepted by function onclickFunc
    data: any;
    arrButton?: IArrButton<T>[];
}

export function ListDDElement<T>({ listColumns, data, arrButton }: IProps<T>) {
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
}
