import React from 'react';

const Footer = () => (
  <div className="bg-[#E8ECFC]">
    <div className="flex md:flex-col md:justify-start md:items-start md:w-fit  mx-auto md:gap-10 flex-row items-start justify-evenly p-10 text-[16px]">
      <div>
        <h1 className="text-primary text-xl font-bold mb-5">MedStem</h1>
        <p className="text-[#6A6F75]">
          Medstem provides <br /> consultation services with <br /> Qualified
          Doctors
        </p>
      </div>
      <div className="flex flex-row  md:flex-col items-start md:justify-start justify-between gap-10">
        <div>
          <h1 className="text-primary font-semibold mb-5">About Company</h1>
          <ul className="text-[#6A6F75]">
            <li>Company</li>
            <li>Find a doctor</li>
            <li>Our services</li>
            <li>Locations</li>
          </ul>
        </div>
        <div>
          <h1 className="text-primary font-semibold mb-5">Help & Support</h1>
          <ul className="text-[#6A6F75]">
            <li>Consultation call</li>
            <li>Help / Support</li>
            <li>Sign In</li>
            <li>Appointment</li>
          </ul>
        </div>
      </div>
      <div>
        <h1 className="text-primary font-semibold mb-5">
          Subscribe to Newsletter
        </h1>
        <div className="flex flex-col items-center gap-5 text-md">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            className="w-[240px] rounded-xl border bg-[#E8ECFC] border-primary py-1 indent-4"
          />
          <input
            type="submit"
            value="Submit"
            className="w-[240px] rounded-xl text-white bg-primary py-1"
          />
        </div>
      </div>
    </div>
  </div>
);

export default Footer;
