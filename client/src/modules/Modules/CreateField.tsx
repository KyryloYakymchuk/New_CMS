import { useTranslation } from 'react-i18next';
import { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';

import { editableDataSelector } from '@redux/selectors/modules';
import { errorAction } from '@redux/actions/error';
import { createFieldModuleAction } from '@redux/actions/modules';

import { initialfileds } from '@utils/constants/Modules/typeSelectData';
import { useAppSelector } from '@utils/hooks/useAppSelector';

import { Select, SelectContainer } from '@modules/Settings/styled/styled';

import { CreateFieldForm } from '@components/Forms/CreateFieldForm/CreateFieldForm';

import { ICreateFieldProps } from '@interfaces/types';


export const CreateField: FC = () => {
    const [currentField, setCurrentField] = useState<any>(); 
    const history = useHistory();
    const editData = useAppSelector(editableDataSelector);
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        initialfileds.forEach((field) => {   
        if (field.type === e.target.value){
            setCurrentField(field);
        } 
     });
    };
    const onSubmit = (value:ICreateFieldProps) => {
        const newFieldObj = {
            settings:{ ...value },
            moduleID:editData?.moduleID,
            type:currentField.fieldType,
            name:currentField.type,
            history
        };
        dispatch(createFieldModuleAction(newFieldObj));
    };
    useEffect(() => {
        if (!currentField){
            setCurrentField(initialfileds[0]);
        }
        if (!editData) {
            history.push('/modules');
        }
        dispatch(errorAction());
    }, [currentField, editData]);

    return (
        <SelectContainer>
            <label>{t('Type')}-</label>
            <Select onChange={handleChange}>
                {initialfileds.map(({ type }, index) => (
                    <option key={index} value={type}>
                        {type} 
                    </option>
                ))}
            </Select>
            <CreateFieldForm onSubmit={onSubmit} currentField={currentField}/>
        </SelectContainer>
    );
};
