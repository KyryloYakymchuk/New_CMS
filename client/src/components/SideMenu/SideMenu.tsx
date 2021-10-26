import { FC } from 'react';
import { useDispatch } from 'react-redux';
import { itemIdAction } from '@redux/actions/menuStatus';
import { MenuItem } from '@utils/constants/MenuItem/MenuItem';
import { useTranslation } from 'react-i18next';

import { useTypedSelector } from '@utils/hooks/useTypedSelector';
import {
    NavbarContainer,
    NavbarItem,
    TitleNavbarSubItem,
    Title, 
    style
} from './styled';

export const SideMenu: FC = () => {
    const statusMenu = useTypedSelector(({ menuReducer }) => menuReducer.status);
    const pickedId = useTypedSelector(({ menuReducer }) => menuReducer.itemId);

    const dispatch = useDispatch();
    const { t } = useTranslation();


    const handleSetItemID = (itemId: number) => () => {
        if (pickedId === itemId) {
            dispatch(itemIdAction(0));
        } else {
            dispatch(itemIdAction(itemId));
        }
    };

    return (
        <NavbarContainer statusmenu={statusMenu}>
            {MenuItem.map(({ name, path, itemId, icon, subItems, height }) =>
                path ? (
                    <NavbarItem
                        exact
                        to={path}
                        activeStyle={style}
                        padding="15px"
                        key={itemId}
                        onClick={handleSetItemID(itemId)}
                        statusmenu={statusMenu}
                    >
                        {icon}
                        <span>{t(name)}</span>
                    </NavbarItem>
                ) : (
                    <TitleNavbarSubItem
                        isItemSelected={pickedId === itemId}
                        height={height}
                    >
                        <Title onClick={handleSetItemID(itemId)}>
                            {icon}
                            <span>{t(name)}</span>
                        </Title>
                        {subItems?.map(({ subName, subPath }) => (
                            <NavbarItem
                                exact
                                to={subPath}
                                activeStyle={style}
                                padding="55px"
                                key={subPath}
                            >
                                {t(subName)}
                            </NavbarItem>
                        ))}
                    </TitleNavbarSubItem>
                )
            )}
        </NavbarContainer>
    );
};
