import { combineReducers } from 'redux';
import countReducer from './count.reducer';

const allReducers = combineReducers({
  count: countReducer
});

export default allReducers;
