import { Route, Routes } from "react-router-dom";
import IAPage from "./ia.page";
import Dashboard from "./components/pp-dashboard/Dashboard";

const IARoutes = () => {
  return (
    <Routes>
      <Route index Component={IAPage} />
      <Route path="pp" element={<Dashboard/>} />
    </Routes>
  );
};

export default IARoutes;
