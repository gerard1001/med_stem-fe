import React from 'react';
import HomeNavBar from '../components/HomeNavBar';
import { Box } from '@mui/material';
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

const LandingPage = () => (
  <Box className="bg-white min-h-screen">
    <HomeNavBar />
    <div className="w-[82%] xl:w-[100%] mx-auto bg-white px-4">
      <section className="flex items-center lg:flex-col lg:gap-16 justify-between pt-12 md:pt-0">
        <div className="w-[45%] xl:w-full flex flex-col items-center">
          <div
            className="text-secondary font-bold text-5xl md:text-4xl leading-[1.1]"
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
            <button
              type="button"
              className="text-white bg-[#214ADD] hover:bg-[#456dff] w-[50%] xl:w-[90%] rounded-2xl text-[18px] min-w-[178px] max-w-[280px]  py-3"
            >
              Make appointment
            </button>
            <button
              type="button"
              className="text-[#214ADD] hover:bg-[#d2dbff] hover:border-white w-[50%]  xl:w-[90%] border border-[#214ADD] bg-[#ffffff] rounded-2xl text-[18px] min-w-[178px] max-w-[280px]  py-3"
            >
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
            <div className="text-center max-w-[180px] mx-auto">Dermatology</div>
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
            <div className="text-center max-w-[180px] mx-auto">Cardiology</div>
          </div>
          <div className="h-max rounded-sm">
            <div className="border-[2px] border-[#5550C8] rounded-xl w-[140px] sm:w-[100px] p-3 mx-auto">
              <img src={svg8} alt="" />
            </div>
            <div className="text-center max-w-[180px] mx-auto">Pulmonology</div>
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
        <div className="grid grid-cols-3 mb-10 gap-4">
          <div>
            <h1 className="text-secondary font-bold mb-5">Safety</h1>
            <p>
              All medical services in our clinic are performed by experienced
              staff using modern medical equipment
            </p>
          </div>
          <div>
            <h1 className="text-secondary font-bold mb-5">Comfort</h1>
            <p>
              Attentive and polite staff, large parking area, spacious waiting
              and receiving areas.
            </p>
          </div>
        </div>
      </section>
    </div>
    <Footer />
  </Box>
);

export default LandingPage;
