import { Box, IconButton, Menu, Stack, Typography } from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers';
import clsx from 'clsx';
import { addMonths, format, subMonths } from 'date-fns';
import React, { useRef, useState } from 'react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';

function CalendarMonthYearSelector({
  setViewDate,
  viewDate,
  className,
  ...rest
}) {
  const [anchor, setAnchor] = useState(null);
  const viewDateRef = useRef(viewDate);

  return (
    <Stack direction="row" className={clsx('gap-3', className)} {...rest}>
      <IconButton
        className="p-0"
        onClick={() => {
          setViewDate(subMonths(new Date(viewDate), 1));
        }}
      >
        <MdKeyboardArrowLeft />
      </IconButton>
      <Box>
        <Typography
          className="cursor-pointer"
          onClick={(e) => {
            setAnchor(e.target);
          }}
          noWrap
        >
          {format(new Date(viewDate), 'LLLL yyyy')}
        </Typography>
        <Menu
          anchorEl={anchor}
          open={Boolean(anchor)}
          onClose={() => {
            setViewDate(viewDateRef.current);
            setAnchor(null);
          }}
        >
          <DateCalendar
            views={['month', 'year']}
            value={viewDateRef.current}
            onChange={(date) => {
              viewDateRef.current = date;
              return date;
            }}
          />
        </Menu>
      </Box>
      <IconButton
        className="p-0"
        onClick={() => {
          setViewDate(addMonths(new Date(viewDate), 1));
        }}
      >
        <MdKeyboardArrowRight />
      </IconButton>
    </Stack>
  );
}

export default CalendarMonthYearSelector;
