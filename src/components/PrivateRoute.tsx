// src/components/PrivateRoute.tsx
import React, { useContext } from 'react';
import { Route, Redirect, RouteProps } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

interface PrivateRouteProps extends RouteProps {
    component: React.ComponentType<any>;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ component: Component, ...rest }) => {
    const authContext = useContext(AuthContext);
    const user = authContext?.user;

    return (
        <Route
            {...rest}
            render={(props) =>
                user ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/signin',
                            state: { from: props.location },
                        }}
                    />
                )
            }
        />
    );
};

export default PrivateRoute;
