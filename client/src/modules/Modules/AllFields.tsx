import { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { editableDataSelector } from '@redux/selectors/modules';
import {
    deleteFieldModuleAction,
    editFieldOrderAction,
    setFieldDataAction
} from '@redux/actions/modules';
import { IModuleField } from '@redux/types/modules';
import { loaderAction } from '@redux/actions/loader';

import { Buttons } from '@components/Button/Button';
import { ListDD } from '@components/ListDD/ListDD';
import { ModalConfirm } from '@components/Modal/ModalConfirmSubmit/ModalConfirm';
import { ModalButton } from '@components/Modal/ModalButton';

import { Icons } from '@utils/constants/icon';
import { useAppSelector } from '@utils/hooks/useAppSelector';
import { moduleFieldsListColumns } from '@utils/constants/ListsData/ListsData';
import { constantFields } from '@utils/constants/Modules/constantsFields';
import { changeOrderList } from '@utils/functions/changeOrderList';

import { PageHeader, UserPageContainer } from '@modules/Users/styled';
import { DropResult } from 'react-beautiful-dnd';

export const AllFields: FC = () => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();
    const allFieldsModule = useAppSelector(editableDataSelector);

    const [modalStatus, setModalStatus] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [fieldId, setFieldId] = useState('');

    const createModuleClick = () => {
        history.push(`/module/${allFieldsModule?.name}/fields/create`);
    };
    function editFieldClick<T extends IModuleField>(value: T) {
        return () => {
            setFieldId(value.id);
            if (constantFields.includes(value.id)) {
                setModalMessage('Sorry, but these are сonstant field');
                setModalStatus(true);
            } else {
                history.push(`/module/${allFieldsModule?.name}/fields/${value.title}/edit/`);
                dispatch(setFieldDataAction(value));
            }
        };
    }
    function deleteFieldClick<T extends IModuleField>(value: T) {
        return () => {
            setFieldId(value.id);
            const message = constantFields.includes(value.id)
                ? 'Sorry, but these are сonstant field'
                : `${t('Delete')} ${value.title}`;
            setModalMessage(message);
            setModalStatus(true);
        };
    }
    const handleAccept = () => {
        dispatch(deleteFieldModuleAction({ fieldId }));
        setModalStatus(false);
    };
    const handleClose = () => {
        setModalStatus(false);
    };

    const onDragEnd = (result: DropResult) => {
        const { source, destination } = result;

        if (!destination) {
            return;
        }
        if (source.index !== destination.index) {
            if (allFieldsModule?.moduleID) {
                dispatch(
                    editFieldOrderAction({
                        moduleID: allFieldsModule.moduleID,
                        fields: changeOrderList(
                            allFieldsModule?.fields!,
                            source.index,
                            destination.index
                        )
                    })
                );
                dispatch(loaderAction(true));
            }
        }
    };

    const actionsButtons = [
        { item: <Icons.EditIcon />, onClickFunc: editFieldClick },
        { item: <Icons.DeleteIcon />, onClickFunc: deleteFieldClick }
    ];

    useEffect(() => {
        dispatch(setFieldDataAction());
        if (!allFieldsModule) {
            history.push('/modules/');
        }
    }, [allFieldsModule]);

    return (
        <UserPageContainer>
            <PageHeader>
                <Buttons
                    title={t('New Field')}
                    type="button"
                    style="pinkButton"
                    onClickFunction={createModuleClick}
                    icon={<Icons.AddIcon />}
                />
            </PageHeader>
            <ListDD
                title={t('Hold to change the order')}
                onDragEnd={onDragEnd}
                listColumns={moduleFieldsListColumns}
                listData={allFieldsModule?.fields}
                arrButton={actionsButtons}
            />
            <ModalConfirm
                handleAccept={handleAccept}
                handleClose={handleClose}
                modalStatus={modalStatus}
                message={modalMessage}
            >
                {!constantFields?.includes(fieldId) ? (
                    <ModalButton handleAccept={handleAccept} handleClose={handleClose} />
                ) : (
                    <ModalButton handleAccept={handleClose} />
                )}
            </ModalConfirm>
        </UserPageContainer>
    );
};
