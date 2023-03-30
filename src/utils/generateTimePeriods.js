export const getTimePeriods = (startingHour, endingHour, duration) => {
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

export const getDatesInRange = (startDate, endDate) => {
  const date = new Date(startDate.getTime());

  const dates = [];

  while (date <= endDate) {
    dates.push(new Date(date).toDateString());
    date.setDate(date.getDate() + 1);
  }

  return dates;
};
