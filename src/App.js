import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import { getUsersAction } from './redux/reducers/user.reducer';

const App = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  console.log(user);

  useEffect(() => {
    dispatch(getUsersAction());
  }, []);

  return (
    <Routes>
      <Route exact path="/" element={<Landing />} />
    </Routes>
  );
};

export default App;
