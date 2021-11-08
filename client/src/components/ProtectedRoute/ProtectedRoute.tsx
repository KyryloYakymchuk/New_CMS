import { FC } from 'react';
import { Redirect, Route } from 'react-router';
import { Header } from '@components/Header/Header';
import { SideMenu } from '@components/SideMenu/SideMenu';
import { SideContainer, GlobalContainer, SideChildren } from './styled';
import { AuthRoutes } from '@utils/enums/routes';
import { tokenServise } from '@services/tokenServise';
interface RouteProps {
    path: string;
    title: string;
}

export const ProtectedRoute: FC<RouteProps> = ({ children, title, path }) => {
    const isAuthenticated = tokenServise.token;

    return (
        <Route key={path} exact path={path}>
            {isAuthenticated ? (
                <GlobalContainer>
                    <SideMenu />
                    <SideContainer>
                        <Header title={title} />
                        <SideChildren>{children}</SideChildren>
                    </SideContainer>
                </GlobalContainer>
            ) : (
                <Redirect to={AuthRoutes.LOGIN} />
            )}
        </Route>
    );
};
