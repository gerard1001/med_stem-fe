import { isAfter, isBefore } from 'date-fns';

export default function patientVisitsAnalyticsHelpers(
  patients,
  departments,
  range,
  isAdmin = true
) {
  const data = {};

  patients?.forEach((patient) => {
    patient.appointments?.forEach((appointment) => {
      const { date } = appointment.work_day;
      if (
        !isAdmin ||
        (isAfter(new Date(date), new Date(range[0])) &&
          isBefore(new Date(date), new Date(range[1])))
      ) {
        appointment.doctor?.departments?.forEach((depart) => {
          const departName = depart.department_name;
          data[departName] = data[departName] ? data[departName] + 1 : 1;
        });
      }
    });
  });

  const colors = [
    '#C1E7FF',
    '#5D76CB',
    '#1164B4',
    '#004C6D',
    '#1560BD',
    '#94BED9',
    '#80DAEB',
    '#1D91C0',
    '#6495ED',
    '#225EA8',
    '#6A8DE9'
  ];
  let colorCount = 0;

  const newData =
    departments?.map((dep) => {
      const depName = dep.department_name;
      const arr = [
        depName,
        data[depName] || 0,
        colors[colorCount],
        data[depName] || 0
      ];

      if (colorCount < colors.length) {
        colorCount++;
      } else {
        colorCount = 0;
      }
      return arr;
    }) || [];

  const res = [
    ['Department Name', 'visits', { role: 'style' }, { role: 'annointment' }],
    ...newData
  ];

  return res;
}
