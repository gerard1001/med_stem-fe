export default function genderAnalyticsHelper(entities, type = 'patients') {
  const data = {
    male: 0,
    female: 0
  };

  entities?.forEach((entity) => {
    const gender = entity?.gender;
    data[gender] = data[gender] ? data[gender] + 1 : 1;
  });

  data.male = data.male || 0;
  data.female = data.female || 0;

  const res = [
    ['Gender', `Number of ${type}`],
    ['male', data.male],
    ['female', data.female]
  ];

  return res;
}
