import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { routes } from "../../routes/routeConfig";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const AppRouter = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {routes.map((route, index) => {
          const Component = route.element;
          const RouteElement = (
            <ProtectedRoute
              requiresAuth={route.requiresAuth}
              adminOnly={route.adminOnly}
            >
              <Component {...(route.props || {})} />
            </ProtectedRoute>
          );

          return (
            <Route
              key={index}
              path={route.path}
              element={RouteElement}
            />
          );
        })}
      </Routes>
    </Suspense>
  );
};

export default AppRouter;