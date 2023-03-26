const getTimePeriods = (startingHour, endingHour, duration) => {
  const periods = [];
  const [startHour, startMinute] = startingHour?.split(':').map(Number);
  const [endHour, endMinute] = endingHour?.split(':').map(Number);

  let currentHour = startHour;
  let currentMinute = startMinute;

  while (
    currentHour < endHour ||
    (currentHour === endHour && currentMinute <= endMinute)
  ) {
    const isSkippedHour = currentHour === 13;
    if (!isSkippedHour) {
      const periodStart = `${currentHour
        ?.toString()
        .padStart(2, '0')}:${currentMinute?.toString().padStart(2, '0')}`;
      currentMinute += duration;
      if (currentMinute >= 60) {
        currentMinute -= 60;
        currentHour += 1;
      }
      const periodEnd = `${currentHour
        ?.toString()
        .padStart(2, '0')}:${currentMinute?.toString().padStart(2, '0')}`;
      periods.push(`${periodStart} - ${periodEnd}`);
    } else {
      currentHour += 1;
      currentMinute = 0;
    }
  }

  return periods;
};

export default getTimePeriods;

// const varaibleDate = [
//   {
//     appointments: [
//       {
//         appointment_period: '10:00 - 11:00',
//         client: {
//           client_id: 1,
//           first_name: 'Amy',
//           last_name: 'Bond'
//         }
//       },
//       {
//         appointment_period: '08:00 - 09:00',
//         client: {
//           client_id: 1,
//           first_name: 'Bobby',
//           last_name: 'Lashley'
//         }
//       },
//       {
//         appointment_period: '15:00 - 16:00',
//         client: {
//           client_id: 1,
//           first_name: 'Cynthia',
//           last_name: 'Cole'
//         }
//       }
//     ]
//   }
// ];

// const slots = [
//   '08:00 - 09:00',
//   '09:00 - 10:00',
//   '10:00 - 11:00',
//   '11:00 - 12:00',
//   '12:00 - 13:00',
//   '13:00 - 14:00',
//   '14:00 - 15:00',
//   '15:00 - 16:00',
//   '15:00 - 17:00',
//   '17:00 - 18:00'
// ];

// result = [
//   { '08:00 - 09:00': 'Bobby Lashley' },
//   { '09:00 - 10:00': null },
//   { '10:00 - 11:00': 'Amy Bond' },
//   { '11:00 - 12:00': null },
//   { '12:00 - 13:00': null },
//   { '13:00 - 14:00': null },
//   { '14:00 - 15:00': null },
//   { '15:00 - 16:00': 'Cynthia cole' },
//   { '15:00 - 17:00': null },
//   { '17:00 - 18:00': null }
// ];
