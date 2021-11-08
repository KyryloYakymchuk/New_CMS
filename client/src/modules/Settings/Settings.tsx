import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import i18n from '@utils/helpers/i18n';

import { Select, SelectContainer } from './styled/styled';
import { langItem } from '@utils/constants/Languages/langItem';

export const Settings: FC = () => {
    const { t } = useTranslation();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        i18n.changeLanguage(e.target.value);
    };

    return (
        <SelectContainer>
            <label>{t('Language')}-</label>
            <Select value={localStorage.getItem('i18nextLng')!} onChange={handleChange}>
                {langItem.map(({ item }, index) => (
                    <option value={item}>
                        {item} key={index}
                    </option>
                ))}
            </Select>
        </SelectContainer>
    );
};
