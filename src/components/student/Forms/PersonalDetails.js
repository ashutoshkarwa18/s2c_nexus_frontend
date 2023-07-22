import { data } from 'autoprefixer'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function PersonalDetails() {  
  const studentId = useSelector(state=> state.identity.studentId)
  useEffect( ()=> {
     axios.get("https://s2c-nexus-3gq5.onrender.com/student/getDetails", {
      params: {
        studentId: localStorage.getItem("activeStudentId")
      }
    }).then(response=> {
      var data = response.data.studentData;
      if(data.personalDetails) {
        setPersonalData(data.personalDetails)
      }
    }).catch(error=>{
      console.log(error)
    })
  }, [])
  
  const [personalData, setPersonalData] = useState({
    name: "",
    dateOfBirth: "",
    identificationNumber: "",
    mobileNumber: "",
    address: ""
  })

  const handleInputChange = (e)=> {
    const {name, value} = e.target
    setPersonalData(prevValue => (
      {
        ...prevValue,
        [name]:value
      }
    ))
  }

  const handlePersonalDetailsUpdate = (e)=> {
    e.preventDefault()
    axios.post('https://s2c-nexus-3gq5.onrender.com/student/updateDetails', {
      studentId: localStorage.getItem("activeStudentId"),
      key: "personalDetails",
      newData: personalData
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
    <div className='overflow-scroll scrollbar-hide h-104 mx-4 shadow-md border-b mb-5 rounded-md '>
      <form className='mx-5 mt-6 grid grid-cols-2 gap-4'>
        <div class="mb-3">
          <label for="name" class="block mb-2 text-md font-bold text-[#1F2937]">Full name</label>
          <input name='name' onChange={handleInputChange} value={personalData.name} type="text" id="name" class="shadow-sm focus:bg-[#C2D3E4] focus:outline-none 
          p-2.5 w-full   bg-gray-50 border border-gray-300 text-[#1F2937]  text-sm rounded-lg" />
        </div>
        <div class="mb-3">
          <label for="date" class="block mb-2 text-md font-bold text-[#1F2937]">Date of Birth</label>
          <input name='dateOfBirth' onChange={handleInputChange} value={personalData.dateOfBirth} datepicker type="date" id="dateOfBirth" class="shadow-sm focus:bg-[#C2D3E4] focus:outline-none 
          p-2.5 w-full   bg-gray-50 border border-gray-300 text-[#1F2937]  text-sm rounded-lg" />
        </div>
        <div class="mb-3">
          <label for="rollnumber" class="block mb-2 text-md font-bold text-[#1F2937]">College Identification Number</label>
          <input name='identificationNumber' onChange={handleInputChange} value={personalData.identificationNumber} type="text" id="identificationNumber" class="shadow-sm focus:bg-[#C2D3E4] focus:outline-none 
          p-2.5 w-full   bg-gray-50 border border-gray-300 text-[#1F2937]  text-sm rounded-lg" />
        </div>
        <div class="mb-3">
          <label for="mobilenumber" class="block mb-2 text-md font-bold text-[#1F2937]">Mobile Number</label>
          <input name='mobileNumber' onChange={handleInputChange} value={personalData.mobileNumber} type="text" id="mobileNumber" class="shadow-sm focus:bg-[#C2D3E4] focus:outline-none 
          p-2.5 w-full   bg-gray-50 border border-gray-300 text-[#1F2937]  text-sm rounded-lg" />
        </div>
        <div class="mb-3 col-span-2">
          <label for="address" class="block mb-2 text-md font-bold text-[#1F2937]">Permanent Address</label>
          <textarea name='address' onChange={handleInputChange} value={personalData.address} type="text" id="address" class="shadow-sm focus:bg-[#C2D3E4] focus:outline-none 
          p-2.5 w-full bg-gray-50 border border-gray-300 text-[#1F2937]  text-sm rounded-lg" />
        </div>
        
      </form>
    </div>
    <button onClick={handlePersonalDetailsUpdate} className="float-right mr-4 ml-auto focus:outline-none bg-[#1F2937] px-1 py-1 rounded-md font-bold text-lg text-[#d1d5db] w-28 border">Save</button>
    </>
  )
}
