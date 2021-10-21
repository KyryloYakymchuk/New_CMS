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
  const pickedId = useSelector(pickedItemIdSelector);

  const dispatch = useDispatch();

  const handleSetItemID = (itemId: number) => () => {
    if (pickedId === itemId) {
      dispatch(itemIdAction(0));
    } else {
      dispatch(itemIdAction(itemId));
    }
  };

  return (
    <NavbarContainer statusmenu={statusmenu}>
      {MenuItem.map(({ name, path, itemId, icon, subitems, height }) =>
        path ? (
          <NavbarItem
            activeStyle={style}
            padding="15px"
            key={itemId}
            onClick={handleSetItemID(itemId)}
            exact
            to={path}
            statusmenu={statusmenu}
          >
            {icon}
            <span>{name}</span>
          </NavbarItem>
        ) : (
          <TitleNavbarSubItem
            pickedId={pickedId}
            itemId={itemId}
            height={height}
          >
            <Title onClick={handleSetItemID(itemId)}>
              {icon}
              <span>{name}</span>
            </Title>
            {subitems?.map(({ name, path }) => (
              <NavbarItem
                activeStyle={style}
                padding="55px"
                key={path}
                exact
                to={path}
              >
                {name}
              </NavbarItem>
            ))}
          </TitleNavbarSubItem>
        )
      )}
    </NavbarContainer>
  );
};
