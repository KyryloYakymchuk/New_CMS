import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router';

import { loaderAction } from '@redux/actions/loader';
import { deleteModuleAction,
         getModulesAction,
         setEditDataModuleAction
        } from '@redux/actions/modules';
import { IGetModulePayload } from '@redux/types/modules';
import { modulesListSelector } from '@redux/selectors/modules';
import { setModalMessageAction } from '@redux/actions/modal';

import { Buttons } from '@components/Button/Button';
import { List } from '@components/List/List';
import { Pagination } from '@components/Pagination/Pagination';
import { ModalConfirm } from '@components/Modal/ModalConfirmSubmit/ModalConfirm';
import { ModalButton } from '@components/Modal/ModalButton';
//!For future filter
// import { DrawerFilterMenu } from '@components/DrawerFilterMenu/DrawerFilterMenu';
// import { SingleFilterForm } from '@components/Forms/SingleFilterForm/SingleFilterForm';

import { ISortHandlerValue, ISortParams } from '@interfaces/types';

import { Icons } from '@utils/constants/icon';
import { modulesListColumns } from '@utils/constants/ListsData/ListsData';
import { handleListSort } from '@utils/functions/handleListSort';
import { useAppSelector } from '@utils/hooks/useAppSelector';

import { PageHeader, UserPageContainer } from '@modules/Users/styled';


const LIMIT = 10;

export const AllModules: FC = () => {
let { search } = useLocation();
const { t } = useTranslation();
const dispatch = useDispatch();
const history = useHistory();
const allModules = useAppSelector(modulesListSelector);

const query = new URLSearchParams(search);
const currentPage = Number(query.get('page'));


const [sortParams, setSortParams] = useState<ISortParams>({});
const [sortingTypeIdx, setSortingTypeIdx] = useState(0);
const [modalStatus, setModalStatus] = useState<boolean>();
const [moduleId, setModuleId] = useState<string>();


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
const moduleFieldClick = (value: React.ChangeEvent<HTMLDivElement>) => () => {
    const temp: any = value;
    dispatch(setEditDataModuleAction({
        name: temp.name,
        moduleID: temp.moduleID,
        fields: temp.fields,
        categories: temp.categories
     }));
};
const editModuleClick = (value: React.ChangeEvent<HTMLDivElement>)  => () => {
    const temp: any = value;
    history.push(`/module/fields/${temp.name}`);


    history.push(`/module/edit/${temp.name}`);
    dispatch(setEditDataModuleAction({
        name: temp.name,
        moduleID: temp.moduleID,
        fields: temp.fields,
        categories: temp.categories
     }));

};
const deleteModuleClick = (value: React.ChangeEvent<HTMLDivElement>)=> () => {
    const temp: any = value;
    setModalStatus(true);
    setModuleId(temp.moduleID);
    dispatch(setModalMessageAction(`${t('Delete module')} ${temp.name} ?`));
};
const handleAccept = () => {
    const offset = query ? currentPage * 10 : 0;
    const queryParams: IGetModulePayload = {
        offset: offset,
        limit: LIMIT
    };
    dispatch(deleteModuleAction({ moduleID: moduleId, queryParams }));
    setModalStatus(false);
};
const handleClose = () => {
    setModalStatus(false);
};


const actionsButtons = [
    { item: <Icons.VerticalSplitIcon />, onClickFunc: moduleFieldClick },
    { item: <Icons.EditIcon />, onClickFunc: editModuleClick },
    { item: <Icons.DeleteIcon />, onClickFunc: deleteModuleClick }
];


useEffect(() => {
    dispatch(loaderAction(true));

    const offset = query ? currentPage * 10 : 0;

    const queryParams: IGetModulePayload = {
        offset: offset,
        limit: LIMIT
    };
    dispatch(setEditDataModuleAction({}));
    dispatch(getModulesAction(queryParams));
}, [dispatch, currentPage]);

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
            //!For future filter
            {/* <DrawerFilterMenu
                toggleDrawerMenu={toggleDrawerMenu}
                drawerMenuOpenStatus={drawerMenuOpenStatus}
            >
                <SingleFilterForm
                    filterFormValue={filterFormValue}
                    onSubmitSingleFilterForm={onSubmitSingleFilterForm}
                    clearSingleFilterFormValue={clearSingleFilterFormValue}
                    onChangeFieldValue={onChangeFieldValue}
                />
            </DrawerFilterMenu> */}
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
        >
            <ModalButton handleAccept={handleAccept} handleClose={handleClose} />
        </ModalConfirm>
    </UserPageContainer>
    );
};
