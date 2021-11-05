import { FC } from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { useTranslation } from 'react-i18next';

import { Buttons } from '@components/Button/Button';
import { Icons } from '@utils/constants/icon';
import { CloseButton, FilterLayout, FilterLayoutHeader, HeaderTitle } from './styled';

interface IProps {
    toggleDrawerMenu: VoidFunction;
    drawerMenuOpenStatus: boolean;
    children?: JSX.Element;
}

export const DrawerFilterMenu: FC<IProps> = ({
    toggleDrawerMenu,
    drawerMenuOpenStatus,
    children
}) => {
    const { t } = useTranslation();
    return (
        <div>
            <Buttons
                title={t('Filter')}
                type="button"
                style="greyButton"
                icon={Icons.FilterIcon}
                onClickFunction={toggleDrawerMenu}
            />
            <SwipeableDrawer
                anchor={'right'}
                open={drawerMenuOpenStatus}
                onClose={toggleDrawerMenu}
                onOpen={toggleDrawerMenu}
            >
                <FilterLayout>
                    <FilterLayoutHeader>
                        <HeaderTitle>{t('Filter')}</HeaderTitle>
                        <CloseButton onClick={toggleDrawerMenu}>{Icons.LargeCloseIcon}</CloseButton>
                    </FilterLayoutHeader>
                    {children}
                </FilterLayout>
            </SwipeableDrawer>
        </div>
    );
};
