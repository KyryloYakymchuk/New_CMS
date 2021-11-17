import { FC } from 'react';
import FormField from '../../FormField/FormField';
import { FieldCustom } from '@modules/Auth/styled';
import { FormSelect } from '@components/FormField/FormSelect';
import { IFieldProps } from '@interfaces/types';
import { useTranslation } from 'react-i18next';

export const FieldSettings: FC<IFieldProps> = ({ settings }) => {
    const { t } = useTranslation();
    return (
        <div>
            <h3>{t('Settings')}</h3>
            {settings?.map(({ name, key, select }, index) => (
                <>
                    {!select ? (
                        <FieldCustom
                            key={index}
                            label={name}
                            name={key}
                            type={'text'}
                            component={FormField}
                        />
                    ) : (
                        <FieldCustom
                            key={index}
                            name={key}
                            label={name}
                            options={select}
                            type={'select'}
                            component={FormSelect}
                        />
                    )}
                </>
            ))}
        </div>
    );
};
