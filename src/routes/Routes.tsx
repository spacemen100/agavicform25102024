// src/Routes.tsx
import React from 'react';
import { Route, Routes as Switch } from 'react-router-dom';
import Home from '../pages/Home';
import QuelEstVotreProjetDInvestissement from '../pages/QuelEstVotreProjetDInvestissement';

export const routes = [
  { path: '/', name: 'Home', component: <Home />, hidden: true },
  { path: '/quel-est-votre-projet-d-investissement', name: 'QuelEstVotreProjetDInvestissement', component: <QuelEstVotreProjetDInvestissement />, hidden: true },
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
