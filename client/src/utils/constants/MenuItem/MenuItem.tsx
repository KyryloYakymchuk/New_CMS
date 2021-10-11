import HomeIcon from "@mui/icons-material/Home";
// import LockOpenIcon from "@mui/icons-material/LockOpen";
import PeopleIcon from "@mui/icons-material/People";
import ListAltIcon from "@mui/icons-material/ListAlt";

export const MenuItem = [
  {
    name: "Home Page",
    path: "/",
    icon: <HomeIcon fontSize="small" />,
    itemId: 1,
  },
  {
    name: "Users",
    path: "/users",
    icon: <PeopleIcon fontSize="small" />,
    itemId: 2,
  },
  {
    name: "Todos",
    path: "/todos",
    icon: <ListAltIcon fontSize="small" />,
    itemId: 3,
  },
];
