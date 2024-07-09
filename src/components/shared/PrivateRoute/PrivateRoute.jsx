import { Navigate, useLocation } from "react-router-dom";
// eslint-disable-next-line react/prop-types
function PrivateRoute({ isSignedIn, children }) {
  const location = useLocation();
  if (!isSignedIn) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }
  return children;
}
export default PrivateRoute;
