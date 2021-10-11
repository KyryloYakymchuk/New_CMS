import { BrowserRouter, Route } from "react-router-dom";

import { UserPage } from "@modules/User/UsersPage";

import { Login } from "@modules/Auth/Login";
import { Register } from "@modules/Auth/Register";

import { MainLayout } from "@components/MainLayout/MainLayout";

import { titleHeader } from "@utils/constants/titleHeader/titleHeader";

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

        <MainLayout
          icon={titleHeader.HomeIcon}
          title={titleHeader.HomePage}
          path={"/"}
        />

        <MainLayout
          icon={titleHeader.UsersIcon}
          title={titleHeader.UsersList}
          path={"/users"}
        >
          <UserPage />
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
