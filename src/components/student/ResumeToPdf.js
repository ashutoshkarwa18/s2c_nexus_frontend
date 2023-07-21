import React, { useRef, useState, useEffect } from "react";
import html2pdf from "html2pdf.js";
import "tailwindcss/tailwind.css";

function ResumePDF({ data }) {
  useEffect(() => {
    let student = JSON.parse(localStorage.getItem("activeStudentData"))
    console.log(student)
    setStudentData(student)
  }, [])
  const [studentData, setStudentData] = useState({})
  const ref = useRef();

  function handleDownload() {
    const opt = {
      margin: 0.2,
      filename: "resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 1 },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };
    html2pdf().set(opt).from(ref.current).save();
  }

  return (
    <>
      {/* <h3 class="inline-flex items-baseline justify-between w-full mb-3 align-top border-b-4"></h3> */}
      {studentData.personalDetails ? 
      <div
        ref={ref}
        class="max-w-5xl p-3 mx-auto my-auto bg-gray-100 border-2 border-gray-500 print:border-0 page print:max-w-screen print:max-h-screen print:mx-0 print:my-o lg:h-letter md:max-w-letter md:h-letter xsm:p-8 sm:p-9 md:p-6 lg:mt-4 rounded-md print:bg-white"
      >
        <div class="block w-full">
          {/* <div class="relative w-16 h-16">
            <img
              class="rounded-full border border-gray-100 shadow-sm"
              src="https://randomuser.me/api/portraits/women/81.jpg"
              alt="user image"
            />
            <div class="absolute top-0 right-0 h-4 w-4 my-1  z-2"></div>
          </div> */}
          <h1 class="mb-0 text-xl font-bold text-gray-750">{studentData.personalDetails.name}</h1>
          <h2 class="m-0 ml-2 text-md font-semibold text-gray-700 leading-snugish">
            Full Stack Web Developer
          </h2>
          <div class="flex justify-start w-full">
            <h3 class="m-0 mt-1 ml-2 font-md text-sm text-gray-550 leading-snugish">
            {studentData.personalDetails.address}
            </h3>
            <h2 class="m-0 mt-1 ml-2 font-md text-sm text-gray-550 leading-snugish mx-2">
              |
            </h2>
            <h3 class="m-0 mt-1 ml-2 font-md text-sm text-gray-550 leading-snugish">
            {studentData.credentials.email}
            </h3>
            <h2 class="m-0 mt-1 ml-2 font-md text-sm text-gray-550 leading-snugish mx-2">
              |
            </h2>
            {/* <h3 class="m-0 mt-1 ml-2 font-md text-sm text-gray-550 leading-snugish">
              {}LinkedIn
            </h3>
            <h2 class="m-0 mt-1 ml-2 font-md text-sm text-gray-550 leading-snugish mx-2">
              |
            </h2> */}
            <h3 class="m-0 mt-1 ml-2 font-md text-sm text-gray-550 leading-snugish">
              {}{studentData.personalDetails.mobileNumber}
            </h3>
          </div>
          <h1 class=" items-baseline mt-1 justify-between w-full  align-top border-b-4"></h1>
        </div>

        {/* <div className="container flex-col items-center p-2 " >
      <h1 className="text-3xl font-bold">Resume</h1>
      <div className="w-full bg-white rounded-lg p-6 shadow-lg">
      <div className="flex justify-center items-center mb-2">
          <img src="" alt="Profile" className="w-32 h-32 rounded-full" />
        </div> */}

        {/* Education*/}
        <div>
          <h2 className="text-md font-bold italic">Education</h2>
          <div className="mt-0">
            <span className="text-sm font-md">
              {" "}
              Ramrao Adik Institute of Technology - Bachelor of Science in
              Computer Science (2013 - 2017)
            </span>
            {/* <p className="text-lg">{resumeData.name}</p> */}
          </div>

          <div className="mt-0">
            <span className="text-sm font-md">
              {" "}
              St. John Junior College - Science (2011 - 2013)
            </span>
          </div>

          <div className="mt-0">
            <span className="text-sm font-md">
              {" "}
              National English School (2011)
            </span>
            <h3 class="items-baseline justify-between mt-2 w-full mt-0.5 align-top border-b-4"></h3>{" "}
          </div>
        </div>

        {/* PROFESSIONAL EXPERIENCE   */}
        <div>
          <h2 className="text-md font-bold italic">
            Professional Experience/ Internships
          </h2>
        </div>
        {studentData.experienceDetails  && studentData.experienceDetails.map(exp=> (
          <div className="mt-0">
          <span className="text-md font-semibold text-gray-600">{exp.organisation}-{exp.position}</span>
          <ul class="list-disc ml-4  text-sm">
            <li>
              {exp.workDescription}
            </li>
            {/* <li>
              Technologies used: Pythons GUI package Tkinter, MySQL, Pandas,
              Numpy, Matplotlib, Seaborn.
            </li> */}
          </ul>
          {/* <p className="text-lg">{resumeData.name}</p> */}
        </div>
        ))}

        {/* Academic Projects*/}
        <div>
          <h2 className="text-md font-bold italic">Academic Projects</h2>
        </div>
        {studentData.projectDetails  && studentData.projectDetails.map(project=> (
          <div className="mt-0">
          <span className="text-md font-semibold text-gray-600"> {project.name}</span>
          <ul class="list-disc ml-4  text-sm">
            <li>
              {project.description}
            </li>
            {/* <li>
              Technologies used: Pythons GUI package Tkinter, MySQL, Pandas,
              Numpy, Matplotlib, Seaborn.
            </li> */}
          </ul>
          {/* <p className="text-lg">{resumeData.name}</p> */}
        </div>
        ))}

        {/* <div className="mt-1">
          <span className="text-md font-semibold text-gray-600"> PawPet</span>
          <ul class="list-disc ml-4 text-sm">
            <li>
              Developed “Personal Planner” a web application that was
              effectively created to aid in task planning and organization by
              viewing or deleting existing ones. The user can also conduct data
              analysis.
            </li>
            <li>
              Technologies used: Pythons GUI package Tkinter, MySQL, Pandas,
              Numpy, Matplotlib, Seaborn.
            </li>
          </ul>
          <h3 class="items-baseline justify-between mt-2 w-full mt-0.5 align-top border-b-4"></h3>
        </div> */}

        {/* Technical skills */}
        <div>
          <h2 className="text-md font-bold italic">Technical Skills</h2>
          <div class="px-6 pt-2 pb-2">
            {studentData.academicDetails.technicalSkills  && studentData.academicDetails.technicalSkills.map(skill=>(
              <span class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-1">
              {skill}
            </span>
            ))}
          </div>
          <h3 class="items-baseline justify-between  w-full mt-0.5 align-top border-b-4"></h3>
        </div>

        {/* Certification and Extra curricular */}
        <div>
          <h2 class="text-md font-bold italic">
            Certification and Extra-curricular
          </h2>

          <ul className="list-disc text-sm list-inside">
          {studentData.academicDetails.certifications  && studentData.academicDetails.certifications.map(certification=>(
            <li>{certification.certificationName} - {certification.certificationYear}</li>
          ))}            
        </ul>
        </div>
      </div>
      :
      null}

      <button class="ml-10 mt-4 inline-block px-6 py-3 bg-[#0f172a] text-white font-medium text-xs uppercase rounded shadow-md hover:bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 ... hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
        onClick={handleDownload}>
        Download PDF
      </button>
    </>
  );
}

export default ResumePDF;
