import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Menu, Stack, styled, Typography } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import { format } from 'date-fns';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';

const StyledDatePicker = styled(({ error, helperText, ...props }) => (
  <DatePicker
    slotProps={{
      openPickerButton: { fontSize: '8px' },
      textField: {
        error,
        helperText,
        size: 'small',
        // onKeyDown: (e) => e.preventDefault(),
        sx: {
          position: 'relative',
          maxWidth: '250px',
          '& .MuiOutlinedInput-root': { borderRadius: '6px' }
        }
      }
    }}
    {...props}
  />
))(() => ({}));

const schema = yup.object().shape({
  from: yup
    .date()
    .typeError('Invalid Date')
    .required('The starting date is required'),
  to: yup
    .date()
    .typeError('Invalid Date')
    .required('The Ending date is required')
    .test(
      'is-greater',
      'Ending date must be greater than starting date',
      function (value) {
        const { from } = this.parent;
        return from && value > from;
      }
    )
});
const defaultValues = {
  from: null,
  to: null
};

const SelectDateRangeMenu = ({
  selectPeriodRef,
  selectPeriodOpen,
  setSelectPeriodOpen,
  setSelectedPeriod
}) => {
  const {
    control,
    getValues,
    reset,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm({
    mode: 'all',
    resolver: yupResolver(schema),
    defaultValues
  });

  const handleCancel = () => {
    reset();
    setSelectPeriodOpen(false);
  };
  const handleSelect = ({ from, to }) => {
    setSelectedPeriod([
      format(new Date(from), 'yyyy-MM-dd'),
      format(new Date(to), 'yyyy-MM-dd')
    ]);
    reset();
    setSelectPeriodOpen(false);
  };

  return (
    <Menu
      anchorEl={selectPeriodRef.current}
      open={selectPeriodOpen}
      onClose={() => isValid && setSelectPeriodOpen(false)}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right'
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      MenuListProps={{
        disablePadding: true
      }}
    >
      <Box className="flex flex-col divide-y rounded-xl">
        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          className="justify-between items-center gap-5 p-4"
        >
          <Typography className="text-[20px] whitespace-nowrap leading-none text-dark font-semibold grow">
            Select Period
          </Typography>
          <Stack direction="row" className="gap-2">
            <Button
              variant="text"
              className="bg-[#EEF1F5] px-[10px] py-[5px] rounded-md h-max"
              onClick={handleSubmit(handleCancel)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              className="bg-[#4C79A8] px-[10px] py-[5px] rounded-md h-max"
              onClick={handleSubmit(handleSelect)}
            >
              Select
            </Button>
          </Stack>
        </Stack>
        <Box className="flex flex-col p-4 gap-4">
          <Stack direction="column">
            <Typography
              component="label"
              htmlFor="from"
              className="font-[18px] mb-2 w-full"
            >
              From
            </Typography>
            <Controller
              control={control}
              name="from"
              render={({ field }) => (
                <StyledDatePicker
                  error={!!errors.from}
                  helperText={errors.from && errors.from.message}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {/* <DatePicker
                slotProps={{
                  textField: { size: 'small', sx={{
                
                  }} }
                }}
              /> */}
          </Stack>
          <Stack>
            <Typography
              component="label"
              htmlFor="from"
              className="font-[18px] mb-2 w-full"
            >
              To
            </Typography>
            <Controller
              control={control}
              name="to"
              render={({ field }) => (
                <StyledDatePicker
                  error={!!errors.to}
                  helperText={errors.to && errors.to.message}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />
            {/* <DatePicker
                slotProps={{
                  textField: { size: 'small', className: 'rounded-sm' }
                }}
              /> */}
          </Stack>
        </Box>
      </Box>
    </Menu>
  );
};

export default SelectDateRangeMenu;
