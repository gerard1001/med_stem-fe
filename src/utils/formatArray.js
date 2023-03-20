import { BsThreeDots } from 'react-icons/bs';
import { Box } from '@mui/material';
import { format } from 'date-fns';

const formatArray = (donne) => {
  const currentDate = new Date();

  const formattedDate = (date) => {
    return `${date.getDate().toString().padStart(2, '0')}-${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, '0')}-${date.getFullYear()}`;
  };
  const result = donne?.map(
    ({
      client_id,
      id_number,
      first_name,
      gender,
      birth_date,
      last_name,
      appointments
    }) => {
      const sortedTodos = appointments?.slice()?.sort((a, b) => {
        const dateA = new Date(
          format(new Date(a.work_day.date), 'dd-MM-yyyy')
            ?.split('-')
            .reverse()
            .join('-')
        );
        const dateB = new Date(
          format(new Date(b.work_day.date), 'dd-MM-yyyy')
            ?.split('-')
            .reverse()
            .join('-')
        );
        return dateA - dateB;
      });

      const prevTodo = sortedTodos
        .filter(({ work_day }) => {
          const todoDate = new Date(
            format(new Date(work_day.date), 'dd-MM-yyyy')
              .split('-')
              .reverse()
              .join('-')
          );
          return todoDate < currentDate;
        })
        .pop();

      const nextTodo = sortedTodos.filter(({ work_day }) => {
        const todoDate = new Date(
          format(new Date(work_day.date), 'dd-MM-yyyy')
            .split('-')
            .reverse()
            .join('-')
        );
        return todoDate > currentDate;
      })[0];

      return {
        client_id,
        id: id_number,
        firstName: first_name,
        lastName: last_name,
        gender,
        birthDate: formattedDate(new Date(birth_date)),
        prevAppointments: prevTodo
          ? format(new Date(prevTodo.work_day.date), 'dd/MM/yyyy')
          : '...',
        nextAppointments: nextTodo
          ? format(new Date(nextTodo.work_day.date), 'dd/MM/yyyy')
          : '...'
      };
    }
  );

  return result;
};

export default formatArray;
