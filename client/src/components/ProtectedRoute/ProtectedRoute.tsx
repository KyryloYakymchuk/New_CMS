import { FC } from 'react';
import { useHistory } from 'react-router';
import { Header } from '@components/Header/Header';
import { SideMenu } from '@components/SideMenu/SideMenu';
import { SideContainer, GlobalContainer, SideChildren } from './styled';
import { AuthRoutes } from '@utils/enums/routes';

interface RouteProps {
    path: string;
    title: string;
}

export const ProtectedRoute: FC<RouteProps> = ({ children, title }) => {
    const history = useHistory();

    if (!localStorage.getItem('NewCMS_accessToken')) {
        history.push(AuthRoutes.LOGIN);
    }

    return (
        <GlobalContainer>
            <SideMenu />
            <SideContainer>
                <Header title={title} />
                <SideChildren>{children}</SideChildren>
            </SideContainer>
        </GlobalContainer>
    );
};
