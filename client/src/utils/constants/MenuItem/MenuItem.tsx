import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import StickyNote2Icon from "@mui/icons-material/StickyNote2";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import GroupsIcon from "@mui/icons-material/Groups";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import StorefrontIcon from "@mui/icons-material/Storefront";
import SettingsIcon from "@mui/icons-material/Settings";

export const MenuItem = [
  {
    name: "Dashboard",
    path: "/",
    icon: <DashboardIcon fontSize="medium" />,
    itemid: 1,
  },
  {
    name: "Users",
    icon: <PersonIcon fontSize="medium" />,
    itemid: 2,
    height: "130px",
    subitems: [
      { name: "All Users", path: "/users/list" },
      { name: "New User", path: "/users/add" },
    ],
  },
  {
    name: "Pages",
    icon: <StickyNote2Icon fontSize="medium" />,
    itemid: 3,
    height: "180px",
    subitems: [
      { name: "All Pages", path: "/pages/list" },
      { name: "New Pages", path: "/Pages/add" },
      { name: "Edit Page", path: "/pagebuilder" },
    ],
  },
  {
    name: "Modules",
    icon: <AccountTreeIcon fontSize="medium" />,
    itemid: 4,
    height: "130px",
    subitems: [
      { name: "All Modules", path: "/modules/list" },
      { name: "New Module", path: "/modules/add" },
    ],
  },
  {
    name: "Groups",
    icon: <GroupsIcon fontSize="medium" />,
    itemid: 5,
    height: "130px",
    subitems: [
      { name: "All Groups", path: "/groups/list" },
      { name: "New Group", path: "/groups/add" },
    ],
  },
  {
    name: "Newsletter",
    icon: <MenuBookIcon fontSize="medium" />,
    itemid: 6,
    height: "225px",
    subitems: [
      { name: "All Letter", path: "/letter/list" },
      { name: "New Letter", path: "/letter/add" },
      { name: "New Jobs", path: "/jobs/list" },
      { name: "New Jobs", path: "/jobs/add" },
    ],
  },
  {
    name: "Webshop",
    icon: <StorefrontIcon fontSize="medium" />,
    itemid: 7,
    height: "225px",
    subitems: [
      { name: "Categories", path: "/webshop/categories/list" },
      { name: "All Fields", path: "/webshop/fields/list" },
      { name: "All Items", path: "/webshop/items/list" },
      { name: "All Orders", path: "/webshop/orders/list" },
    ],
  },
  {
    name: "Settings",
    path: "/settings",
    icon: <SettingsIcon fontSize="medium" />,
    itemid: 8,
  },
];

export const style = {
  backgroundColor: "#f03254",
  color: "white",
};