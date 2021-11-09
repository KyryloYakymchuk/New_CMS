import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';

import { setModalMessageAction } from '@redux/actions/modal';

import { Pagebuilder } from '@components/Pagebuilder/Pagebuilder';
import { ModalConfirm } from '@components/Modal/ModalConfirmSubmit/ModalConfirm';


export const NewPage: FC = () => {
    const dispatch = useDispatch();
    const [editorData, setEditorData] = useState<any>();
    const [modalStatus, setModalStatus] = useState<boolean>(false);

    const handleClickCreatePage = (Editor:any) => {
        setEditorData(Editor);
        setModalStatus(true);
        dispatch(setModalMessageAction('Create Page'));
    };

    const handleAccept = () => {
        console.log(editorData.getHtml());
        setModalStatus(false);
    };

    const handleClose = () => {
        setModalStatus(false);
    };

  
    return (<>
        <Pagebuilder handleClickCreatePage={handleClickCreatePage}/>
        <ModalConfirm
            modalStatus={modalStatus}
            handleAccept={handleAccept}
            handleClose={handleClose}
        />
    </>
    );
};