import { FC } from 'react';
import FormField from '../../FormField/FormField';
import { FieldCustom } from '@modules/Auth/styled';
// import { Select, SelectContainer } from '@modules/Settings/styled/styled';
import { FormSelect } from '@components/FormField/FormSelect';
import { IFieldProps } from '@interfaces/types';

export const FieldSettings: FC<IFieldProps> = ({ settings }) => {
    return (
    <div>
    <h3>Settings</h3>
       {settings?.map(({ name, key, select }, index) => (
        <>
            {!select ? 
                <FieldCustom 
                 key={index}
                 label={name}
                 name={key}
                 type={'text'}
                 component={FormField}
                />
                :           
                <FieldCustom 
                 key={index}
                 name={key}
                 options={select}
                 type={'select'}
                 component={FormSelect}
                />                
            }
         </>   
       ))}
    </div>
    );
};

    