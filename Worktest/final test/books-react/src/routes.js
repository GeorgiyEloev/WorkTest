import { Navigate } from "react-router-dom";
import Main from "./components/Main/Main";
import Details from "./components/Details/Details";
import AddNew from "./components/AddNew/AddNew";

const routes = () => [
  {
    path: "/main",
    element: <Main />,
  },
  {
    path: "/details/:id",
    element: <Details />,
  },
  {
    path: "/addNew",
    element: <AddNew />,
  },
  {
    path: "*",
    element: <Navigate to="/main" />,
  },
];

export default routes;
