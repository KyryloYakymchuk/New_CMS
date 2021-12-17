import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { loaderAction } from '@redux/actions/loader';
import { deleteModuleItemAction, getModulesItemsAction } from '@redux/actions/modules';
import { Buttons } from '@components/Button/Button';
import { Icons } from '@utils/constants/icon';
import { useAppSelector } from '@utils/hooks/useAppSelector';
import { PageHeader, UserPageContainer } from '@modules/Users/styled';
import { modulesItemsSelector } from '@redux/selectors/modules';
import { IModuleItemData, IRequestInfo } from '@redux/types/modules';
import { List } from '@components/List/List';
import { moduleFieldsItemColumns } from '@utils/constants/ListsData/ListsData';
import { formaterModulesItemsData } from '@utils/functions/formaterModulesItems';
import { Pagination } from '@components/Pagination/Pagination';
import { offsetGenerator } from '@utils/functions/offsetGenerator';
import { ModalConfirm } from '@components/Modal/ModalConfirmSubmit/ModalConfirm';
import { ModalButton } from '@components/Modal/ModalButton';
import { LIMIT } from '@utils/constants/Limit';

interface IModuleItem extends IModuleItemData {
    name: string;
    status: string;
    publishDate: string;
}
export const AllItems: FC = () => {
    let { search, pathname } = useLocation();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();
    const allModules = useAppSelector(modulesItemsSelector);
    const query = new URLSearchParams(search);
    const currentPage = Number(query.get('page'));
    const moduleName:string = pathname.split('/')[1];
    const parsedListData = allModules && formaterModulesItemsData(allModules?.items);

    const [modalMessage, setModalMessage] = useState('');
    const [requestInfo, setRequestInfo] = useState<IRequestInfo>({});
    const [modalStatus, setModalStatus] = useState(false);
    const [deleteWatcher, setDeleteWatcher] = useState(false);
    const [deleteRequestStatus, setDeleteRequestStatus] = useState(false);

    function editModuleClick() {
        return () => {
        };
    }

    function deleteModuleClick<T extends IModuleItem>(value: T) {
        return () => {
            setModalStatus(true);
            setRequestInfo({ moduleName, itemId : value.itemData.itemID });
            setModalMessage('Are you sure you want to delete this Item?');
            setDeleteRequestStatus(true);
        };
    }

    const handleAccept = () => {
        setDeleteWatcher(!deleteWatcher);
        setModalStatus(false);
    };

    const handleClose = () => {
        setModalStatus(false);
    };

    const actionsButtons = [
        { item: <Icons.EditIcon />, onClickFunc: editModuleClick },
        { item: <Icons.DeleteIcon />, onClickFunc: deleteModuleClick }
    ];

    useEffect(() => {
        dispatch(loaderAction(true));
        const params = {
            limit: LIMIT,
            offset: offsetGenerator(
                currentPage,
                deleteRequestStatus,
                Number(allModules?.count),
                pathname,
                search,
                history
            )
        };
        if (deleteRequestStatus) {
            dispatch(deleteModuleItemAction({ params, requestInfo }));
            setDeleteRequestStatus(false);
        } else {
            dispatch(getModulesItemsAction({ params, moduleName }));
        }
    }, [dispatch, deleteWatcher, currentPage]);

    return (
        <UserPageContainer>
            <PageHeader>
                <Buttons
                    title={t('New Module')}
                    type="button"
                    style="pinkButton"
                    icon={<Icons.AddIcon />}
                />
            </PageHeader>
            <List
                listColumns={moduleFieldsItemColumns}
                listData={parsedListData}
                arrButton={actionsButtons}
            />
            <Pagination count={Number(allModules?.count)} limit={LIMIT} />
            <ModalConfirm
                handleAccept={handleAccept}
                handleClose={handleClose}
                modalStatus={modalStatus}
                message={modalMessage}
            >
                <ModalButton handleAccept={handleAccept} handleClose={handleClose} />
            </ModalConfirm>
        </UserPageContainer>
    );
};
