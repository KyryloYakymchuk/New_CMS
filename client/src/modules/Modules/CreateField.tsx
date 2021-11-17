import { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';

import { editableDataSelector } from '@redux/selectors/modules';
import { errorAction } from '@redux/actions/error';
import { createFieldModuleAction } from '@redux/actions/modules';

import { initialfileds } from '@utils/constants/Modules/typeSelectData';
import { useAppSelector } from '@utils/hooks/useAppSelector';

import { SelectContainer } from '@modules/Settings/styled/styled';

import { CreateFieldForm } from '@components/Forms/CreateFieldForm/CreateFieldForm';

import { ICreateFieldProps } from '@interfaces/types';
import { ModalConfirm } from '@components/Modal/ModalConfirmSubmit/ModalConfirm';
import { ModalButton } from '@components/Modal/ModalButton';
import { ProtectedRoutes } from '@utils/enums/RoutesPath';
import { modalMessageSelector, modalStatusSelector } from '@redux/selectors/modal';
import { setModalStatusAction } from '@redux/actions/modal';

export const CreateField: FC = () => {
    const [currentField, setCurrentField] = useState<any>();

    const history = useHistory();
    const editData = useAppSelector(editableDataSelector);
    const message = useAppSelector(modalMessageSelector);
    const modalStatus = useAppSelector(modalStatusSelector);

    const dispatch = useDispatch();

    const onSubmit = (value: ICreateFieldProps) => {
        const newFieldObj = {
            settings: { ...value },
            moduleID: editData?.moduleID,
            type: currentField.fieldType,
            name: currentField.type
        };
        dispatch(createFieldModuleAction(newFieldObj));
    };

    const handleAccept = () => {
        dispatch(setModalStatusAction(false));
        history.push(ProtectedRoutes.MODULE_FIELDS);
    };

    useEffect(() => {
        if (!currentField) {
            setCurrentField(initialfileds[0]);
        }
        if (!editData) {
            history.push('/modules');
        }
        dispatch(errorAction());
    }, [currentField, editData]);

    return (
        <SelectContainer>
            <CreateFieldForm
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
