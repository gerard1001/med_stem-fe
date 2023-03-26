import { differenceInYears, subYears } from 'date-fns';

export default function ageAnalyticsHelper(entities, type = 'Patients') {
  console.log(entities, 'entities');
  const data = {};

  entities?.forEach((entities) => {
    const { birth_date } = entities;
    const age = differenceInYears(new Date(), new Date(birth_date));
    console.log(age, birth_date);

    if (age <= 24) {
      data[1] = data[1] ? data[1] + 1 : 1;
    } else if (age > 24 && age <= 30) {
      data[2] = data[2] ? data[2] + 1 : 1;
    } else if (age > 30 && age <= 40) {
      data[3] = data[3] ? data[3] + 1 : 1;
    } else if (age > 40 && age <= 50) {
      data[4] = data[4] ? data[4] + 1 : 1;
    } else if (age > 50 && age <= 60) {
      data[5] = data[5] ? data[5] + 1 : 1;
    } else if (age > 60 && age <= 70) {
      data[6] = data[6] ? data[6] + 1 : 1;
    } else if (age > 70) {
      data[6] = data[6] ? data[6] + 1 : 1;
    }

    data[age] = data[age] ? data[age] + 1 : 1;
  });

  const res = [
    ['Age', type],
    ['18-24', data[1] || ''],
    ['25-30', data[2] || ''],
    ['31-40', data[3] || ''],
    ['41-50', data[4] || ''],
    ['51-60', data[5] || ''],
    ['61-70', data[6] || ''],
    ['70+', data[7] || '']
  ];

  return res;
}
