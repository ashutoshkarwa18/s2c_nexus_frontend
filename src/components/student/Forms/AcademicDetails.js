import React, { useState, useEffect } from 'react'
import axios from 'axios';

export default function AcademicDetails() {
  useEffect(() => {
    axios.get("http://localhost:8080/student/getDetails", {
      params: {
        studentId: localStorage.getItem("activeStudentId")
      }
    }).then(response => {
      var data = response.data.studentData;
      if (data.academicDetails) {
        setAcademicData(prevValue => ({
          ...prevValue,
          tenthPassingYear: data.academicDetails.tenth.passingYear,
          tenthPassingMarks: data.academicDetails.tenth.marks,
          twelfthPassingYear: data.academicDetails.twelfth.passingYear,
          twelfthPassingMarks: data.academicDetails.twelfth.marks,
          diplomaPassingYear: data.academicDetails.diploma.passingYear,
          diplomaPassingMarks: data.academicDetails.diploma.marks,
          department: data.academicDetails.department,
          degreeCgpa: data.academicDetails.degreeCgpa,
          degreeCgpaInPercentage: data.academicDetails.degreeCgpaInPercentage,
          degreePassingYear: data.academicDetails.degreePassingYear,
          // skills
          academicSkills:data.academicDetails.academicSkills, 
          activeBacklogs: data.academicDetails.activeBacklogs,
          previousBacklogs: data.academicDetails.previousBacklogs,
          academicGap: data.academicDetails.academicGap,
          degreeGap: data.academicDetails.degreeGap,
          certifications: data.academicDetails.certifications
       }))
       setCertifications(data.academicDetails.certifications)
       setTechnicalSkills(data.academicDetails.technicalSkills.toString())
  }
   }).catch (error=> {
  console.log(error.response)
})
 }, [])
const [academicData, setAcademicData] = useState({
  tenthPassingYear: "",
  tenthPassingMarks: "",
  twelfthPassingYear: "",
  twelfthPassingMarks: "",
  diplomaPassingYear: "",
  diplomaPassingMarks: "",
  department: "",
  degreeCgpa: "",
  degreeCgpaInPercentage: "",
  degreePassingYear: "",
  activeBacklogs: "",
  previousBacklogs: "",
  academicGap: "",
  academicSkills:"",
  degreeGap: "",
  certifications: [],
  technicalSkills: []
})

const [semester, setSemester] = useState("");
const [technicalSkills, setTechnicalSkills] = useState("");
const [gpa, SetGpa] = useState("")
const [marksheets, setMarksheets] = useState([]);
const [certificationData, setCertificationData] = useState({})
const [certifications, setCertifications] = useState([])
const [seniorSecondary, setSeniorSecondary] = useState([])

const handleInputChange = (e) => {
  const { name, value } = e.target
  setAcademicData(prevValue => (
    {
      ...prevValue,
      [name]: value
    }
  ))
}

const handleRadioButtonChange = (e) => {
  const { name, value } = e.target
  setSeniorSecondary(name)
}

const handleSkillsChange = e => {
  const {value } = e.target
  setTechnicalSkills(value)
}

const handleFileChange = (e) => {
  const { files } = e.target
  setMarksheets(prevValue => {
    return [
      ...prevValue,
      {
        semester: semester,
        gpa: gpa,
        marksheet: files[0]
      }
    ]
  })
}

const handleDropdown = (e) => {
  const { value } = e.target;
  setSemester(value);
}

const handleGpa = (e) => {
  const { value } = e.target;
  SetGpa(value);
}

const handleAcademicDetailSubmit = (e) => {
  e.preventDefault();
  var payload = {
    tenth: {
      marks: academicData.tenthPassingMarks,
      passingYear: academicData.tenthPassingYear
    },
    twelfth: {
      marks: seniorSecondary == "twelfth" ? academicData.twelfthPassingMarks : "",
      passingYear: seniorSecondary == "twelfth" ? academicData.twelfthPassingYear : ""
    },
    diploma: {
      marks: seniorSecondary == "diploma" ? academicData.twelfthPassingMarks : "",
      passingYear: seniorSecondary == "diploma" ? academicData.twelfthPassingYear : ""
    },
    department: academicData.department,
    degreeCgpa: academicData.degreeCgpa,
    degreeCgpaInPercentage: academicData.degreeCgpaInPercentage,
    degreePassingYear: academicData.degreePassingYear,
    activeBacklogs: academicData.activeBacklogs,
    previousBacklogs: academicData.previousBacklogs,
    academicGap: academicData.academicGap,
    academicSkills: academicData.academicSkills,
    degreeGap: academicData.degreeGap,
    certifications: certifications,
    technicalSkills: technicalSkills.split(",")
  }
  axios.post('http://localhost:8080/student/updateDetails', {
    studentId: localStorage.getItem("activeStudentId"),
    key: "academicDetails",
    newData: payload
  })
    .then(function (response) {
      if (response.data.success) {
        alert(response.data.message)
      } else {
        alert(response.data.message)
      }
    })
    .catch(function (error) {
      alert("BACKEND SERVICE UNAVAILABLE");
    })

}

const handleAddCertification = (e) => {
  e.preventDefault()
  setCertifications(prevValue => (
    [
      ...prevValue,
      certificationData
    ]
  ))
}

const handleCertificationChange = (e) => {
  const { name, value } = e.target
  setCertificationData(prevValue => ({
    ...prevValue,
    [name]: value
  }))
}

return (
  <>
    <div className='font-open-sans overflow-scroll scrollbar-hide h-105 mx-4 shadow-md border-b mb-5 rounded-md'>
      <div className="left-0 my-2 uppercase focus:outline-none border-none 
            bg-[#C2D3E4] border font-bold text-[#1F2937] text-xs  py-1 px-2 ">
        <span>10th details:</span></div>
      <div className='mx-5 mt-2 grid grid-cols-2 gap-4'>
        <div class="mb-3">
          <label for="tenthPassingYear" class="block  text-sm font-bold text-[#1F2937]">Passing Year</label>
          <input value={academicData.tenthPassingYear} name='tenthPassingYear' onChange={handleInputChange} type="text" class="shadow-sm focus:bg-[#C2D3E4] focus:outline-none 
          p-1.5  w-full   bg-gray-50 border border-gray-300 text-[#1F2937]  text-sm rounded-lg" />
        </div>
        <div class="mb-3">
          <label for="tenthPassingMarks" class="block  text-sm font-bold text-[#1F2937]">Percentage/Grades</label>
          <input value={academicData.tenthPassingMarks}  name='tenthPassingMarks' onChange={handleInputChange} type="text" class="shadow-sm focus:bg-[#C2D3E4] focus:outline-none 
          p-1.5  w-full   bg-gray-50 border border-gray-300 text-[#1F2937]  text-sm rounded-lg" />
        </div>
      </div>
      <div className="left-0 my-2 uppercase focus:outline-none border-none 
            bg-[#C2D3E4] border font-bold text-[#1F2937] text-xs  py-1 px-2 ">
        <span>12th/Diploma details:</span></div>
      <div className='mx-5 mt-2 grid grid-cols-3 gap-4'>
        <div class="mb-3 cols-span-1">
          <div className='grid grid-cols-2 gap-4'>
            <div class=" cols-span-1">
              <input checked={seniorSecondary == "twelfth"} name="twelfth" type="radio" onChange={handleRadioButtonChange} />
              <label for="twelfth" class="ml-3 text-sm font-bold text-[#1F2937]">Twelfth</label>
            </div>
            <div class=" cols-span-1">
              <input checked={seniorSecondary == "diploma"} name="diploma" type="radio" onChange={handleRadioButtonChange} />
              <label for="diploma" class="ml-3 text-sm font-bold text-[#1F2937]">Diploma</label>
            </div>
          </div>
        </div>
        <div class="mb-3 cols-span-1">
          <label for="twelfthPassingYear" class="block text-sm font-bold text-[#1F2937]">Passing Year</label>
          <input value={academicData.twelfthPassingYear ? academicData.twelfthPassingYear: academicData.diplomaPassingYear } name='twelfthPassingYear' onChange={handleInputChange} type="text" class="shadow-sm focus:bg-[#C2D3E4] focus:outline-none 
          p-1.5  w-full   bg-gray-50 border border-gray-300 text-[#1F2937]  text-sm rounded-lg" />
        </div>
        <div class="mb-3 cols-span-1">
          <label for="twelfthPassingMarks" class="block  text-sm font-bold text-[#1F2937]">Percentage/Grades</label>
          <input value={academicData.twelfthPassingMarks ? academicData.twelfthPassingMarks: academicData.diplomaPassingMarks } name='twelfthPassingMarks' onChange={handleInputChange} type="text" class="shadow-sm focus:bg-[#C2D3E4] focus:outline-none 
          p-1.5  w-full   bg-gray-50 border border-gray-300 text-[#1F2937]  text-sm rounded-lg" />
        </div>
      </div>
      <div className="left-0 my-2 uppercase focus:outline-none border-none 
            bg-[#C2D3E4] border font-bold text-[#1F2937] text-xs  py-1 px-2 ">
        <span>Degree details:</span>
      </div>
      <div className='mx-5 mt-2 grid grid-cols-3 gap-4'>
        <div class="mb-3 cols-span-1">
          <label for="degreePassingYear" class="block text-sm font-bold text-[#1F2937]">Degree Passing Year</label>
          <input value={academicData.degreePassingYear} name='degreePassingYear' onChange={handleInputChange} type="text" class="shadow-sm focus:bg-[#C2D3E4] focus:outline-none 
          p-1.5  w-full   bg-gray-50 border border-gray-300 text-[#1F2937]  text-sm rounded-lg" />
        </div>
        <div class="mb-3 cols-span-1">
          <label for="department" class="block text-sm font-bold text-[#1F2937]">Department</label>
          <input value={academicData.department} name='department' onChange={handleInputChange} type="text" class="shadow-sm focus:bg-[#C2D3E4] focus:outline-none 
          p-1.5  w-full   bg-gray-50 border border-gray-300 text-[#1F2937]  text-sm rounded-lg" />
        </div>
        <div class=" cols-span-1">
          <label for="degreeCgpa" class="block  text-sm font-bold text-[#1F2937]">BE CGPA</label>
          <input value={academicData.degreeCgpa} name='degreeCgpa' onChange={handleInputChange} type="text" class=" cursor-pointer shadow-sm focus:bg-[#C2D3E4] focus:outline-none 
          p-1.5  w-full   bg-gray-50 border border-gray-300 text-[#1F2937]  text-sm rounded-lg" />
        </div>
        <div class=" cols-span-1">
          <label for="degreeCgpaInPercentage" class="block  text-sm font-bold text-[#1F2937]">BE CGPA in Percentage</label>
          <input value={academicData.degreeCgpaInPercentage} name='degreeCgpaInPercentage' onChange={handleInputChange} type="text" class=" cursor-pointer shadow-sm focus:bg-[#C2D3E4] focus:outline-none 
          p-1.5  w-full   bg-gray-50 border border-gray-300 text-[#1F2937]  text-sm rounded-lg" />
        </div>
        {/* <div class="mb-3 cols-span-1">
            <label for="degreeStartDate" class="block text-sm font-bold text-[#1F2937]">Degree Start Date</label>
            <input name='degreeStartDate' onChange={handleInputChange} datepicker type="date" class="shadow-sm focus:bg-[#C2D3E4] focus:outline-none 
          p-1.5  w-full   bg-gray-50 border border-gray-300 text-[#1F2937]  text-sm rounded-lg" />
          </div>
          <div class="mb-3 cols-span-1">
            <label for="degreeCompletionDate" class="block text-sm font-bold text-[#1F2937]">Degree End Date</label>
            <input name='degreeCompletionDate' onChange={handleInputChange} datepicker type="date" class="shadow-sm focus:bg-[#C2D3E4] focus:outline-none 
          p-1.5  w-full   bg-gray-50 border border-gray-300 text-[#1F2937]  text-sm rounded-lg" />
          </div> */}
        {/* <div class=" cols-span-1">
            <label for="semester" class="block  text-sm font-bold text-[#1F2937]">Semester</label>
            <select onChange={handleDropdown} name="semester" class="shadow-sm focus:bg-[#C2D3E4] focus:outline-none 
          p-1.5  w-full   bg-gray-50 border border-gray-300 text-[#1F2937]  text-sm rounded-lg">
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
              <option value="3">Semester 3</option>
              <option value="4">Semester 4</option>
              <option value="5">Semester 5</option>
              <option value="6">Semester 6</option>
              <option value="7">Semester 7</option>
              <option value="8">Semester 8</option>
            </select>
          </div> */}
        {/* <div class=" cols-span-1">
            <label for="semesterGpa" class="block  text-sm font-bold text-[#1F2937]">BE CGPA</label>
            <input name='semesterGpa' onChange={handleGpa} type="text" class=" cursor-pointer shadow-sm focus:bg-[#C2D3E4] focus:outline-none 
          p-1.5  w-full   bg-gray-50 border border-gray-300 text-[#1F2937]  text-sm rounded-lg" />
          </div> */}
        {/* <div class=" cols-span-1">
            <label for="marksheet" class="block  text-sm font-bold text-[#1F2937]">Upload Marksheet</label>
            <input name='marksheet' onChange={handleFileChange} type="file" class=" cursor-pointer shadow-sm focus:bg-[#C2D3E4] focus:outline-none 
          p-1.5  w-full   bg-gray-50 border border-gray-300 text-[#1F2937]  text-sm rounded-lg" />
          </div> */}
        <div class="mb-3 cols-span-1">
          <label for="activeBacklogs" class="block text-sm font-bold text-[#1F2937]">Active Backlogs</label>
          <input value={academicData.activeBacklogs} name='activeBacklogs' onChange={handleInputChange} type="text" class=" cursor-pointer shadow-sm focus:bg-[#C2D3E4] focus:outline-none 
          p-1.5  w-full   bg-gray-50 border border-gray-300 text-[#1F2937]  text-sm rounded-lg" />
        </div>
        <div class="mb-3 cols-span-1">
          <label for="previousBacklogs" class="block  text-sm font-bold text-[#1F2937]">Previous Backlogs</label>
          <input value={academicData.previousBacklogs} name='previousBacklogs' onChange={handleInputChange} type="text" class=" cursor-pointer shadow-sm focus:bg-[#C2D3E4] focus:outline-none 
          p-1.5  w-full   bg-gray-50 border border-gray-300 text-[#1F2937]  text-sm rounded-lg" />
        </div>
        <div class="mb-3 cols-span-1">
          <label for="academicGap" class="block  text-sm font-bold text-[#1F2937]">Academic Gap Years</label>
          <input value={academicData.academicGap} name='academicGap' onChange={handleInputChange} type="text" class=" cursor-pointer shadow-sm focus:bg-[#C2D3E4] focus:outline-none 
          p-1.5  w-full   bg-gray-50 border border-gray-300 text-[#1F2937]  text-sm rounded-lg" />
        </div>
        <div class="mb-3 cols-span-1">
          <label for="degreeGap" class="block  text-sm font-bold text-[#1F2937]">Degree Gap Years</label>
          <input value={academicData.degreeGap} name='degreeGap' onChange={handleInputChange} type="text" class=" cursor-pointer shadow-sm focus:bg-[#C2D3E4] focus:outline-none 
          p-1.5  w-full   bg-gray-50 border border-gray-300 text-[#1F2937]  text-sm rounded-lg" />
        </div>
      </div>
      {/* <div className="left-0 my-2 uppercase focus:outline-none border-none 
            bg-[#C2D3E4] border font-bold text-[#1F2937] text-xs  py-1 px-2 ">
        <span>Technical Skills:</span>
      </div>
      <div className='mx-5 mt-2 grid grid-cols-3 gap-4'>
        <div class="mb-3 cols-span-1">
          <label for="academicSkills" class="block text-sm font-bold text-[#1F2937]">Skills</label>
          <input value={academicData.academicSkills} name='degreePassingYear' onChange={handleInputChange} type="text" class="shadow-sm focus:bg-[#C2D3E4] focus:outline-none 
          p-1.5  w-full   bg-gray-50 border border-gray-300 text-[#1F2937]  text-sm rounded-lg" />
        </div>
        </div> */}
      <div className="left-0 my-2 uppercase focus:outline-none border-none 
            bg-[#C2D3E4] border font-bold text-[#1F2937] text-xs  py-1 px-2 ">
        <span>Certifications/Achievements:</span>
      </div>
      {certifications.map(certification => (
        <div className='mx-5 mt-2 grid grid-cols-2 gap-4'>
          <div class="mb-3 cols-span-1">
            <b>Name</b>: {certification.certificationName}
          </div>
          <div class="mb-3 cols-span-1">
            <b>Year</b>: {certification.certificationYear}
          </div>
        </div>
      ))}
      <div className='mx-5 mt-2 grid grid-cols-3 gap-4'>
        <div class="mb-3 cols-span-1">
          <label for="certificationName" class="block  text-sm font-bold text-[#1F2937]">Certification Name</label>
          <input name='certificationName' onChange={handleCertificationChange} type="text" class=" cursor-pointer shadow-sm focus:bg-[#C2D3E4] focus:outline-none 
          p-1.5  w-full   bg-gray-50 border border-gray-300 text-[#1F2937]  text-sm rounded-lg" />
        </div>
        <div class="mb-3 cols-span-1">
          <label for="certificationYear" class="block  text-sm font-bold text-[#1F2937]">Certification Year</label>
          <input name='certificationYear' onChange={handleCertificationChange} type="text" class=" cursor-pointer shadow-sm focus:bg-[#C2D3E4] focus:outline-none 
          p-1.5  w-full   bg-gray-50 border border-gray-300 text-[#1F2937]  text-sm rounded-lg" />
        </div>
        <div class="mb-3 cols-span-1">
          <button onClick={handleAddCertification} className="mt-4 w-full focus:outline-none bg-[#1F2937] px-1 py-1 rounded-md font-bold text-lg text-[#d1d5db] border">Add Certification</button>
        </div>
      </div>
      <div className="left-0 my-2 uppercase focus:outline-none border-none 
            bg-[#C2D3E4] border font-bold text-[#1F2937] text-xs  py-1 px-2 ">
        <span>Technical Skills:</span></div>
      <div className='mx-5 mt-2 grid grid-cols-2 gap-4'>
        <div class="mb-3">
          <label for="technicalSkills" class="block  text-sm font-bold text-[#1F2937]">Skills</label>
          <input value={technicalSkills}  name='technicalSkills' onChange={handleSkillsChange} type="text" class="shadow-sm focus:bg-[#C2D3E4] focus:outline-none 
          p-1.5  w-full   bg-gray-50 border border-gray-300 text-[#1F2937]  text-sm rounded-lg" />
        </div>
        </div>
    </div>
    <button onClick={handleAcademicDetailSubmit} className="float-right mr-4 ml-auto focus:outline-none bg-[#1F2937] px-1 py-1 rounded-md font-bold text-lg text-[#d1d5db] w-28 border">Save</button>
  </>
)
}




// const[dicforum, setDicForum]=useState(
//   {
//     subject:"",
//     ques:"",
//     ans:[]
//   }
// )