import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { itemIdAction } from "@redux/actions/menuStatus";

import {
  menuStatusSelector,
  pickedItemIdSelector,
} from "@redux/selectors/menuStatus";

import { MenuItem } from "@utils/constants/MenuItem/MenuItem";

import { NavbarContainer, NavbarItem } from "./styled/styled";

export const SideMenu: FC = () => {
  const statusmenu = useSelector(menuStatusSelector);
  const pickedid = useSelector(pickedItemIdSelector);

  const dispatch = useDispatch();

  const handleSetItemID = (itemId: number) => () => {
    dispatch(itemIdAction(itemId));
  };

  return (
    <NavbarContainer statusmenu={statusmenu}>
      {MenuItem.map(({ name, path, itemid, icon }) => (
        <NavbarItem
          key={itemid}
          pickedid={pickedid}
          itemid={itemid}
          onClick={handleSetItemID(itemid)}
          to={path}
          statusmenu={statusmenu}
        >
          {icon}
          <span>{name}</span>
        </NavbarItem>
      ))}
    </NavbarContainer>
  );
};
