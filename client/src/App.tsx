import { BrowserRouter, Route } from "react-router-dom";
import { protectedRoutes, routes } from "@utils/constants/Routes";

import { MainLayout } from "@components/MainLayout/MainLayout";

const App = () => {

  return (
    <BrowserRouter>
      {routes.map(({ path, component: Component }) => (
        <Route key={path} exact path={path}>
          <Component />
        </Route>
      ))}
      {protectedRoutes.map(({ path, component: Component, title }) => (
        <MainLayout key={path} title={title} exact path={path}>
          <Component />
        </MainLayout>
      ))}
    </BrowserRouter>
  );
};

export default App;
