import { FC } from 'react';
import { ListTitleContainer } from './styled';
import { IListColumns } from '@interfaces/types';
import { useTranslation } from 'react-i18next';


interface IProps {
    listColumns: IListColumns[];
}

export const ListTitle: FC<IProps> = ({ listColumns }) => {
    const { t } = useTranslation();

    return (
        <ListTitleContainer>
            {listColumns.map(({ title }) => (<div>{t(title)}</div>))}
            <div>interact</div>
        </ListTitleContainer>
    );
};


