import { FC, useEffect } from 'react';
import {  Form } from 'react-final-form';
import { History } from 'history';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';

import { Buttons } from '@components/Button/Button';

import { createModuleAction, editModuleAction } from '@redux/actions/modules';
import { errorAction } from '@redux/actions/error';
import { errorMessageSelector } from '@redux/selectors/error';
import { editableDataSelector } from '@redux/selectors/modules';
import { ICreateModulePayload } from '@redux/types/modules';

import { ModuleFormFields } from '@utils/constants/ModulesFormFields';
import { useAppSelector } from '@utils/hooks/useAppSelector';

import { ErrorMessage, FieldCustom } from '@modules/Auth/styled';
import { ButtonContainer, FormContainer } from './styled';
import { createModuleValidate } from '@utils/validators/Modules/CreateModule';

export const CreateModule: FC = () => {
const dispatch = useDispatch();
const historyPage: History = useHistory();
const editData = useAppSelector(editableDataSelector);
const errorMessage = useAppSelector(errorMessageSelector);
const { t } = useTranslation();

const onSubmit = (value: ICreateModulePayload) => {
    if (editData?.moduleID) {
        dispatch(editModuleAction({ 
             name: value.name,
             categories: value.categories,
             moduleID: editData.moduleID,
             history: historyPage
        }));
    } else {
        dispatch(createModuleAction({ 
            name: value.name,
            history: historyPage,
            categories: value.categories
        }));
    }
};

    useEffect(() => {
    if (!editData){
        historyPage.push('/modules');
    }
        dispatch(errorAction());
    }, [editData]);

    return (
        <Form
            initialValues={editData && editData}
            validate={createModuleValidate}
            onSubmit={onSubmit}
            render={({ handleSubmit }) => (
                <FormContainer>
                    <form onSubmit={handleSubmit}>
                        <ErrorMessage>{errorMessage && t(errorMessage)}</ErrorMessage>
                                {ModuleFormFields.map((fields, index)=>( 
                                 <FieldCustom key={index} {...fields}/>
                                ))}                       
                            <ButtonContainer>

                                 <Buttons type='submit' title={t('Apply')} style= 'pinkButton'/>
                                 <Buttons 
                                 type='button'
                                 title={t('Cancel')}
                                 style={'greyButton'}
                                 onClickFunction={() => history.back()} 
                                 />

                            </ButtonContainer>
                    </form>
                </FormContainer>
            )}
        />
    );
};
