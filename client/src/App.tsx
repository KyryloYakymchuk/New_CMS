import { BrowserRouter, Route } from 'react-router-dom';
import { routes, protectedRoutes } from '@utils/constants/Routes';
import { ProtectedRoute } from '@components/ProtectedRoute/ProtectedRoute';

const App = () => (
    <div className="App">
        <BrowserRouter>
            {routes.map(({ path, component: Component }) => (
                <Route key={path} exact path={path}>
                    <Component/>
                </Route>
            ))}
            {protectedRoutes.map(({ path, component: Component, title }) => (
                <Route key={path} exact path={path}>
                    <ProtectedRoute title={title} path={path}>
                        <Component/>
                    </ProtectedRoute>
                </Route>
            ))}
        </BrowserRouter>
    </div>
);

export default App;
