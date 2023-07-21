import React, {useEffect, useState} from 'react';
import AdminSideNav from "./AdminSideNav";
import AdminNavbar from "./AdminNavbar";
import axios from 'axios';

const AdminDriveInfo = () => {
    useEffect(() => {
        axios.get('http://localhost:8080/company/driveInfo', {
          params: {
            driveId: localStorage.getItem("activeAdminDriveId")
          }
        })
          .then((response) => {
            if (response.data.success) {
                setDriveData(response.data.drive[0])
                setSkillsRequired(response.data.drive[0].skillsRequired.toString())
                setJobLocation(response.data.drive[0].jobLocation.toString())
                setPreferredBranches(response.data.drive[0].branchesPreferred.toString())
            } else {
              console.log(response.data.message)
            }
          })
          .catch(function (error) {
            console.log(error);
          })
      }, [])
    
      const [driveData, setDriveData] = useState({})
      const [skillsRequired, setSkillsRequired] = useState("")
      const [jobLocation, setJobLocation] = useState("")
      const [preferredBranches, setPreferredBranches] = useState("")
    return (
        
<div>
        <div>
            <AdminNavbar/>
            <AdminSideNav/>

            <header class="card-header ">
                <p class="card-header-title text-3xl font-semibold mt-5">
                    <span class="icon"><i class="mdi mdi-account-multiple"></i></span>
                    Drive Information
                </p>
            </header>
        </div>
  
      <div class="container mx-auto my-1 p-5">
        <div class="md:flex no-wrap md:-mx-2 ">

          <div class="w-full md:w-3/12 md:mx-2">

            <div class="bg-white p-3 border-t-4 border-green-400">
              <h1 class="text-gray-900 font-bold text-xl leading-8 my-1">{driveData.driveName}</h1>
              <p class="text-sm text-gray-500 hover:text-gray-600 leading-6">{driveData.jobDescription}</p>
                <ul
                class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                <li class="flex items-center py-3">
                  <span>Drive Status</span>
                  <span class="ml-auto"><span
                    class="bg-green-500 py-1 px-2 rounded text-white text-sm">Active</span></span>
                </li>

              </ul>
            </div>
          </div>
          
          
          <div class="w-full md:w-9/12 mx-2">

              <div class="bg-white p-3 shadow-sm rounded-sm">
                <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                  <span clas="text-green-500">
                    <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                      stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </span>
                  <span class="tracking-wide">About</span>
                </div>
                <div class="text-gray-700">
                  <div class="grid md:grid-cols-2 text-sm">
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">Job Role</div>
                      <div class="px-4 py-2">{driveData.jobRole}</div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">Job Type </div>
                      <div class="px-4 py-2">{driveData.jobType}</div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">10th Percentage/CGPA</div>
                      <div class="px-4 py-2">{driveData.tenthPercentage}%</div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">12th Percentage/CGPA</div>
                      <div class="px-4 py-2">{driveData.twelfthPercentage}%</div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">BE CGPA</div>
                      <div class="px-4 py-2">{driveData.cgpa}</div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">BE CGPA in Percentage</div>
                      <div class="px-4 py-2">{driveData.cgpaInPercentage}%</div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">No. of Live KT</div>
                      <div class="px-4 py-2">{driveData.numberOfDeadKT}</div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">No. of Dead KT</div>
                      <div class="px-4 py-2">{driveData.numberOfDeadKT}</div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">No. of Academic Gaps</div>
                      <div class="px-4 py-2">{driveData.numberOfAcademicGaps}</div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">No. of Drops during Engineering</div>
                      <div class="px-4 py-2">{driveData.numberOfDegreeGaps}</div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">Required Skills</div>
                      <div class="px-4 py-2">{skillsRequired}</div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">CTC Offered</div>
                      <div class="px-4 py-2">{driveData.ctcOffered}</div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">Job Location</div>
                      <div class="px-4 py-2">{jobLocation}</div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">Passing Year</div>
                      <div class="px-4 py-2">
                        <a class="text-blue-800" href="mailto:jane@example.com">{driveData.batch}</a>
                      </div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">Preferred Branches</div>
                      <div class="px-4 py-2">{preferredBranches}</div>
                    </div>
                  </div>
                </div>
               
              </div>

            </div>
          
        </div>
      </div>
      </div>

    );
};

export default AdminDriveInfo;