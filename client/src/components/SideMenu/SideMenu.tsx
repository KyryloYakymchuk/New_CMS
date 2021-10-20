import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { itemIdAction } from "@redux/actions/menuStatus";

import {
  menuStatusSelector,
  pickedItemIdSelector,
} from "@redux/selectors/menuStatus";

import { MenuItem, style } from "@utils/constants/MenuItem/MenuItem";

import {
  NavbarContainer,
  NavbarItem,
  TitleNavbarSubItem,
  Title,
} from "./styled/styled";

export const SideMenu: FC = () => {
  const statusmenu = useSelector(menuStatusSelector);
  const pickedid = useSelector(pickedItemIdSelector);

  const dispatch = useDispatch();

  const handleSetItemID = (itemId: number) => () => {
    if (pickedid === itemId) {
      dispatch(itemIdAction(0));
    } else {
      dispatch(itemIdAction(itemId));
    }
  };

  return (
    <NavbarContainer statusmenu={statusmenu}>
      {MenuItem.map(({ name, path, itemid, icon, subitems, height }) => (
        <>
          {path ? (
            <NavbarItem
              activeStyle={style}
              paddingLeft="15px"
              key={path}
              onClick={handleSetItemID(itemid)}
              exact
              to={path}
              statusmenu={statusmenu}
            >
              {icon}
              <span>{name}</span>
            </NavbarItem>
          ) : (
            <TitleNavbarSubItem
              pickedid={pickedid}
              itemid={itemid}
              height={height}
            >
              <Title onClick={handleSetItemID(itemid)}>
                {icon}
                <span>{name}</span>
              </Title>
              {subitems?.map(({ name, path }) => (
                <NavbarItem
                  activeStyle={style}
                  paddingLeft="55px"
                  key={path}
                  exact
                  to={path}
                >
                  {name}
                </NavbarItem>
              ))}
            </TitleNavbarSubItem>
          )}
        </>
      ))}
    </NavbarContainer>
  );
};
