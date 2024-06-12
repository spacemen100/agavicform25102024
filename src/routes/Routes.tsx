import React from 'react';
import { BrowserRouter as Router, Route, Routes as Switch } from 'react-router-dom';
import Home from '../pages/Home';
import Project from '../pages/Project';

const Routes: React.FC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" element={<Home />} />
        <Route path="/project" element={<Project />} />
      </Switch>
    </Router>
  );
};

export default Routes;
