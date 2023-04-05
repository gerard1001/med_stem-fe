import { isAfter, isBefore } from 'date-fns';

export default function visitedDoctorsAnalyticsHelper(doctors, range) {
  const data = [];

  doctors?.forEach((doctor) => {
    const appointments = doctor?.appointments?.filter((appointment) => {
      const date = appointment?.work_day?.date;

      if (
        isAfter(new Date(date), new Date(range[0])) &&
        isBefore(new Date(date), new Date(range[1]))
      ) {
        return true;
      }
      return false;
    });

    const name = `${doctor?.first_name} ${doctor?.last_name}`;
    data.push({ counts: appointments ? appointments.length : 0, name });
  });

  const sortedData = data.sort((a, b) => (a.counts < b.counts ? 1 : -1));
  const reducedData = [];
  const colors = ['#FF477B', '#FFCB47', '#B9AEE2', '#16F0E7', '#6A8DE9'];

  for (let i = 0; i < sortedData.length && i < 5; i++) {
    const { counts, name } = sortedData[i];
    reducedData.push([`Dr. ${name.split(' ')[1]}`, counts, colors[i]]);
  }

  const res = [['Doctor Name', 'visits', { role: 'style' }], ...reducedData];
  return res;
}
