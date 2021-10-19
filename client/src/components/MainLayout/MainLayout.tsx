import { FC } from "react";
import { Route, useHistory } from "react-router";
import { Header } from "@components/Header/Header";
import { SideMenu } from "@components/SideMenu/SideMenu";

import { SideContainer, GlobalContainer, SideChildren } from "./styled/styled";

interface RouteProps {
  path: string;
  title: string;
  icon: any;
  [x: string]: any;
}

export const MainLayout: FC<RouteProps> = ({
  children,
  title,
  icon,
  ...rest
}) => {
  const history = useHistory();

  if (!history.location.pathname.includes("/auth")) {
    !localStorage.getItem("NewCMS_accessToken") && history.push("/auth/login");
  }

  return (
    <Route
      exact
      {...rest}
      render={() => (
        <GlobalContainer>
          <SideMenu />
          <SideContainer>
            <Header icon={icon} title={title} />
            <SideChildren>{children}</SideChildren>
          </SideContainer>
        </GlobalContainer>
      )}
    />
  );
};
