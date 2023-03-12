import { combineReducers } from 'redux';
import infoReducer from './info.reducer';
import doctorReducer from './doctor.reducer';
import departmentReducer from './department.reducer';
import patientReducer from './patient.reducer';
import stepReducer from './step.reducer';
import scheduleReducer from './schedule.reducer';
import calendarReducer from './calendar.reducer';
import userReducer from './user.reducer';
import appointmentReducer from './appointment.reducer';
import workDaysReducer from './workDays.reducer';

const allReducers = combineReducers({
  info: infoReducer,
  doctor: doctorReducer,
  patient: patientReducer,
  department: departmentReducer,
  step: stepReducer,
  schedule: scheduleReducer,
  calendar: calendarReducer,
  user: userReducer,
  appointment: appointmentReducer,
  workDays: workDaysReducer
});

export default allReducers;
