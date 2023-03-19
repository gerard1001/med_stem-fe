import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/react';
import { Box, styled } from '@mui/material';
import { forwardRef, useState } from 'react';

const StyledBox = styled(Box)(({ theme }) => ({
  '--fc-border-color': '#EDF0F2',
  minWidth: '700px',
  width: '100%',

  '& .fc table': {
    borderRadius: '6px'
  },
  '& .fc th': {
    textAlign: 'left',
    color: theme.palette.gray.main,
    fontWeight: 400,
    fontSize: '14px',
    '& a': {
      padding: '3px 10px'
    }
  },
  '& .fc-scrollgrid-sync-inner': {
    display: 'flex',
    flexFlow: 'column nowrap'
  },
  '& .fc-daygrid-day-top': {
    height: '100%',
    flexGrow: 1,
    '& a': {
      padding: 0
    }
  },
  '& .fc-daygrid-day-number': {
    width: '100%'
  },
  '& .fc .fc-daygrid-day.fc-day-today': {
    backgroundColor: 'transparent'
  },
  '& .fc-daygrid-day-events': {
    display: 'none',
    height: 0,
    width: 0
  }
}));

const Calendar = forwardRef(({ ...rest }, ref) => {
  return (
    <Box className="w-full overflow-auto">
      <StyledBox>
        <FullCalendar
          firstDay={1}
          aspectRatio={0.8}
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          headerToolbar={false}
          footerToolbar={false}
          fixedWeekCount={false}
          ref={ref}
          eventContent={null}
          events={[]}
          nowIndicatorContent={null}
          {...rest}
        />
      </StyledBox>
    </Box>
  );
});

export default Calendar;
