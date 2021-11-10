import { Header } from '@components/Header/Header';
import { SideMenu } from '@components/SideMenu/SideMenu';
import { tokenServise } from '@services/tokenServise';
import { AuthRoutes } from '@utils/enums/routes';
import { PropsWithChildren } from 'react';
import { Redirect } from 'react-router';
import { GlobalContainer, SideChildren, SideContainer } from './styled';

export const PageLayout = ({ title, children }: PropsWithChildren<{ title: string }>) => {
    const isAuthenticated = tokenServise.getToken();

    if (!isAuthenticated) {
        return <Redirect to={{ pathname: AuthRoutes.LOGIN }} />;
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
