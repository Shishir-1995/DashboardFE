import { lazy, Suspense } from "react";

import styled from "@emotion/styled";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PageLoader from "modules/common/components/page-loader";
import SignIn from "modules/auth/component/login-form";

const ProtectedRoutes = lazy(() => import("./protected.routes"));

const RoutesWrapper = styled.div(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  height: "100dvh",
}));

const routes = createBrowserRouter([
  {
    path: "auth/*",
    element: <SignIn />,
  },
  {
    path: "*",
    element: <ProtectedRoutes />,
  },
]);

const AllRoutes: React.FC = () => {
  return (
    <RoutesWrapper>
      <Suspense fallback={<PageLoader />}>
        <RouterProvider router={routes} />
      </Suspense>
    </RoutesWrapper>
  );
};

export default AllRoutes;
