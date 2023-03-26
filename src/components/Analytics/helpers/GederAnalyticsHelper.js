export function genderAnalyticsHelper(entities) {
  console.log(entities, 'entities');
  let data = {};

  entities.forEach((member) => {
    const gender = member.gender;
    data[gender] = data[gender] ? data[gender] + 1 : 1;
  });

  const isDoctor

  const res = [
    ['gender', 'number of entities'],
    ['male', data['male']],
    ['female', data['female']],
  ];

  return res;
}