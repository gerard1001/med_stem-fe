import React from 'react';
import HomeNavBar from '../components/HomeNavBar';
import Footer from '../components/Footer';
import img1 from '../../public/assets/image 1.png';
import img2 from '../../public/assets/image 2.png';
import img3 from '../../public/assets/image 3.png';
import img4 from '../../public/assets/image 4.png';
import img5 from '../../public/assets/image 5.png';
import svg1 from '../../public/assets/Vector.svg';
import svg2 from '../../public/assets/Vector-1.svg';
import svg3 from '../../public/assets/Vector-2.svg';
import svg4 from '../../public/assets/Vector-3.svg';
import svg5 from '../../public/assets/Vector-4.svg';
import svg6 from '../../public/assets/Vector-5.svg';
import svg7 from '../../public/assets/Vector-6.svg';
import svg8 from '../../public/assets/Vector-7.svg';

const LandingPage = () => {
  return (
    <div className="bg-white min-h-screen">
      <HomeNavBar />
      <div className="w-[82%] xl:w-[100%] mx-auto bg-white px-4">
        <section className="flex items-center lg:flex-col lg:gap-16 justify-between pt-[180px] md:pt-20">
          <div className="w-[45%] xl:w-full flex flex-col items-center">
            <div
              className="text-secondary font-bold text-6xl md:text-4xl leading-[1.1]"
              style={{
                textShadow:
                  '0 0 10px #214add25, 0 0 20px #214add25, 0 0 30px #214add25, 0 0 40px #214add25,0 0 50px #214add25'
              }}
            >
              We help patients <br /> live a healthy,
              <br /> longer life
            </div>
            <div className="text-[#081c63b7] my-5">
              Our skilled doctors have tremendous experience <br /> with wide
              range of disease to serve the needs of <br /> our patients
            </div>
            <div className="w-fit max-w-[300px] mb-10 hidden md:inline-block">
              <img src={img1} alt="" />
            </div>
            <div className="flex items-center  xl:flex-col xl:justify-center gap-3 w-[100%]">
              <button className="text-white bg-[#214ADD] hover:bg-[#456dff] w-[50%] xl:w-[90%] rounded-2xl text-[18px] min-w-[178px] max-w-[280px]  py-3">
                Make appointment
              </button>
              <button className="text-[#214ADD] hover:bg-[#d2dbff] hover:border-white w-[50%]  xl:w-[90%] border border-[#214ADD] bg-[#ffffff] rounded-2xl text-[18px] min-w-[178px] max-w-[280px]  py-3">
                Registration
              </button>
            </div>
          </div>
          <div className="w-[40%] lg:max-w-md xl:w-full md:hidden">
            <img src={img1} alt="" />
          </div>
        </section>
        <section className="mt-[100px]">
          <h1 className="text-primary text-center text-2xl font-medium mb-3 uppercase">
            Services
          </h1>
          <h1 className="text-secondary text-center text-4xl mb-10 font-semibold">
            Find Your yes Services
          </h1>
          <div className="grid grid-cols-4 md:grid-cols-2 gap-1 gap-y-20 md:gap-y-6">
            <div className="h-max rounded-sm">
              <div className="border-[2px] border-[#5550C8] rounded-xl w-[140px] sm:w-[100px] p-3 mx-auto">
                <img src={svg1} alt="" />
              </div>
              <div className="text-center max-w-[180px] mx-auto">
                Allergy and Immunology
              </div>
            </div>
            <div className="h-max rounded-sm">
              <div className="border-[2px] border-[#5550C8] rounded-xl w-[140px] sm:w-[100px] p-3 mx-auto">
                <img src={svg2} alt="" />
              </div>
              <div className="text-center max-w-[180px] mx-auto">
                Dermatology
              </div>
            </div>
            <div className="h-max rounded-sm">
              <div className="border-[2px] border-[#5550C8] rounded-xl w-[140px] sm:w-[100px] p-3 mx-auto">
                <img src={svg3} alt="" />
              </div>
              <div className="text-center max-w-[180px] mx-auto">
                Gastroenterology
              </div>
            </div>
            <div className="h-max rounded-sm">
              <div className="border-[2px] border-[#5550C8] rounded-xl w-[140px] sm:w-[100px] p-3 mx-auto">
                <img src={svg4} alt="" />
              </div>
              <div className="text-center max-w-[180px] mx-auto">
                Geriartic Medecine
              </div>
            </div>
            <div className="h-max rounded-sm">
              <div className="border-[2px] border-[#5550C8] rounded-xl w-[140px] sm:w-[100px] p-3 mx-auto">
                <img src={svg5} alt="" />
              </div>
              <div className="text-center max-w-[180px] mx-auto">Neurology</div>
            </div>
            <div className="h-max rounded-sm">
              <div className="border-[2px] border-[#5550C8] rounded-xl w-[140px] sm:w-[100px] p-3 mx-auto">
                <img src={svg6} alt="" />
              </div>
              <div className="text-center max-w-[180px] mx-auto">
                Otolaryngology
              </div>
            </div>
            <div className="h-max rounded-sm">
              <div className="border-[2px] border-[#5550C8] rounded-xl w-[140px] sm:w-[100px] p-3 mx-auto">
                <img src={svg7} alt="" />
              </div>
              <div className="text-center max-w-[180px] mx-auto">
                Cardiology
              </div>
            </div>
            <div className="h-max rounded-sm">
              <div className="border-[2px] border-[#5550C8] rounded-xl w-[140px] sm:w-[100px] p-3 mx-auto">
                <img src={svg8} alt="" />
              </div>
              <div className="text-center max-w-[180px] mx-auto">
                Pulmonology
              </div>
            </div>
          </div>
        </section>
        <section className="mt-[100px] flex items-start justify-between">
          <div className="flex flex-col items-start w-[50%] md:w-full">
            <h1 className="text-primary text-center text-2xl font-medium mb-3 uppercase">
              consultation
            </h1>
            <h1 className="text-secondary text-center text-4xl mb-10 font-semibold capitalize">
              Consultation with our <br /> proffessional doctors{' '}
            </h1>
            <div className="w-[40%] hidden md:inline-block md:w-full border-[2px] md:max-w-sm mx-auto mb-10 border-[#0800AF] p-6 rounded-xl">
              <img
                src={img2}
                alt=""
                className="border border-emerald-500 rounded-md"
              />
            </div>
            <p>
              Now you can make an appointment for consultation with your doctor
              anywhere and any time via online booking which makes it easier
            </p>
            <p className="text-center mt-5">Easy online schedule</p>
          </div>
          <div className="w-[40%] border-[2px] border-[#0800AF] p-6 rounded-xl md:hidden">
            <img
              src={img2}
              alt=""
              className="border border-emerald-500 rounded-md"
            />
          </div>
        </section>
        <section className="mt-[100px]">
          <h1 className="text-primary text-center text-2xl font-medium mb-3 uppercase">
            our doctors
          </h1>
          <h1 className="text-secondary text-center text-4xl mb-10 font-semibold">
            Meet our doctors
          </h1>
          <div className="grid grid-cols-3 lg:grid-cols-1 gap-1 gap-y-10">
            <div className="">
              <div className="border-[2px] w-[250px] mx-auto border-[#0800AF] p-6 pb-2 rounded-xl">
                <img
                  src={img3}
                  alt=""
                  className="border border-emerald-500 rounded-lg"
                />
                <div className="text-center text-[16px] mt-2">
                  <h1 className="font-bold">Dr. John Brown</h1>
                  <p className="text-gray-700">pediatrician</p>
                </div>
              </div>
            </div>
            <div className="">
              <div className="border-[2px] w-[250px] mx-auto border-[#0800AF] p-6 pb-2 rounded-xl">
                <img
                  src={img4}
                  alt=""
                  className="border border-emerald-500 rounded-lg"
                />
                <div className="text-center text-[16px] mt-2">
                  <h1 className="font-bold">Dr. Catherine Smith</h1>
                  <p className="text-gray-700">endocrinologist</p>
                </div>
              </div>
            </div>
            <div className="">
              <div className="border-[2px] w-[250px] mx-auto border-[#0800AF] p-6 pb-2 rounded-xl">
                <img
                  src={img5}
                  alt=""
                  className="border border-emerald-500 rounded-lg"
                />
                <div className="text-center text-[16px] mt-2">
                  <h1 className="font-bold">Dr. Maria Bolatova</h1>
                  <p className="text-gray-700">cardiologist</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="mt-[100px]">
          <h1 className="text-primary text-center text-2xl font-medium mb-3 uppercase">
            why choose us
          </h1>
          <h1 className="text-secondary text-center text-4xl mb-10 font-semibold">
            why you should choose us{' '}
          </h1>
          <div className="h-[60vh]"></div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;

// import * as React from 'react';
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import FormControl from '@mui/material/FormControl';
// import { TextField } from '@mui/material';
// import FormHelperText from '@mui/material/FormHelperText';
// import FormLabel from '@mui/material/FormLabel';
// import Button from '@mui/material/Button';
// import Box from '@mui/material/Box';
// import Modal from '@mui/material/Modal';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import * as BsIcons from 'react-icons/bs';
// import * as AiIcons from 'react-icons/ai';
// import * as IoIcons from 'react-icons/io5';
// import { mason } from '../utils/mson';

// export default function ErrorRadios() {
//   const [value, setValue] = React.useState({});
//   const [text, setText] = React.useState({});
//   const [description, setDescription] = React.useState('');
//   const [clickedIdx, setClickedIdx] = React.useState(0);
//   const [showDetails, setShowDetails] = React.useState(false);
//   const [error, setError] = React.useState(false);
//   const [helperText, setHelperText] = React.useState('Choose wisely');
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const [openCreateModal, setOpenCreateModal] = React.useState(false);
//   const open = Boolean(anchorEl);

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleOpenDeleteCycle = (e) => {
//     setAnchorEl(null);
//   };

//   const handleOpenCreateCycle = () => {
//     setOpenCreateModal(true);
//   };

//   const handleCloseCreateModel = () => {
//     setOpenCreateModal(false);
//     setValue('yes');
//   };

//   const handleRadioChange = (event) => {
//     setValue(event.target.value);
//     setHelperText(' ');
//     setError(false);
//   };

//   const handleSubmit = (event, idx) => {
//     event.preventDefault();

//     console.log(event);
//     handleOpenCreateCycle();
//     setText((prev) => ({
//       ...prev,
//       [idx]: event.target.name
//     }));
//   };

//   let variable = [];

//   for (let i = 0; i < Object.keys(text).length; i++) {
//     const obj = {};
//     const pos = Object.keys(text)[i];
//     obj['txt'] = text[pos];
//     obj['descr'] = description[pos] || '';
//     variable.push(obj);
//   }

//   console.log(variable);
//   console.log({ clickedIdx });

//   return (
//     <>
//       {mason.map((values, idx) => {
//         return (
//           <form key={idx}>
//             <FormControl sx={{ m: 3 }} error={error} variant="standard">
//               <FormLabel id="demo-error-radios">{values.info_name}</FormLabel>
//               <RadioGroup
//                 aria-labelledby="demo-error-radios"
//                 name={values.info_name}
//                 value={value[idx]}
//                 onChange={(event) => {
//                   setValue((prev) => ({
//                     ...prev,
//                     [idx]: event.target.value
//                   }));
//                 }}
//               >
//                 <FormControlLabel
//                   value="yes"
//                   control={<Radio />}
//                   type="submit"
//                   label="yes"
//                   onClick={(event) => {
//                     setShowDetails((showDetails) => ({
//                       ...showDetails,
//                       // [idx]: !showDetails[idx]
//                       [idx]: true
//                     }));
//                     setClickedIdx(idx);
//                     setText((prev) => ({
//                       ...prev,
//                       [idx]: event.target.name
//                     }));
//                   }}
//                 />
//                 <FormControlLabel
//                   value="no"
//                   control={<Radio />}
//                   label="no"
//                   onClick={(event) => {
//                     setClickedIdx(idx);
//                     setShowDetails((showDetails) => ({
//                       ...showDetails,
//                       // [idx]: !showDetails[idx]
//                       [idx]: false
//                     }));
//                     delete text[idx];
//                     delete description[idx];
//                   }}
//                 />
//               </RadioGroup>
//               {/* <FormHelperText>{helperText}</FormHelperText> */}
//             </FormControl>
//             {showDetails[idx] && (
//               <Button
//                 onClick={() => {
//                   setClickedIdx(idx);
//                   handleOpenCreateCycle();
//                 }}
//                 color="primary"
//                 sx={{
//                   backgroundColor: '#0093df',
//                   color: '#fff',
//                   textTransform: 'capitalize'
//                 }}
//                 className="hover:bg-black"
//               >
//                 Details
//               </Button>
//             )}
//           </form>
//         );
//       })}

//       <Button onClick={handleOpenCreateCycle}>Click</Button>
//       <Modal
//         open={openCreateModal}
//         onClose={handleCloseCreateModel}
//         aria-labelledby="parent-modal-title"
//         aria-describedby="parent-modal-description"
//       >
//         <Box className="absolute w-[50%] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] md:w-[90%]">
//           <div
//             action=""
//             // onSubmit={createNewCycle}
//             className=" relative w-[100%] rounded-[5px] h-[455px] m-auto p-[10px] pt-[5px] bg-dark-bg bg-[#f0f0f0] "
//           >
//             <h1 className="text-center font-bold text-white text-[22px] m-[20px]">
//               {text[clickedIdx]}
//             </h1>
//             <IoIcons.IoClose
//               className="absolute top-[20px] right-[20px] text-[35px] cursor-pointer"
//               onClick={handleCloseCreateModel}
//             />
//             <hr style={{ marginBottom: '4px' }} />
//             <div>
//               <TextField
//                 variant="outlined"
//                 fullWidth
//                 label="Description"
//                 name="description"
//                 placeholder="Description"
//                 margin="normal"
//                 value={description[clickedIdx]}
//                 onChange={(event) => {
//                   // setDescription(event.target.value);
//                   setDescription((prev) => ({
//                     ...prev,
//                     [clickedIdx]: event.target.value
//                   }));
//                 }}
//                 required
//                 size="small"
//               />
//             </div>
//             <Button
//               onClick={(event) => {
//                 handleCloseCreateModel();
//               }}
//               color="primary"
//               sx={{
//                 backgroundColor: '#0093df',
//                 color: '#fff',
//                 textTransform: 'capitalize',
//                 fontWeight: 'bold'
//               }}
//               className="hover:bg-black mx-auto"
//             >
//               save
//             </Button>
//           </div>
//         </Box>
//       </Modal>
//     </>
//   );
// }
