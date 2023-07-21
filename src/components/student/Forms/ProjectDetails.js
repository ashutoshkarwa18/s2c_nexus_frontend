import React, { useState, useEffect } from 'react'
import axios from 'axios';


export default function ProjectDetails() {
  useEffect(() => {
    axios.get("http://localhost:8080/student/getDetails", {
      params: {
        studentId: localStorage.getItem("activeStudentId")
      }
    }).then(response => {
      var data = response.data.studentData;
      if (data.projectDetails) {
        setProjectData(data.projectDetails)
      }
    }).catch(error => {
      console.log(error)
    })
  }, [])

  const [projectData, setProjectData] = useState([])
  const [projectDetails, setProjectDetails] = useState({
    name: "",
    description: ""
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setProjectDetails(prevValue => ({
      ...prevValue,
      [name]: value
    }))
  }

  const handleAddProject = (e) => {
    e.preventDefault()
    setProjectData(prevValue => (
      [
        ...prevValue,
        projectDetails
      ]
    ))
  }

  const handleProjectDetailsUpdate = (e) => {
    e.preventDefault()
    axios.post('http://localhost:8080/student/updateDetails', {
      studentId: localStorage.getItem("activeStudentId"),
      key: "projectDetails",
      newData: projectData
    })
    .then(function (response) {
      if(response.data.success) {
        alert(response.data.message)
      } else {
        alert(response.data.message)
      }
    })
    .catch(function (error) {
      alert("BACKEND SERVICE UNAVAILABLE");
    })
  }
  return (
    <>
      <div className='font-open-sans overflow-scroll scrollbar-hide h-105 mx-4 shadow-md border-b mb-5 rounded-md'>
        <div className="left-0 my-2 uppercase focus:outline-none border-none 
        bg-[#C2D3E4] border font-bold text-[#1F2937] text-xs  py-1 px-2 ">
          <span>Enter Your Project Details</span></div>
          {projectData.map(project => (
            <div className='mx-5 mt-2 grid grid-cols-2 gap-4'>
            <div class="mb-3 cols-span-1">
              <b>Project Name:</b> {project.name}
            </div>
            <div class="mb-3 cols-span-1">
              <b>Project Description:</b> {project.description}
            </div>
            </div>
          ))}
        <div className='mx-5 mt-2 grid grid-cols-2 gap-4'>
          <div class="mb-0">
            <label for="name" class="block  text-sm font-bold text-[#1F2937]">Project Name</label>
            <input onChange={handleInputChange} name='name' type="text" class="shadow-sm focus:bg-[#C2D3E4] focus:outline-none 
      p-1.5  w-full   bg-gray-50 border border-gray-300 text-[#1F2937]  text-sm rounded-lg" />
          </div>
          <div class="mb-3 col-span-2">
            <label for="description" class="block  text-sm font-bold text-[#1F2937]">Project Details</label>
            <textarea onChange={handleInputChange} name='description' type="text" id="address" class="shadow-sm focus:bg-[#C2D3E4] focus:outline-none 
          p-2.5 w-full bg-gray-50 border border-gray-300 text-[#1F2937]  text-sm rounded-lg" />
          </div>
          <div class="mb-3 cols-span-1">
            <button onClick={handleAddProject} className="mt-2 w-1/2 focus:outline-none bg-[#1F2937] px-1 py-1 rounded-md font-bold text-lg text-[#d1d5db] border">Add Project</button>
          </div>
        </div>
      </div>

      <button onClick={handleProjectDetailsUpdate} className="float-right mr-4 ml-auto focus:outline-none bg-[#1F2937] px-1 py-1 rounded-md font-bold text-lg text-[#d1d5db] w-28 border">Save</button>
    </>

  )
}
