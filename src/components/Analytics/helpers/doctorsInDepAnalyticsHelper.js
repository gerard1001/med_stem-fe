export default function doctorsInDepAnalyticsHelper(doctors, departments) {
  const data = {};

  doctors?.forEach((doctor) => {
    doctor?.departments?.forEach((department) => {
      const name = department.department_name;
      data[name] = data[name] ? data[name] + 1 : 1;
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
      const name = dep.department_name;
      const arr = [name, data[name] || 0, colors[colorCount]];

      if (colorCount < colors.length) {
        colorCount++;
      } else {
        colorCount = 0;
      }

      return arr;
    }) || [];

  const res = [['Doctors', 'Departments', { role: 'style' }], ...newData];

  return res;
}
