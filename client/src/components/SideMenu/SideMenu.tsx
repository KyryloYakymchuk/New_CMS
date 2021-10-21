import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { itemIdAction } from '@redux/actions/menuStatus';

import {
    menuStatusSelector,
    pickedItemIdSelector
} from '@redux/selectors/menuStatus';

import { MenuItem, style } from '@utils/constants/MenuItem/MenuItem';

import {
    NavbarContainer,
    NavbarItem,
    TitleNavbarSubItem,
    Title
} from './styled/styled';

export const SideMenu: FC = () => {
    const statusmenu = useSelector(menuStatusSelector);
    const pickedId = useSelector(pickedItemIdSelector);

    const dispatch = useDispatch();

    const handleSetItemID = (itemId: number) => () => {
        if (pickedId === itemId) {
            dispatch(itemIdAction(0));
        } else {
            dispatch(itemIdAction(itemId));
        }
    };

    return (
        <NavbarContainer statusmenu={statusmenu}>
            {MenuItem.map(({ name, path, itemId, icon, subitems, height }) =>
                path ? (
                    <NavbarItem
                        exact
                        to={path}
                        activeStyle={style}
                        padding="15px"
                        key={itemId}
                        onClick={handleSetItemID(itemId)}
                        statusmenu={statusmenu}
                    >
                        {icon}
                        <span>{name}</span>
                    </NavbarItem>
                ) : (
                    <TitleNavbarSubItem
                        isItemSelected={pickedId === itemId}
                        height={height}
                    >
                        <Title onClick={handleSetItemID(itemId)}>
                            {icon}
                            <span>{name}</span>
                        </Title>
                        {subitems?.map(({ subName, subPath }) => (
                            <NavbarItem
                                exact
                                to={subPath}
                                activeStyle={style}
                                padding="55px"
                                key={subPath}
                            >
                                {subName}
                            </NavbarItem>
                        ))}
                    </TitleNavbarSubItem>
                )
            )}
        </NavbarContainer>
    );
};
