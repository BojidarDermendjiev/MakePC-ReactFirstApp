import { useContext } from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import { AuthContext } from "../../context/AuthContextProvider";
import { navigation } from "../../common/navigations";

const ProtectedRoute = ({ children, requiresAuth = false, adminOnly = false }) => {
  const { user } = useContext(AuthContext);

  // If route doesn't require auth, always allow access
  if (!requiresAuth) {
    return children;
  }

  // If route requires auth but user is not logged in, redirect to login
  if (requiresAuth && !user) {
    return <Navigate to={navigation.getLoginUrl()} replace />;
  }

  // If route requires admin but user is not admin, redirect to home
  if (adminOnly && user?.role !== "admin") {
    return <Navigate to={navigation.getHomeUrl()} replace />;
  }

  // All checks passed, render the children
  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  requiresAuth: PropTypes.bool,
  adminOnly: PropTypes.bool,
};

export default ProtectedRoute;