import PageLoader from "modules/common/components/page-loader";
import { Suspense, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Authz from "./authz";
import { UserRole } from "modules/user/enum/user-role";
import { routes } from "./routes";
import AppWrapper from "modules/app/app-wrapper";
import StudentPage from "modules/student";
import IARoutes from "modules/IA/ia.routes";
import { getCookie } from "utils/cookies/cookies";
import AdminRoutes from "modules/admin/admin.routes";

const ProtectedRoutes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const userRole = getCookie("role");
    if (userRole === UserRole.Student) {
      navigate(routes.student.root);
    } else if (userRole === UserRole.IA) {
      navigate(routes.ia.root);
    } else if (userRole === UserRole.Admin) {
      navigate(routes.admin.root);
    }
  }, []);

  return (
    <AppWrapper>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route
            path="student/*"
            element={
              <Authz privileges={[UserRole.Student]}>
                <StudentPage />
              </Authz>
            }
          />
          <Route
            path="ia/*"
            element={
              <Authz privileges={[UserRole.IA]}>
                <IARoutes />
              </Authz>
            }
          />
          <Route
            path="admin/*"
            element={
              <Authz privileges={[UserRole.Admin]}>
                <AdminRoutes />
              </Authz>
            }
          />

          <Route path="*" element={<Navigate to={routes.auth.login} />} />
        </Routes>
      </Suspense>
    </AppWrapper>
  );
};

export default ProtectedRoutes;
