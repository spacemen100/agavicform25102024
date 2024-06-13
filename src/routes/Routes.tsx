import React from 'react';
import { BrowserRouter as Router, Route, Routes as Switch } from 'react-router-dom';
import Home from '../pages/Home';

const routes = [
  { path: '/', name: 'Home', component: <Home />, hidden: true },
];

const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.component} />
        ))}
      </Switch>
    </Router>
  );
};

export default Routes;
