import { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';

import { setModalMessageAction } from '@redux/actions/modal';

import { Buttons } from '@components/Button/Button';
import { ListDD } from '@components/ListDD/ListDD';

import { Icons } from '@utils/constants/icon';
//!for future sorting 
// import { ISortParams } from '@interfaces/types';

import { PageHeader, UserPageContainer } from '@modules/Users/styled';
import { moduleFieldsListColumns } from '@utils/constants/ListsData/ListsData';
import { editableDataSelector } from '@redux/selectors/modules';
import { useAppSelector } from '@utils/hooks/useAppSelector';
import { ModalConfirm } from '@components/Modal/ModalConfirmSubmit/ModalConfirm';
import { ModalButton } from '@components/Modal/ModalButton';
//!for future pagination 
// import { Pagination } from '@components/Pagination/Pagination';


// const LIMIT = 10;
const constantFields = [
    'f_name',
    'f_pDate',
    'f_aDate',
    'f_Status'
];


export const AllFields: FC = () => {

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const history = useHistory();
    const allFieldsModule = useAppSelector(editableDataSelector);
    //!for future pagination 
    // let { search } = useLocation();
    // const query = new URLSearchParams(search);
    // const currentPage = Number(query.get('page'));
    
    //!for future sorting 
    // const [sortParams, setSortParams] = useState<ISortParams>({});
    // const [sortingTypeIdx, setSortingTypeIdx] = useState(0);

    const [modalStatus, setModalStatus] = useState<boolean>();
    const [fieldId, setFieldId] = useState<string>('');
    
    const handleSortClick = (sortField: string) => () => {
        console.log(sortField);
        //!for future sorting 
        // const temp: ISortHandlerValue = handleListSort(
        //     sortField,
        //     sortingTypeIdx,
        //     String(sortParams.sortField)
        // );
        // setSortingTypeIdx(temp.currSortingTypeIdx);
        // setSortParams(temp.currentSortParams);
    };
    
    const createModuleClick = () => {
       history.push('/module/create');
    };
    const editFieldClick = (value: React.ChangeEvent<HTMLDivElement>)  => () => {
        const temp: any = value;     
        console.log(temp);
    
    };
    const deleteFieldClick = (value: React.ChangeEvent<HTMLDivElement>) => () => {
        const temp: any = value;
        setFieldId(temp.id);
        if (constantFields.includes(temp.id)){
            dispatch(setModalMessageAction('Sorry, but these are сonstants fields'));
            setModalStatus(true);
        } else {
            dispatch(setModalMessageAction(`${t('Delete Field')} ${temp.name} ?`));
            setModalStatus(true);
        }
    };
    const handleAccept = () => {
        setModalStatus(false);
    };
    const handleClose = () => {
        setModalStatus(false);
    };

      const onDragClick = (value: React.ChangeEvent<HTMLDivElement>) => () => {
       console.log(value);    
    };
    
    const actionsButtons = [
        { item: <Icons.DragHandleIcon />, onClickFunc: onDragClick },
        { item: <Icons.EditIcon />, onClickFunc: editFieldClick },
        { item: <Icons.DeleteIcon />, onClickFunc: deleteFieldClick }
    ];
    
    
    useEffect(() => {
        if (!allFieldsModule){
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
            //!for future filter
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
        <ListDD 
          sortHandler={handleSortClick}
          listColumns={moduleFieldsListColumns}
          listData={allFieldsModule?.fields}
          arrButton={actionsButtons}
        />
        //!for future pagination 
        {/* <Pagination count={Number(allModules?.count)} limit={LIMIT} /> */}
        <ModalConfirm
            handleAccept={handleAccept}
            handleClose={handleClose}
            modalStatus={modalStatus}
        >
            {!constantFields?.includes(fieldId) ?
            <ModalButton handleAccept={handleAccept} handleClose={handleClose} />
            : <ModalButton handleAccept={handleClose}  />
            }
        </ModalConfirm>
    </UserPageContainer>
    );
};
