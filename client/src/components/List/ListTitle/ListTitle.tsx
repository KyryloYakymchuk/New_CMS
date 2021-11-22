import { FC, MouseEventHandler } from 'react';
import { IListColumns } from '@interfaces/types';
import { ListTitleContainer, SvgButton } from './styled';
import { Icons } from '@utils/constants/icon';
import { useTranslation } from 'react-i18next';

interface IProps {
    sortType?: string;
    sortHandler?: (sortField: string) => MouseEventHandler<HTMLDivElement>;
    listColumns: IListColumns[];
    sortColumn?: string;
}
export const ListTitle: FC<IProps> = ({ listColumns, sortType, sortColumn, sortHandler }) => {
    const { t } = useTranslation();

    return (
        <ListTitleContainer>
            {listColumns.map(({ title, name }) => (
                 <div onClick={sortHandler ? sortHandler(name) : undefined}>
                    {title}
                    {sortColumn === name && (
                        <SvgButton sortType={sortType}>{<Icons.ExpandMoreIcon />}</SvgButton>
                    )}
                </div>
            ))}
            <div>{t('interact')}</div>
        </ListTitleContainer>
    );
};
