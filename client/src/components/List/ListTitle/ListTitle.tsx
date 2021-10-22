import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { IlistColums } from '@interfaces/types';

import { ListTitleContainer } from './styled/styled';

interface IProps {
    listColums: IlistColums[];
}
export const ListTitle: FC<IProps> = ({ listColums }) =>  {
    const { t } = useTranslation();
    return (
        <ListTitleContainer>
            {listColums.map(({ title })=>(
                <div>{t(title)}</div>
            ))}
            <div>interact</div>
        </ListTitleContainer>
    );
};


