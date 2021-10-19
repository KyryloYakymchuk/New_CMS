import { BrowserRouter, Route } from "react-router-dom";

import { UserPage } from "@modules/User/UsersPage";

import { Login } from "@modules/Auth/Login";
import { Register } from "@modules/Auth/Register";

import { MainLayout } from "@components/MainLayout/MainLayout";

import { titleHeader } from "@utils/constants/titleHeader/titleHeader";
import { ResetPassword } from "@modules/Auth/ResetPassword";
import { Reset } from "@modules/Auth/Reset";

const App = () => {
  const routes = [
    { path: "/auth/login", component: Login },
    { path: "/auth/register", component: Register },
    { path: "/auth/reset", component: Reset },
    { path: "/auth/resetPassword/:token", component: ResetPassword },
  ];

  const ProtectedRoutes = [
    {
      path: "/",
      component: UserPage,
      icon: titleHeader.HomeIcon,
      title: titleHeader.HomePage,
    },
    {
      path: "/users",
      component: UserPage,
      icon: titleHeader.UsersIcon,
      title: titleHeader.UsersList,
    },
    {
      path: "/todos",
      component: UserPage,
      icon: titleHeader.TodoIcon,
      title: titleHeader.TodoList,
    },
  ];

  return (
    <div className="App">
      <BrowserRouter>
        {routes.map(({ path, component: Component }) => (
          <Route key={path} exact path={path}>
            <Component />
          </Route>
        ))}

        {ProtectedRoutes.map(({ path, component: Component, icon, title }) => (
          <MainLayout key={path} icon={icon} title={title} exact path={path}>
            <Component />
          </MainLayout>
        ))}
      </BrowserRouter>
    </div>
  );
};

export default App;
