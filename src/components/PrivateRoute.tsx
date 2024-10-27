// src/components/PrivateRoute.tsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

interface PrivateRouteProps {
  component: React.ComponentType<any>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component }) => {
  const authContext = useContext(AuthContext);
  const user = authContext?.user;

  return user ? <Component /> : <Navigate to="/signin" replace />;
};

export default PrivateRoute;
