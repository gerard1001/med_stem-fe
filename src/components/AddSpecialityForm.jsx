import React from 'react';
import { getDepartmentList } from '../redux/reducers/department.reducer';
import { useSelector, useDispatch } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FiUser } from 'react-icons/fi';
import {
  Typography,
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  ListItemText,
  Select,
  Checkbox,
  FormHelperText,
  TextField,
  Button,
  Box
} from '@mui/material';
import { registerDoctor } from '../redux/reducers/doctor.reducer';

const schema = yup.object().shape({
  department_name: yup.string().required(),
  speciality_name: yup.string().required()
});

const AddSpecialityForm = () => {
  const departments = useSelector((state) => state.department);
  const {
    handleSubmit,
    control,
    formState: { errors },
    trigger,
    reset
  } = useForm({
    resolver: yupResolver(schema)
  });

  const [picture, setPicture] = React.useState({
    file: [],
    filepreview: null
  });
  const [departmentName, setDepartmentName] = React.useState([]);

  const dispatch = useDispatch();

  const department_id = departments?.data?.data
    ?.filter((item) => departmentName.includes(item.department_name))
    .map((item) => item.department_id);

  console.log(department_id, 'department_id');
  console.log(departmentName, 'departmentName');

  React.useEffect(() => {
    dispatch(getDepartmentList());
  }, []);

  const handleInputChange = (e) => {
    setPicture({
      ...picture,
      file: e.target.files[0],
      filepreview: URL.createObjectURL(e.target.files[0])
    });
  };

  const handleUpload = () => {
    document.getElementById('file-input').click();
  };

  let doctorInfo = {};
  doctorInfo.department_id = department_id?.join(', ');
  delete doctorInfo.departmentName;

  const onSubmit = ({
    department_name,
    speciality_name,
    id_number,
    email,
    birth_date,
    gender,
    salary,
    department_id,
    experience_years,
    category,
    cost_per_appointment,
    about,
    education,
    picture
  }) => {
    const formData = new FormData();
    formData.append('department_name', department_name);
    formData.append('speciality_name', speciality_name);
    formData.append('picture', picture);

    dispatch(registerDoctor(formData));
    reset({
      department_name: '',
      speciality_name: '',
      picture: ''
    });
  };

  return (
    <Box>
<<<<<<< HEAD
=======
      {/* <DashboardSideBar /> */}
>>>>>>> b7a3a51 (Dashboard changes)
      <Box className="pt-20 w-[90%] max-w-[900px] mx-auto lg:pl-0 relative pb-10 min-h-[70vh]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Typography
            variant="h6"
            sx={{ mb: '20px' }}
            className="lg:text-center"
          >
            Add Doctor
          </Typography>
          <Typography
            variant="subtitle1"
            fontWeight="600"
            className="lg:text-center"
          >
            Personal Information
          </Typography>
          <Box
            spacing={2}
            className="flex flex-row items-center justify-evenly md:flex-col w-[100%]"
          >
            <Box className="flex flex-col gap-4 w-[70%] md:w-full md:max-w-[400px] p-2 border-box">
              <Box className="w-[100%] min-w-[220px]">
                <Controller
                  name="department_name"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Name"
                      variant="outlined"
                      sx={{ width: '100%', maxWidth: '400px' }}
                      size="small"
                      error={!!errors.department_name}
                      helperText={errors.department_name?.message}
                    />
                  )}
                />
              </Box>
              <Box className="w-[100%] min-w-[220px]">
                <Controller
                  name="speciality_name"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="About"
                      variant="outlined"
                      sx={{ width: '100%', maxWidth: '680px' }}
                      error={!!errors.speciality_name}
                      helperText={errors.speciality_name?.message}
                    />
                  )}
                />
              </Box>
            </Box>
            <Box className="flex flex-col items-center justify-center w-[30%] md:mt-10 md:w-full md:max-w-[400px]">
              <Box>
                <Controller
                  name="picture"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <TextField
                      type="file"
                      id="file-input"
                      sx={{ display: 'none' }}
                      onChange={(e) => {
                        handleInputChange(e);
                        field.onChange(e.target.files[0]);
                      }}
                    />
                  )}
                />
                <Box className="flex flex-col gap-2 items-center w-fit mx-auto">
                  {picture.filepreview !== null ? (
                    <img
                      src={picture.filepreview}
                      alt="UploadImage"
                      className="w-[150px] h-[150px] mx-auto lg:w-[150px] lg:h-[150px] rounded-[50%]"
                    />
                  ) : (
                    <Box className="rounded-[50%] bg-[#e8f0fe] w-[150px] h-[150px] relative">
                      <FiUser className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] text-[30px] mr-0 w-[30px] text-slate-500 mx-auto" />
                    </Box>
                  )}

                  <Button
                    onClick={handleUpload}
                    sx={{
                      color: '#fff',
                      width: { md: '120px', xs: '80px' },
                      color: '#1A4CFF',
                      border: '1px solid #1A4CFF',
                      borderRadius: '20px',
                      marginX: 'auto',
                      ':hover': { backgroundColor: '#a2ccff', border: 'none' }
                    }}
                  >
                    Upload
                  </Button>
                </Box>
              </Box>
              <Box>
                <Button
                  type="submit"
                  sx={{
                    color: '#fff',
                    width: { md: '120px', xs: '80px' },
                    color: '#1A4CFF',
                    border: '1px solid #1A4CFF',
                    borderRadius: '20px',
                    marginTop: '30px',
                    marginX: 'auto',
                    ':hover': { backgroundColor: '#a2ccff', border: 'none' }
                  }}
                >
                  Save
                </Button>
              </Box>
            </Box>{' '}
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default AddSpecialityForm;
