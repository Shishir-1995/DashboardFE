import PageLoader from "modules/common/components/page-loader";
import { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Authz from "./authz";
import { UserRole } from "modules/user/enum/user-role";
import { routes } from "./routes";
import AppWrapper from "modules/app/app-wrapper";
import StudentPage from "modules/student";
import IARoutes from "modules/IA/ia.routes";

const ProtectedRoutes = () => {
  return (
    <AppWrapper>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route
            path="student/*"
            element={
              // <Authz privileges={[UserRole.Student]}>
                <StudentPage />
              // </Authz>
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

          <Route path="*" element={<Navigate to={routes.auth.login} />} />
        </Routes>
      </Suspense>
    </AppWrapper>
  );
};

export default ProtectedRoutes;
