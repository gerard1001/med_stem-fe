export default function genderDepartmentAnalyticsHelpers(doctors) {
  const data = {};

  doctors?.forEach((doctor) => {
    doctor.departments?.forEach((department) => {
      const name = department.department_name;
      const { gender } = doctor;
      const formattedGender = gender === 'male' ? 'man' : 'woman';

      data[name] = data[name]
        ? { ...data[name], [formattedGender]: data[name][formattedGender] + 1 }
        : { man: 0, woman: 0 };
    });
  });

  const reducedData = Object.keys(data).map((name) => {
    return [name, data[name].man, data[name].woman];
  });

  const res = [['Department', 'man', 'woman'], ...reducedData];

  return res;
}
