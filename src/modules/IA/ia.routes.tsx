import { Route, Routes } from "react-router-dom";
import IAPage from "./ia.page";

const IARoutes = () => {
  return (
    <Routes>
      <Route index Component={IAPage} />
      <Route path="pp" element={<h1>Hom2</h1>} />
    </Routes>
  );
};

export default IARoutes;
