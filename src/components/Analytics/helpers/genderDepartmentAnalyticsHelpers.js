export default function genderDepartmentAnalyticsHelpers(doctors) {
  // const data = {};

  const result = doctors?.reduce(
    (arr, doctor) => {
      doctor?.departments?.forEach((department) => {
        const name = department?.department_name;
        if (!arr[0][name]) {
          arr[0][name] = { male: 0, female: 0 };
        }
        arr[0][name][doctor.gender]++;
      });
      return arr;
    },
    [{}]
  );

  const data = result ? result[0] : {};

  // doctors?.forEach((doctor) => {
  //   doctor?.departments?.forEach((department) => {
  //     const name = department?.department_name;
  //     const gender = doctor?.gender;
  //     const formattedGender = gender === 'male' ? 'man' : 'woman';

  //     data[name] = data[name]
  //       ? {
  //           ...data[name],
  //           [formattedGender]: data[name][formattedGender] + 1
  //         }
  //       : { man: 0, woman: 0 };
  //   });
  // });

  const reducedData = Object.keys(data).map((name) => {
    return [name, data[name].male, data[name].female];
  });

  const res = [['Department', 'man', 'woman'], ...reducedData];

  return res;
}
