export default function patientAppointmentAnalyticsHelpers(
  patients,
  doctors,
  appointments,
  range,
  isAdmin = true
) {
  const newAppoints = appointments?.filter((value) => {
    return (
      (value.drugs?.length !== 0 && value.drugs !== '[]') ||
      (value.recommendations?.length !== 0 && value.recommendations !== '[]') ||
      value.diagnosis ||
      value.complaints
    );
  });

  const result = newAppoints?.reduce((acc, appointment) => {
    const doctorName = `${appointment.doctor.first_name} ${appointment.doctor.last_name}`;
    if (acc[doctorName]) {
      acc[doctorName] += 1;
    } else {
      acc[doctorName] = 1;
    }
    return acc;
  }, {});

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

  console.log({ result });

  const newData =
    doctors?.map((doc) => {
      const docName = `${doc.first_name} ${doc.last_name}`;

      const arr = [
        docName,
        result && (result[docName] || 0),
        colors[colorCount],
        result && (result[docName] || 0)
      ];
      if (colorCount < colors.length) {
        colorCount++;
      } else {
        colorCount = 0;
      }
      return arr;
    }) || [];

  const res = [
    ['Doctor Name', 'diagnosis', { role: 'style' }, { role: 'annointment' }],
    ...newData
  ];

  return res;
}
