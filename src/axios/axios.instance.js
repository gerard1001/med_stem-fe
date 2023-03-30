/* eslint-disable prettier/prettier */
/* eslint-disable no-useless-concat */
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.BACKEND_URL
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (request) => {
    // Do something before request is sent
    request.headers.authorization = `${'Bearer' + ' '}${
      JSON.parse(localStorage.getItem('userLoginData'))?.token
    }`;
    return request;
  },
  (error) =>
    // Do something with request error

    /* istanbul ignore next */
    Promise.reject(error)
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) =>
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    response,
  /* istanbul ignore next */
  (error) => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    /* istanbul ignore next */
    if (error.response.status === 401) {
      localStorage.removeItem('userLoginData');
      window.location.href = '/login';
    }
    /* istanbul ignore next */
    return Promise.reject(error);
  }
);

export default axiosInstance;

// const slots = {
//   '03-12-2023': ['1-2', '2-3', '3-4'],
//   '03-13-2023': ['4-5', '2-3', '5-6'],
//   '03-14-2023': ['8-9', '7-8', '9-10'],
//   '03-15-2023': ['6-7', '10-11', '11-12']
// };
// const days = [
//   {
//     _id: '2247',
//     date: '03-12-2023',
//     from: '09:00',
//     to: '15:00',
//     schedule_id: '0037',
//     doctor_id: '7709'
//   },
//   {
//     _id: '2283',
//     date: '03-13-2023',
//     from: '08:00',
//     to: '18:00',
//     schedule_id: '0091',
//     doctor_id: '7787'
//   },
//   {
//     _id: '2215',
//     date: '03-14-2023',
//     from: '08:00',
//     to: '18:00',
//     schedule_id: '0066',
//     doctor_id: '7744'
//   },
//   {
//     _id: '2215',
//     date: '03-15-2023',
//     from: '08:00',
//     to: '18:00',
//     schedule_id: '0066',
//     doctor_id: '7744'
//   },
//   {
//     _id: '2215',
//     date: '03-16-2023',
//     from: '08:00',
//     to: '18:00',
//     schedule_id: '0066',
//     doctor_id: '7744'
//   }
// ];
// const newSlots = {
//   '03-12-2023': {
//     slots: ['1-2', '2-3', '3-4'],
//     day: {
//       _id: '2247',
//       date: '03-12-2023',
//       from: '09:00',
//       to: '15:00',
//       schedule_id: '0037',
//       doctor_id: '7709'
//     }
//   },
//   '03-13-2023': {
//     slots: ['4-5', '2-3', '5-6'],
//     day: {
//       _id: '2247',
//       date: '03-15-2023',
//       from: '09:00',
//       to: '18:00',
//       schedule_id: '0037',
//       doctor_id: '7709'
//     }
//   },
//   '03-14-2023': {
//     slots: ['8-9', '7-8', '9-10'],
//     day: {
//       _id: '2215',
//       date: '03-14-2023',
//       from: '08:00',
//       to: '18:00',
//       schedule_id: '0066',
//       doctor_id: '7744'
//     }
//   },
//   '03-15-2023': {
//     slots: ['6-7', '10-11', '11-12'],
//     day: {
//       _id: '2215',
//       date: '03-15-2023',
//       from: '08:00',
//       to: '18:00',
//       schedule_id: '0066',
//       doctor_id: '7744'
//     }
//   }
// };

// #################################

// for (const day of days) {
//   const slotsKey = day.date;
//   const slotsValue = slots[slotsKey];

//   if (slotsValue) {
//     newSlots[slotsKey] = {
//       slots: slotsValue,
//       day: {
//         _id: day._id,
//         date: day.date,
//         from: day.from,
//         to: day.to,
//         schedule_id: day.schedule_id,
//         doctor_id: day.doctor_id
//       }
//     };
//   }
// }

// const newSlots = {};

// for (const date in slots) {
//   for (let i = 0; i < days.length; i++) {
//     if (days[i].date === date) {
//       newSlots[date] = {
//         slots: slots[date],
//         day: {
//           _id: days[i]._id,
//           date: days[i].date,
//           from: days[i].from,
//           to: days[i].to,
//           schedule_id: days[i].schedule_id,
//           doctor_id: days[i].doctor_id
//         }
//       };
//       break;
//     }
//   }
// }
