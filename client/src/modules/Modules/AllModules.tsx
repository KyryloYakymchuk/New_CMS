import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import { loaderAction } from '@redux/actions/loader';
import {
    deleteModuleAction,
    getModulesAction,
    setEditDataModuleAction
} from '@redux/actions/modules';
import { IGetModulePayload, ISetModulePayload } from '@redux/types/modules';
import { modulesListSelector } from '@redux/selectors/modules';
import { setModalMessageAction } from '@redux/actions/modal';
import { Buttons } from '@components/Button/Button';
import { List } from '@components/List/List';
import { Pagination } from '@components/Pagination/Pagination';
import { ModalConfirm } from '@components/Modal/ModalConfirmSubmit/ModalConfirm';
import { ModalButton } from '@components/Modal/ModalButton';
import {
    EventChangeType,
    ISingleFilterFormValue,
    ISortHandlerValue,
    ISortParams
} from '@interfaces/types';
import { Icons } from '@utils/constants/icon';
import { modulesListColumns } from '@utils/constants/ListsData/ListsData';
import { handleListSort } from '@utils/functions/handleListSort';
import { useAppSelector } from '@utils/hooks/useAppSelector';
import { PageHeader, UserPageContainer } from '@modules/Users/styled';
import { offsetGenerator } from '@utils/functions/offsetGenerator';
import { modalMessageSelector } from '@redux/selectors/modal';
import { DrawerFilterMenu } from '@components/DrawerFilterMenu/DrawerFilterMenu';
import { SingleFilterForm } from '@components/Forms/SingleFilterForm/SingleFilterForm';

const LIMIT = 10;
interface IClickValue extends ISetModulePayload {
    categories: boolean;
}
export const AllModules: FC = () => {
    let { search, pathname } = useLocation();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();
    const allModules = useAppSelector(modulesListSelector);
    const requestMessage = useAppSelector(modalMessageSelector);
    const query = new URLSearchParams(search);
    const currentPage = Number(query.get('page'));

    const [sortParams, setSortParams] = useState<ISortParams>({});
    const [sortingTypeIdx, setSortingTypeIdx] = useState(0);
    const [modalStatus, setModalStatus] = useState(false);
    const [moduleId, setModuleId] = useState<string>();
    const [deleteRequestStatus, setDeleteRequestStatus] = useState(false);
    const [drawerMenuOpenStatus, setDrawerMenuOpenStatus] = useState(false);
    const [filterFormValue, setFilterFormValue] = useState('');
    const [filterFormSearchStatus, setFilterFormSearchStatus] = useState(false);

    const handleSortClick = (sortField: string) => () => {
        const temp: ISortHandlerValue = handleListSort(
            sortField,
            sortingTypeIdx,
            String(sortParams.sortField)
        );
        setSortingTypeIdx(temp.currSortingTypeIdx);
        setSortParams(temp.currentSortParams);
    };
    const createModuleClick = () => {
        history.push('/module/create');
    };
    function moduleFieldClick<T extends IClickValue>(value: T) {
        return () => {
            history.push(`/module/${value.name}/fields/`);
            dispatch(
                setEditDataModuleAction({
                    name: value.name,
                    moduleID: value.moduleID,
                    fields: value.fields,
                    categories: value.categories
                })
            );
        };
    }
    function editModuleClick<T extends IClickValue>(value: T) {
        return () => {
            history.push(`/module/edit/${value.name}`);
            dispatch(
                setEditDataModuleAction({
                    name: value.name,
                    moduleID: value.moduleID,
                    fields: value.fields,
                    categories: value.categories
                })
            );
        };
    }
    function deleteModuleClick<T extends IClickValue>(value: T) {
        return () => {
            setModalStatus(true);
            setModuleId(value.moduleID);
            dispatch(setModalMessageAction(`${t('Delete')} ${value.name} ?`));
            setDeleteRequestStatus(true);
        };
    }
    const handleAccept = () => {
        const queryParams: IGetModulePayload = {
            ...sortParams,
            offset: offsetGenerator(
                currentPage,
                deleteRequestStatus,
                Number(allModules?.count),
                pathname,
                search,
                history
            ),
            limit: LIMIT
        };
        dispatch(deleteModuleAction({ moduleID: moduleId, queryParams }));
        setModalStatus(false);
    };
    const handleClose = () => {
        setModalStatus(false);
    };
    const onSubmitSingleFilterForm = (value: ISingleFilterFormValue) => {
        if (filterFormValue !== '') {
            setFilterFormSearchStatus(!filterFormSearchStatus);
        }
        setDrawerMenuOpenStatus(!drawerMenuOpenStatus);
        setFilterFormValue(value.search);
    };
    const clearSingleFilterFormValue = () => {
        if (filterFormValue !== '') {
            setFilterFormSearchStatus(!filterFormSearchStatus);
        }
        setFilterFormValue('');
        setDrawerMenuOpenStatus(!drawerMenuOpenStatus);
    };
    const onChangeFieldValue = (e: EventChangeType) => {
        setFilterFormValue(e.target.value);
    };

    const toggleDrawerMenu = () => {
        setDrawerMenuOpenStatus(!drawerMenuOpenStatus);
    };

    const actionsButtons = [
        { item: <Icons.VerticalSplitIcon />, onClickFunc: moduleFieldClick },
        { item: <Icons.EditIcon />, onClickFunc: editModuleClick },
        { item: <Icons.DeleteIcon />, onClickFunc: deleteModuleClick }
    ];

    useEffect(() => {
        dispatch(loaderAction(true));
        const queryParams: IGetModulePayload = {
            ...sortParams,
            offset: offsetGenerator(
                currentPage,
                deleteRequestStatus,
                Number(allModules?.count),
                pathname,
                search,
                history
            ),
            limit: LIMIT
        };
        if (filterFormValue) {
            queryParams.search = filterFormValue;
        }
        dispatch(setEditDataModuleAction({}));
        dispatch(getModulesAction(queryParams));
    }, [dispatch, currentPage, filterFormSearchStatus]);

    return (
        <UserPageContainer>
            <PageHeader>
                <Buttons
                    title={t('New Module')}
                    type="button"
                    style="pinkButton"
                    onClickFunction={createModuleClick}
                    icon={<Icons.AddIcon />}
                />
                <DrawerFilterMenu
                    toggleDrawerMenu={toggleDrawerMenu}
                    drawerMenuOpenStatus={drawerMenuOpenStatus}
                >
                    <SingleFilterForm
                        filterFormValue={filterFormValue}
                        onSubmitSingleFilterForm={onSubmitSingleFilterForm}
                        clearSingleFilterFormValue={clearSingleFilterFormValue}
                        onChangeFieldValue={onChangeFieldValue}
                    />
                </DrawerFilterMenu>
            </PageHeader>
            <List
                sortHandler={handleSortClick}
                listColumns={modulesListColumns}
                listData={allModules?.modules}
                arrButton={actionsButtons}
            />
            <Pagination count={Number(allModules?.count)} limit={LIMIT} />
            <ModalConfirm
                handleAccept={handleAccept}
                handleClose={handleClose}
                modalStatus={modalStatus}
                message={requestMessage}
            >
                <ModalButton handleAccept={handleAccept} handleClose={handleClose} />
            </ModalConfirm>
        </UserPageContainer>
    );
};
