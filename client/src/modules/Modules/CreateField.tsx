import { useTranslation } from 'react-i18next';
import { FC, useState } from 'react';
import { Select, SelectContainer } from '@modules/Settings/styled/styled';
import { typeSelectData } from '@utils/constants/Modules/typeSelectData';
import { CreateFieldForm } from '@components/Forms/CreateFieldForm/CreateFieldForm';

export const CreateField: FC = () => {
    const [selectValue, setSelectValue] = useState('checkbox');
    const { t } = useTranslation();

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
       setSelectValue(e.target.value);
    };

    return (
        <SelectContainer>
            <label>{t('Type')}-</label>
            <Select value={selectValue} onChange={handleChange}>
                {typeSelectData.map(({ item }, index) => (
                    <option key={index} value={item}>
                        {item} 
                    </option>
                ))}
            </Select>
            <CreateFieldForm selectValue={selectValue}/>
        </SelectContainer>
    );
};
