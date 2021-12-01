import { useAppSelector } from '@utils/hooks/useAppSelector';
import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ProtectedRoutes } from '@utils/enums/RoutesPath';

import { ModalConfirm } from '@components/Modal/ModalConfirmSubmit/ModalConfirm';
import { ModalButton } from '@components/Modal/ModalButton';
import { setModalStatusAction } from '@redux/actions/modal';
import { useHistory, useLocation } from 'react-router';
import { modalMessageSelector, modalStatusSelector } from '@redux/selectors/modal';

import { getModulesFieldsAction } from '@redux/actions/modules';
import { ModuleItems } from '@components/Forms/Modules/ModuleItems';
import { currentModuleFielsSelector } from '@redux/selectors/modules';
import { IModuleFieldsPayload } from '@redux/types/modules';


export const CreateModuleItem: FC = () => {
    let {  pathname } = useLocation();
    const dispatch = useDispatch();
    const history = useHistory();
    const moduleName:string = pathname.split('/')[1];
    const isModalOpen = useAppSelector(modalStatusSelector);
    const message = useAppSelector(modalMessageSelector);
    const moduleFielsData = useAppSelector(currentModuleFielsSelector);
    
    const onSubmitForm = (value: IModuleFieldsPayload) => {
        console.log(value);
        //for eslint
    };

    const handleAcceptModal = () => {
        dispatch(setModalStatusAction(false));
        history.push(ProtectedRoutes.USERS);
    };

    useEffect(() => {
        dispatch(getModulesFieldsAction({ moduleName }));
    }, [dispatch]);

    return (
        <div>
            <ModuleItems onSubmit={onSubmitForm} moduleFielsData={moduleFielsData} />
            <ModalConfirm
                handleAccept={handleAcceptModal}
                message={message}
                modalStatus={isModalOpen}
            >
                <ModalButton handleAccept={handleAcceptModal} />
            </ModalConfirm>
        </div>
    );
};
