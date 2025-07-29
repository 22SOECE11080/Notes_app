import { Routes, Route } from "react-router-dom";

import { AppLayouts } from "../layouts/appLayouts";
import { Home } from "../pages/home";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<AppLayouts />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
