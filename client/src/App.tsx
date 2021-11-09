import { BrowserRouter, Route } from 'react-router-dom';
import { routes, protectedRoutes } from '@utils/constants/Routes';
import { ProtectedRoute } from '@components/ProtectedRoute/ProtectedRoute';

const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                {routes.map(({ path, component: Component }) => (
                    <Route key={path} exact path={path} component={Component} />
                ))}
                {protectedRoutes.map(({ path, component: Component, title, exact }) => (
                    <ProtectedRoute
                        key={path}
                        title={title}
                        path={path}
                        children={<Component />}
                        exact={exact}
                    />
                ))}
            </BrowserRouter>
        </div>
    );
};
export default App;
