import { FC, MouseEventHandler } from 'react';
import { IListColumns } from '@interfaces/types';
import { ListTitleContainer, SvgButton } from './styled';
import { Icons } from '@utils/constants/icon';

interface IProps {
    sortType?: string;
    sortHandler: (sortField: string) => MouseEventHandler<HTMLDivElement>;
    listColumns: IListColumns[];
    sortColumn?: string;
}
export const ListTitle: FC<IProps> = ({ listColumns, sortHandler, sortType, sortColumn }) => {
    return (
        <ListTitleContainer>
            {listColumns.map(({ title, name }) => (
                <div onClick={sortHandler(name)}>
                    {title}
                    {sortColumn === name && (
                        <SvgButton sortType={sortType}>{<Icons.ExpandMoreIcon />}</SvgButton>
                    )}
                </div>
            ))}
            <div>interact</div>
        </ListTitleContainer>
    );
};
