import React, {useState, useEffect} from 'react'
import axios from 'axios'

export default function ExperienceDetails() {
  useEffect(() => {
    axios.get("https://s2cnexus.onrender.com/student/getDetails", {
      params: {
        studentId: localStorage.getItem("activeStudentId")
      }
    }).then(response => {
      var data = response.data.studentData;
      if (data.experienceDetails) {
        setExperienceData(data.experienceDetails)
      }
    }).catch(error => {
      console.log(error)
    })
  }, [])
  const [experienceData, setExperienceData] = useState([])
  const [experienceDetails, setExperienceDetails] = useState({
    position: "",
    duration: "",
    location:  "",
    jobType: "Internship",
    organisation: "",
    workDescription: "",
    startDate: "",
    endDate: ""
  })

  const handleInputChange = e => {
    const {name,value} = e.target
    setExperienceDetails(prevValue => ({
      ...prevValue,
      [name]: value
    }))
  }

  const handleAddExperience = e => {
    e.preventDefault()
    setExperienceData(prevValue => (
      [
        ...prevValue,
        experienceDetails
      ]
    ))
  }

  const handleExperienceDetailsUpdate = e => {
    e.preventDefault()
    axios.post('https://s2cnexus.onrender.com/student/updateDetails', {
      studentId: localStorage.getItem("activeStudentId"),
      key: "experienceDetails",
      newData: experienceData
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
      <span>Enter Your Professional Experience</span></div>
      <div className='mx-5 mt-2 grid grid-cols-2 gap-4'>
        {experienceData.map(experience=> (
          <div class="border cols-span-2 p-2 bg-[#C2D3E4]">
          <div><b>Company:</b> {experience.organisation} - {experience.location}</div>
          <div><b>Position:</b> {experience.position} ({experience.jobType})</div>
          <div><b>Period:</b> {experience.startDate} - {experience.endDate} ({experience.duration} months)</div>
          <div><b>Description:</b> {experience.workDescription}</div>
        </div>
        ))}
      </div>
    <div className='mx-5 mt-2 grid grid-cols-2 gap-4'>
      <div class="mb-0">
        <label for="organisation" class="block  text-sm font-bold text-[#1F2937]">Company Name</label>
        <input onChange={handleInputChange} name='organisation' type="text" class="shadow-sm focus:bg-[#C2D3E4] focus:outline-none 
      p-1.5  w-full   bg-gray-50 border border-gray-300 text-[#1F2937]  text-sm rounded-lg" />
      </div>
      <div class="mb-0">
        <label for="position" class="block  text-sm font-bold text-[#1F2937]">Job Role</label>
        <input onChange={handleInputChange} name='position' type="text" class="shadow-sm focus:bg-[#C2D3E4] focus:outline-none 
      p-1.5  w-full   bg-gray-50 border border-gray-300 text-[#1F2937]  text-sm rounded-lg" />
      </div>
  
      <div class=" cols-span-1">
            <label for="jobType" class="block  text-sm font-bold text-[#1F2937]">Job Type</label>
            <select onChange={handleInputChange} name="jobType" class="shadow-sm focus:bg-[#C2D3E4] focus:outline-none 
          p-1.5  w-full   bg-gray-50 border border-gray-300 text-[#1F2937]  text-sm rounded-lg">
              <option value="Internship">Internship</option>
              <option value="Full-Time">Full Time</option>
            </select>
          </div>
          <div class=" cols-span-1">
            <label for="location" class="block  text-sm font-bold text-[#1F2937]">Job Location</label>
            <input onChange={handleInputChange} name='location' type="text" class=" cursor-pointer shadow-sm focus:bg-[#C2D3E4] focus:outline-none 
          p-1.5  w-full   bg-gray-50 border border-gray-300 text-[#1F2937]  text-sm rounded-lg" />
          </div>
          
          
      <div class="mb-3 col-span-2">
          <label for="workDescription" class="block  text-sm font-bold text-[#1F2937]">Your Role Details</label>
          <textarea onChange={handleInputChange} name='workDescription' type="text" id="address" class="shadow-sm focus:bg-[#C2D3E4] focus:outline-none 
          p-2.5 w-full bg-gray-50 border border-gray-300 text-[#1F2937]  text-sm rounded-lg" />
        </div>
    </div>
    <div className='mx-5 mt-0 grid grid-cols-3 gap-4'>
    <div class="mb-3 cols-span-1">
            <label for="startDate" class="block text-sm font-bold text-[#1F2937]">Start Date</label>
            <input onChange={handleInputChange} name='startDate' datepicker type="date" class="shadow-sm focus:bg-[#C2D3E4] focus:outline-none 
          p-1.5  w-full   bg-gray-50 border border-gray-300 text-[#1F2937]  text-sm rounded-lg" />
          </div>
          <div class="mb-3 cols-span-1">
            <label for="endDate" class="block text-sm font-bold text-[#1F2937]">End Date</label>
            <input onChange={handleInputChange} name='endDate' datepicker type="date" class="shadow-sm focus:bg-[#C2D3E4] focus:outline-none 
          p-1.5  w-full   bg-gray-50 border border-gray-300 text-[#1F2937]  text-sm rounded-lg" />
          </div>
          <div class="mb-3 cols-span-1">
            <label for="duration" class="block text-sm font-bold text-[#1F2937]">Experience in Months</label>
            <input onChange={handleInputChange} name='duration' type="text" class="shadow-sm focus:bg-[#C2D3E4] focus:outline-none 
          p-1.5  w-full   bg-gray-50 border border-gray-300 text-[#1F2937]  text-sm rounded-lg" />
          </div>
          <div class="mb-3 cols-span-1">
            <button onClick={handleAddExperience} className="mt-4 w-1/2 focus:outline-none bg-[#1F2937] px-1 py-1 rounded-md font-bold text-lg text-[#d1d5db] border">Add Experience</button>
          </div>
        </div>
    </div>
    
    
  <button onClick={handleExperienceDetailsUpdate} className="float-right mr-4 ml-auto focus:outline-none bg-[#1F2937] px-1 py-1 rounded-md font-bold text-lg text-[#d1d5db] w-28 border">Save</button>
</>
  )
}
