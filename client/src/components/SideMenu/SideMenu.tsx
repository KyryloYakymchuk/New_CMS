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
  const statusMenu = useSelector(menuStatusSelector);
  const pickedId = useSelector(pickedItemIdSelector);

  const dispatch = useDispatch();

  const handleSetItemID = (itemId: number) => () => {
    dispatch(itemIdAction(itemId));
  };

  return (
    <NavbarContainer statusMenu={statusMenu}>
      {MenuItem.map(({ name, path, itemId, icon }) => (
        <NavbarItem
          key={itemId}
          pickedId={pickedId}
          itemId={itemId}
          onClick={handleSetItemID(itemId)}
          to={path}
          statusMenu={statusMenu}
        >
          {icon}
          <span>{name}</span>
        </NavbarItem>
      ))}
    </NavbarContainer>
  );
};
