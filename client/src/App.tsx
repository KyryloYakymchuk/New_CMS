import { BrowserRouter, Route } from "react-router-dom";

import {UsersPage } from "@modules/Users/UsersPage";

import { Login } from "@modules/Auth/Login";
import { Register } from "@modules/Auth/Register";

import { MainLayout } from "@components/MainLayout/MainLayout";

import { titleHeader } from "@utils/constants/titleHeader/titleHeader";
import { ResetPassword } from "@modules/Auth/ResetPassword";
import { Reset } from "@modules/Auth/Reset";


const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Route path={"/auth/login"}>
          <Login />
        </Route>
        <Route path={"/auth/register"}>
          <Register />
        </Route>
        <Route path={"/auth/reset"}>
          <Reset />
        </Route>
        <Route path={"/auth/resetPassword"}>
          <ResetPassword />
        </Route>
        <MainLayout
          icon={titleHeader.HomeIcon}
          title={titleHeader.HomePage}
          path={"/"}
        />

        <MainLayout
          icon={titleHeader.UsersIcon}
          title={titleHeader.UsersList}
          path={"/users/:page"}
        >
          <UsersPage />
        </MainLayout>
        <MainLayout
          icon={titleHeader.TodoIcon}
          title={titleHeader.TodoList}
          path={"/todos"}
        ></MainLayout>
      </BrowserRouter>
    </div>
  );
};

export default App;
