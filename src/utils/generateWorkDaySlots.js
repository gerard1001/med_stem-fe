import {
  addMinutes,
  format,
  getHours,
  isFuture,
  isToday,
  subMinutes
} from 'date-fns';

export function addSubstractTime(hour, minute, minutesToAdd, operation) {
  hour = parseInt(hour, 10);
  minute = parseInt(minute, 10);
  minutesToAdd = parseInt(minutesToAdd, 10);

  const date = new Date();
  date.setHours(hour);
  date.setMinutes(minute);
  const newDate =
    operation === 's'
      ? subMinutes(date, minutesToAdd)
      : addMinutes(date, minutesToAdd);
  return format(newDate, 'HH:mm');
}

export const generateWorkDaySlots = ({ workDay }) => {
  const slots = [];
  const { from, to, date, appointments } = workDay;
  if (isToday(new Date(date)) || isFuture(new Date(date))) {
    const duration = workDay.schedule.appointment_duration;
    let taken = [];
    appointments.forEach((appointment) => {
      if (appointment.is_canceled) return;
      taken.push(appointment.appointment_period);
    });
    taken = taken.sort((a, b) => (a < b ? -1 : 1));
    const [fromHour, fromMinute] = from.trim().split(':');
    const [toHour, toMinute] = to.trim().split(':');

    const lastSlot = `${addSubstractTime(
      toHour,
      toMinute,
      duration,
      's'
    )} - ${toHour}:${toMinute}`;
    let currentSlot = `${fromHour}:${fromMinute} - ${addSubstractTime(
      fromHour,
      fromMinute,
      duration
    )}`;
    if (isToday(new Date(date))) {
      const Hour = getHours(new Date());
      currentSlot = `${Hour + 1}:00 - ${addSubstractTime(
        Hour + 1,
        '00',
        duration
      )}`;
    }

    while (true) {
      if (currentSlot >= lastSlot) {
        break;
      }
      if (currentSlot === taken[0]) {
        taken.shift();
      } else {
        slots.push(currentSlot);
      }
      if (currentSlot.split(' - ')[1] === '13:00') {
        currentSlot = `14:00 - ${addSubstractTime(14, 0, duration)}`;
      } else {
        const slotLastPart = currentSlot.split('-')[1].trim();
        const splitLastSlotPart = slotLastPart.split(':');
        currentSlot = `${slotLastPart} - ${addSubstractTime(
          splitLastSlotPart[0],
          splitLastSlotPart[1],
          duration
        )}`;
      }
    }
  }

  return slots;
};


export const generateWorkDaysSlots = ({ workDays, setSlots }) => {
  const workDaysSlots = {};
  workDays?.forEach((workDay) => {
    const { date } = workDay;
    workDaysSlots[format(new Date(date), 'yyyy-MM-dd')] = generateWorkDaySlots({
      workDay
    });
  });
  setSlots(workDaysSlots);
};
