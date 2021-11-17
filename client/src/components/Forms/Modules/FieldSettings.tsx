import { FC } from 'react';
import { IFieldProps } from '@interfaces/types';
import { useTranslation } from 'react-i18next';

import { FieldCustom } from '@modules/Auth/styled';

import { FormSelect } from '@components/FormField/FormSelect';
import FormField from '@components/FormField/FormField';

export const FieldSettings: FC<IFieldProps> = ({ settings }) => {
    const { t } = useTranslation();
    return (
        <div>
            <h3>{t('Settings')}</h3>
            {settings?.map(({ name, key, select }, index) => (
                <>
                    {!select ? (
                        <FieldCustom key={index} label={name} name={key} component={FormField} />
                    ) : (
                        <FieldCustom
                            key={index}
                            name={key}
                            label={name}
                            options={select}
                            component={FormSelect}
                        />
                    )}
                </>
            ))}
        </div>
    );
};
