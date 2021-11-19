import { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';

import { editableDataSelector, editableFieldDataSelector } from '@redux/selectors/modules';
import { errorAction } from '@redux/actions/error';
import { createFieldModuleAction, editFieldModuleAction } from '@redux/actions/modules';

import { initialfileds } from '@utils/constants/Modules/typeSelectData';
import { useAppSelector } from '@utils/hooks/useAppSelector';

import { SelectContainer } from '@modules/Settings/styled/styled';

import { CreateFieldForm } from '@components/Forms/CreateFieldForm/CreateFieldForm';

import { ICreateFieldProps, IFieldProps } from '@interfaces/types';
import { ModalConfirm } from '@components/Modal/ModalConfirmSubmit/ModalConfirm';
import { ModalButton } from '@components/Modal/ModalButton';
import { ProtectedRoutes } from '@utils/enums/RoutesPath';
import { modalMessageSelector, modalStatusSelector } from '@redux/selectors/modal';
import { setModalStatusAction } from '@redux/actions/modal';

export const CreateField: FC = () => {
    const [currentField, setCurrentField] = useState<IFieldProps>(initialfileds[0]);

    const history = useHistory();
    const message = useAppSelector(modalMessageSelector);
    const modalStatus = useAppSelector(modalStatusSelector);
    const moduleEditData = useAppSelector(editableDataSelector);
    const editedField = useAppSelector(editableFieldDataSelector);

    const dispatch = useDispatch();

    const onSubmit = (value: ICreateFieldProps) => {
        let newFieldObj: ICreateFieldProps = {
            moduleID: moduleEditData?.moduleID,
            settings: { ...value },
            type: currentField?.fieldType,
            name: currentField?.type
        };
        if (editedField?.id) {
            newFieldObj.id = editedField?.id;
            dispatch(editFieldModuleAction(newFieldObj));
        } else {
            dispatch(createFieldModuleAction(newFieldObj));
        }
    };

    const handleAccept = () => {
        dispatch(setModalStatusAction(false));
        history.push(ProtectedRoutes.MODULE_FIELDS);
    };

    useEffect(() => {
        if (!moduleEditData) {
            history.push('/modules/fields');
        } else {
            setCurrentField(
                initialfileds?.find((field) => field.type === editedField?.name) || initialfileds[0]
            );
        }
        dispatch(errorAction());
    }, [moduleEditData]);

    return (
        <SelectContainer>
            <CreateFieldForm
                editedField={editedField}
                setCurrentField={setCurrentField}
                onSubmit={onSubmit}
                currentField={currentField}
            />
            <ModalConfirm message={message} modalStatus={modalStatus} handleAccept={handleAccept}>
                <ModalButton handleAccept={handleAccept} />
            </ModalConfirm>
        </SelectContainer>
    );
};
