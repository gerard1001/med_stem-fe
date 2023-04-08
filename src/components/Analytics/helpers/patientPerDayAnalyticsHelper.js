import { isAfter, isBefore } from 'date-fns';

export default function patientPerDayAnalyticsHelper(patients, range, isAdmin) {
  const data = {};

  patients?.forEach((patient) => {
    patient.appointments?.forEach((appointment) => {
      const { date, day } = appointment.work_day;
      const finishedDays = [];
      if (
        // !isAdmin ||
        !finishedDays.includes(day) &&
        isAfter(new Date(date), new Date(range[0])) &&
        isBefore(new Date(date), new Date(range[1]))
      ) {
        finishedDays.push(day);
        data[day] = data[day] ? data[day] + 1 : 1;
      }
    });
  });

  const res = [
    ['Day', 'patients'],
    ['Mon', data.Mon || 0],
    ['Tue', data.Tue || 0],
    ['Wed', data.Wed || 0],
    ['Thu', data.Thu || 0],
    ['Fri', data.Fri || 0],
    ['Sat', data.Sat || 0],
    ['Sun', data.Sun || 0]
  ];

  return res;
}
