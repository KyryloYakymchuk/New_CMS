import { FC, useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { editableDataSelector } from '@redux/selectors/modules';
import { deleteFieldModuleAction } from '@redux/actions/modules';

import { Buttons } from '@components/Button/Button';
import { ListDD } from '@components/ListDD/ListDD';
import { ModalConfirm } from '@components/Modal/ModalConfirmSubmit/ModalConfirm';
import { ModalButton } from '@components/Modal/ModalButton';

import { Icons } from '@utils/constants/icon';
import { useAppSelector } from '@utils/hooks/useAppSelector';
import { moduleFieldsListColumns } from '@utils/constants/ListsData/ListsData';
import { constantFields } from '@utils/constants/Modules/constantsFields';

import { PageHeader, UserPageContainer } from '@modules/Users/styled';

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
    const editFieldClick = (value: React.ChangeEvent<HTMLDivElement>) => () => {
        const temp: any = value;
        //!for eslint
        console.log(temp);
    };
    const deleteFieldClick = (value: React.ChangeEvent<HTMLDivElement>) => () => {
        const temp: any = value;
        setFieldId(temp.id);
        if (constantFields.includes(temp.id)) {
            setModalMessage('Sorry, but these are сonstant field');
            setModalStatus(true);
        } else {
            setModalMessage(`${t('Delete')} ${temp.title} ?`);
            setModalStatus(true);
        }
    };
    const handleAccept = () => {
        dispatch(deleteFieldModuleAction({ fieldId }));
        setModalStatus(false);
    };
    const handleClose = () => {
        setModalStatus(false);
    };

    const onDragClick = (value: React.ChangeEvent<HTMLDivElement>) => () => {
        console.log(value);
    };

    const actionsButtons = useMemo(
        () => [
            { item: <Icons.DragHandleIcon />, onClickFunc: onDragClick },
            { item: <Icons.EditIcon />, onClickFunc: editFieldClick },
            { item: <Icons.DeleteIcon />, onClickFunc: deleteFieldClick }
        ],
        []
    );

    useEffect(() => {
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
