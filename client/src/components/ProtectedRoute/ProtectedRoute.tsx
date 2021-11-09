import { FC } from 'react';
import { Route } from 'react-router-dom';
import { PageLayout } from './PageLayout';

interface RouteProps {
    path: string;
    title: string;
    exact?: boolean;
}

export const ProtectedRoute: FC<RouteProps> = ({ children, title, ...rest }) => {
    return (
        <Route {...rest}>
            <PageLayout title={title} children={children} />
        </Route>
    );
};
