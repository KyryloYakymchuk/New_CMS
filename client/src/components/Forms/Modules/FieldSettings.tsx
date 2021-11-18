import { FC } from 'react';
import { IFieldProps } from '@interfaces/types';
import { useTranslation } from 'react-i18next';
import { Field } from 'react-final-form';

import { modulesListSelector } from '@redux/selectors/modules';

import { FormSelect } from '@components/FormField/FormSelect';
import FormField from '@components/FormField/FormField';

import { formaterModulesList } from '@utils/functions/formaterModulesList';
import { useStyles } from '@utils/styles/field';
import { useAppSelector } from '@utils/hooks/useAppSelector';

export const FieldSettings: FC<IFieldProps> = ({ settings }) => {
    const { t } = useTranslation();
    const classes = useStyles();
    const allModules = useAppSelector(modulesListSelector);

    return (
        <div>
            <h3>{t('Settings')}</h3>
            {settings?.map(({ name, key, select }, index) => (
                <>
                    {!select ? (
                        <Field
                            className={classes.root}
                            key={index}
                            label={name}
                            name={key!}
                            component={FormField}
                        />
                    ) : (
                        <Field
                            className={classes.root}
                            key={index}
                            name={key!}
                            label={name}
                            options={
                                key === 'module'
                                    ? formaterModulesList(allModules?.modules!)
                                    : select
                            }
                            // Change to react-select(isMulti && !isMilti)
                            component={FormSelect}
                        />
                    )}
                </>
            ))}
        </div>
    );
};
