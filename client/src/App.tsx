import { BrowserRouter, Route } from 'react-router-dom';
import { routes, protectedRoutes } from '@utils/constants/Routes';
import { ProtectedRoute } from '@components/ProtectedRoute/ProtectedRoute';

const App = () => (
    <div className="App">
        <BrowserRouter>
            {routes.map(({ path, component: Component }) => (
                <Route key={path} exact path={path} component={Component} />
            ))}
            {protectedRoutes.map(({ path, component: Component, title }) => (
                <ProtectedRoute title={title} path={path}>
                    <Component />
                </ProtectedRoute>
            ))}
        </BrowserRouter>
    </div>
);

export default App;
