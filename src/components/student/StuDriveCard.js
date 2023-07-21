import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import logo from '../../images/logos.png'
// import DriveForm from "./CreateDriveForm";


export default function StuDriveCard(props) {
    // useEffect(() => {
    //     axios.get('http://localhost:8080/company/driveInfo', {
    //       params: {
    //         driveId: props.driveData._id
    //       }
    //     })
    //       .then((response)=> {
    //         if (response.data.success) {
    //             setDriveData=response.data.drive[0]
    //           console.log(response.data.drive[0])
    //         } else {
    //           console.log(response.data.message)
    //         }
    //         console.log(response)
    //       })
    //   },[])

      // const [driveData,setDriveData]=useState({

      // })

  const navigate = useNavigate()
  const handleDriveCardClick = () => {
    localStorage.setItem('activeDriveId', props.driveData._id)
    navigate("/studentDriveInfo") 
  }
  
  return (
    
    
    <div class=" mt-10   max-w ">
    <div onClick={handleDriveCardClick} class="h-40 hover:scale-105 md:h-auto hover:cursor-grab duration-500 flex flex-col ml-40 mr-40  md:flex-row md:max-w-4xl rounded-lg bg-white shadow-lg group block max-w-xs mx-auto  r  hover:bg-[#edecec] ">
      <img
        class="mx-2 my-4 md:w-48 rounded-lg md:rounded-none md:rounded-lg"
        src={logo}
        
        alt=""
      />
      <div class="p-6 flex flex-col justify-start w-full">
        <h5 class="text-gray-900 text-xl font-medium">{props.driveData.driveName}</h5>
        <div class="flex justify-start w-full">
          <h2 class= "text-sm mx-1">{props.driveData.jobRole}</h2>
          <h2 class= "text-sm mx-1">|</h2>
          <h2 class="text-sm mx-1">{props.driveData.jobLocation}</h2>
        </div>
        <div class="flex justify-start  w-1/2">
          {/* <h2 class="inline-block bg-gray-200 rounded-full my-4 px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-8">Python</h2> */}
          {props.driveData.skillsRequired.map(skill=>(
            <h2 class="border-2 bg-gray-200 border-grey rounded-md my-4 mr-2 px-2">{skill}</h2>
          ))}
        </div>
        <div class="flex justify-between w-4/5 mb-1">
        <div class="flex justify-start w-full mb-1">
          <h2 class="text-md text-gray-600 mr-4">CTC Offered:</h2>
          <h2 class="text-md text-gray-800">{props.driveData.ctcOffered}</h2>
        </div>
          <h2 class= "text-md mx-1">|</h2>
        <div class="flex justify-start  w-full ml-10">
          <h2 class="text-md text-gray-600 mr-4 ">Job Type:</h2>
          <h2 class="text-md text-gray-800">{props.driveData.jobType}</h2>
        </div>
        </div>
        {/* <div class="mt-4">
          {props.data.jobDescription}
        </div> */}
        
        
        <div class="flex flex-row flex-right  justify-between ">
        {/* <button
        type="button"
        class="ml-80 px-6 py-3 bg-[#0f172a] text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 ... hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
      >
        View Details
      </button> */}
          <button
            type="button"
            class=" ml-96 mt-4 inline-block px-6 py-3 bg-[#0f172a] text-white font-medium text-xs uppercase rounded shadow-md hover:bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 ... hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  </div>
      
    
  );
}