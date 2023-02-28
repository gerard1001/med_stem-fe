import { combineReducers } from 'redux';
import userReducer from './user.reducer';
import infoReducer from './info.reducer';
import doctorReducer from './doctor.reducer';
import departmentReducer from './department.reducer';

const allReducers = combineReducers({
  user: userReducer,
  info: infoReducer,
  doctor: doctorReducer,
  department: departmentReducer
});

export default allReducers;
