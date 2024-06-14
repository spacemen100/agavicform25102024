import React from 'react';
import { BrowserRouter as Router, Route, Routes as Switch } from 'react-router-dom';
import Home from '../pages/Home';

export const routes = [
  { path: '/', name: 'Home', component: <Home />, hidden: true },
];

const Routes: React.FC = () => {
  return (
    <Switch>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.component} />
      ))}
    </Switch>
  );
};

export default Routes;
