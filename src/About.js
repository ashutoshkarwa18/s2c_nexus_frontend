import React from "react";
import SideNav from "./components/company/dashboard/sideNav";
import Navbar from "./components/company/dashboard/navBar.js";

const About = () => {
  return (
    <>
      <SideNav />
      <Navbar />
      <div className=" min-h-screen ml-2 mt-2">
        <div className=" container mx-auto py-8">
          <h1 className=" text-3xl text-center ml-1 font-bold mb-4">
            ABOUT US
          </h1>
          <p className="text-gray-800 text-center">
            Welcome to our website! We are your gateway to success, connecting
            talented individuals with their dream careers. Our placement portal
            offers personalized opportunities, expert guidance, and a seamless
            job-seeking experience. Join us to take the next step towards a
            fulfilling and prosperous future
          </p>
        </div>
      </div>

      <div className="bg-gray-100 mx-8 text-center">
        <h1 className="text-2xl mt-6 ml-1 font-bold mb-3">ADMIN</h1>
        <p className="text-gray-800 text-justify">
          In our platform, the administrator gains access through a secure
          username and password login. Upon successful authentication, they gain
          access to a comprehensive dashboard displaying detailed information
          about students across various courses and departments. From this
          dashboard, the administrator can efficiently review and approve
          application forms, track the list of placed students, and manage
          training details. Additionally, the administrator plays a vital role
          in maintaining records of students' attempts and offer letters, while
          also providing valuable training to prepare them for upcoming
          recruitment drives.
        </p>
      </div>

      <div className=" mx-8 text-center">
        <h1 className="text-2xl mt-6 ml-1 font-bold mb-3">COMPANY</h1>
        <p className="text-gray-800 text-justify">
          Companies can easily register on the portal, initiating their
          engagement with the recruitment process. The Company Module enables
          companies to create drives by providing essential details such as
          Eligibility criteria, Required skills, and the Job role. Companies can
          efficiently view the list of students who have applied for their
          drives, allowing them to accept or reject applications based on
          qualification criteria. The module facilitates companies in conducting
          online exams and interviews seamlessly through our portal for the
          selected students. Upon finalizing the selection process, companies
          can effortlessly send offer letters to the chosen students via email,
          extending job opportunities in a streamlined manner.
        </p>
      </div>

      <div className="bg-gray-100 mx-8 text-center mb-2">
        <h1 className="text-2xl mt-6 ml-1 font-bold mb-3">STUDENT</h1>
        <p className="text-gray-800 mb-4 text-justify">
          Students can sign up and create their accounts on the platform
          effortlessly, unlocking access to a wealth of opportunities. Upon
          logging in, students can conveniently craft professional resumes by
          completing the resume application form, including personal and
          educational details. Students have the ability to register for
          specific drives posted by companies, gaining valuable insights into
          available job prospects. The platform empowers students to track and
          manage all their drive applications, providing clear visibility of
          scheduled exams or interviews required to qualify for desired job
          roles.
        </p>
      </div>
    </>
  );
};

export default About;
