import Home from "./components/Home";

const AppRoutes = [
  {
    index: true,
    requireAuth: true,
    element: <Home />
  },
];

export default AppRoutes;
