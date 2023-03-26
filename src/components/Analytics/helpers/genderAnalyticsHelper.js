export default function genderAnalyticsHelper(entities, type = 'patients') {
  console.log(entities, 'entities');
  const data = {
    male: 1,
    female: 1
  };

  entities?.forEach((entity) => {
    const { gender } = entity;
    data[gender] += data[gender];
  });

  data.male = data.male || 1;
  data.female = data.female || 1;

  const res = [
    ['Gender', `Number of ${type}`],
    ['male', data.male],
    ['female', data.female]
  ];

  return res;
}
