import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';

const App = () => (
  <Routes>
    <Route exact path="/" element={<Landing />} />
  </Routes>
);

export default App;
