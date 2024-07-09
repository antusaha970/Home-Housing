import { Navigate } from "react-router-dom";
// eslint-disable-next-line react/prop-types
function PrivateRoute({ isSignedIn, children }) {
  if (!isSignedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
}
export default PrivateRoute;
