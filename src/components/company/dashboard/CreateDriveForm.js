import Navbar from './navBar'
import SideNav from './sideNav'
import React, { Component } from "react";
import Select from "react-select";
import axios from "axios";
// import { withRouter } from 'react-router'
// import { useHistory } from "react-router-dom";
// import { useNavigate } from "react-router-dom";

const options = [
  { label: "Information Technology", value: 1 },
  { label: "Computer Science", value: 2 },
  { label: "Electronics and Telecommunication", value: 3 },
  { label: "Electronics", value: 4 },
  { label: "Instrumentation", value: 5 },
  { label: "Civil", value: 6 },
  { label: "Mechanical", value: 7 }
];

// const year = [
//   { label: "2018", value: 1 },
//   { label: "2019", value: 2 },
//   { label: "2020", value: 3 },
//   { label: "2021", value: 4 },
//   { label: "2022", value: 5 },
//   { label: "2023", value: 6 },
//   { label: "2024", value: 7 }
// ];




class DriveForm extends Component {

  // redirect() {
  //   this.props.history.push('/compdashboard')
  // }
  constructor(props) {
    super(props);
    this.state = {
    driveName: "",
    jobDescription: "",
    jobRole: "",
    jobType: "",
    // branchesPreferred: "",
    batch: "", 
    tenthPercentage: "",
    twelfthPercentage: "",
    cgpa: "",
    cgpaInPercentage: "",
    numberOfLiveKT: "",
    numberOfDeadKT: "",
    numberOfAcademicGaps: "",
    numberOfDegreeGaps: "",
    ctcOffered: "",
    jobLocation: "",
    skillsRequired: "",
    checked: false,
    values: [],
      
    };
  }

  onChangeInput = e =>{
    const {name, value} = e.target
    // console.log(name,value)
    this.setState(prevValue => (
      {
        ...prevValue,
        [name]:value
      }
    ))
  }

  onChangeCheckbox = e => {
    const isChecked = !this.state.checked;
    this.setState({
      checked: isChecked,
      values: isChecked ? options : this.state.values
    });
  };
  
  onChange = opt => {
    const allOptionsSelected = opt.length === options.length;
    this.setState({
      checked: allOptionsSelected ? true : false,
      values: opt
    });
  };
  
  onClick = e=>{
    e.preventDefault()
    // console.log(this.state)
    const data= {
    companyId: localStorage.getItem("activeCompanyId"),
    driveName: this.state.driveName,
    branchesPreferred: this.state.values.map(value=>value.label),
    batch: this.state.batch, 
    tenthPercentage: this.state.tenthPercentage,
    twelfthPercentage: this.state.twelfthPercentage,
    cgpa: this.state.cgpa,
    cgpaInPercentage: this.state.cgpaInPercentage,
    numberOfLiveKT: this.state.numberOfLiveKT,
    numberOfDeadKT: this.state.numberOfDeadKT,
    numberOfAcademicGaps: this.state.numberOfAcademicGaps,
    numberOfDegreeGaps: this.state.numberOfDegreeGaps,
    ctcOffered: this.state.ctcOffered,
    jobDescription: this.state.jobDescription,
    jobRole: this.state.jobRole,
    jobType: this.state.jobType,
    jobLocation: this.state.jobLocation,
    skillsRequired: this.state.skillsRequired,
  }
  // const history = useHistory()
  
    axios.post('http://localhost:8080/company/createDrive', data)
    .then(function (response) {
      if(response.data.success) {
        console.log(response.data.message)
        alert("Drive Created Successfully")
        window.location.reload();
        // {this.redirect()}
              
      } else {
        // setErrorMessage(response.data.message)
        console.log(response.data.message)
      }
    })
    .catch(function (error) {
      console.log(error);
    })
    console.log(data)
  }


  
  
  render() {
    return (
      <>
        <Navbar />
        <SideNav />
        
        <form >
          <div class="text-black">

            <header class="card-header ">
              <p class="card-header-title text-3xl font-semibold mt-5">
                <span class="icon"><i class="mdi mdi-account-multiple"></i></span>
                Create Drive
              </p>
              {/* <a href="#" class="card-header-icon">
              <span class="icon"><i class="mdi mdi-reload"></i></span>
            </a> */}
            </header>
          </div>
{/* drive name */}
          <div class="relative z-0 ml-10 mb-6 mt-7 mr-10 group"  >
            <input type="name" onChange={this.onChangeInput} name="driveName" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="*" />
            <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Drive Name</label>
          </div>
{/* job desc */}
          <div class="relative z-0 ml-10 mb-6 mr-10 group">
            <input type="text" onChange={this.onChangeInput} name="jobDescription" id="floating_repeat_password" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="" />
            <label for="floating_repeat_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Job Description</label>
          </div>
{/* job role */}

          <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 ml-10 mb-6 mr-10 group">
              <input type="text" onChange={this.onChangeInput} name="jobRole" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="" />
              <label for="floating_first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Job Role</label>
            </div>
 {/* job type */}
           
            <div class="relative z-0 ml-10 mb-6 mr-10 group">
              <input type="text" onChange={this.onChangeInput} name="jobType" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="" />
              <label for="floating_first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Job Type</label>
            </div>
          </div>
{/* 10th % */}

          <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 ml-10 mb-6 mr-10 group">
              <input type="text" onChange={this.onChangeInput} name="tenthPercentage" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="" />
              <label for="floating_first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">10th Percentage/CGPA</label>
            </div>
   {/* 12th % */}
         
            <div class="relative z-0 ml-10 mb-6 mr-10 group">
              <input type="text" onChange={this.onChangeInput} name="twelfthPercentage" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="" />
              <label for="floating_first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">12th Percentage/CGPA</label>
            </div>
          </div>
{/* BE cgpa */}

          <div class="grid md:grid-cols-2 md:gap-6">
            <div class="relative z-0 ml-10 mb-6 mr-10 group">
              <input type="text" onChange={this.onChangeInput} name="cgpa" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="" />
              <label for="floating_first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">BE CGPA</label>
            </div>

 {/* BE cgpa in % */}
           
            <div class="relative z-0 ml-10 mb-6 mr-10 group">
              <input type="text" onChange={this.onChangeInput} name="cgpaInPercentage" id="floating_last_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="" />
              <label for="floating_last_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">BE CGPA in Percentage</label>
            </div>
            </div>


            <div class="grid md:grid-cols-2 md:gap-6">
            {/* <div class="relative z-0 ml-10 mb-6 mr-10 group">
              <input type="text" name="floating_last_name" id="floating_last_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="" />
              <label for="floating_last_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">BE Passing Year</label>
            </div> */}
{/* live kt */}

            <div class="relative z-0 ml-10 mb-6 mr-10 group">
              <input type="text" onChange={this.onChangeInput} name="numberOfLiveKT" id="floating_last_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="" />
              <label for="floating_last_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Number of Live KT</label>
            </div>

{/* dead kt */}

            <div class="relative z-0 ml-10 mb-6 mr-10 group">
              <input type="text" onChange={this.onChangeInput} name="numberOfDeadKT" id="floating_last_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="" />
              <label for="floating_last_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Number of Dead KT</label>
            </div>
            </div>

            <div class="grid md:grid-cols-2 md:gap-6">
            
{/* academic gap */}

            <div class="relative z-0 ml-10 mb-6 mr-10 group">
              <input type="text" onChange={this.onChangeInput} name="numberOfAcademicGaps" id="floating_last_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="" />
              <label for="floating_last_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Number of Academic Gaps</label>
            </div>

{/* drops */}

            <div class="relative z-0 ml-10 mb-6 mr-10 group">
              <input type="text" onChange={this.onChangeInput} name="numberOfDegreeGaps" id="floating_last_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="" />
              <label for="floating_last_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Number of Drops during Engineering</label>
            </div>
            </div>

          <div class="grid md:grid-cols-2 md:gap-6">
 {/* required skills */}
           
            <div class="relative z-0 mb-6 ml-10 mr-10 group">
              <input type="text" onChange={this.onChangeInput} name="skillsRequired" id="floating_company" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="" />
              <label for="floating_company" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Required Skills</label>
            </div>
            {/* <div class="relative z-0 mb-6 ml-10 mr-10 group">
              <input type="text" name="floating_company" id="floating_company" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="" />
              <label for="floating_company" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Eligiblity Criteria</label>       
            </div> */}
{/* ctc offered */}
            
            <div class="relative z-0 mb-6 ml-10 mr-10 group">
              <input type="text" onChange={this.onChangeInput} name="ctcOffered" id="floating_company" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="" />
              <label for="floating_company" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">CTC Offered</label>
            </div>

{/* job location */}

            <div class="relative z-0 mb-6 ml-10 mr-10 group">
              <input type="text" onChange={this.onChangeInput} name="jobLocation" id="floating_company" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="" />
              <label for="floating_company" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Job Location</label>
            </div>
   
{/* batch */}

            <div class="relative z-0 mb-6 ml-10 mr-10 group">
              <input type="text" onChange={this.onChangeInput} name="batch" id="floating_company" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="" />
              <label for="floating_company" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Passing Year (Batch)</label>                   
            </div>
{/* company link*/}

<div class="relative z-0 ml-10 mb-6 mr-10 group">
              <input type="text" name="" id="floating_last_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="" />
              <label for="floating_last_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Company Link</label>
            </div>
            

{/* branches preffered */}

            <div class="relative z-0 ml-10 mb-6 mr-10 group">
              <input type="tel" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" name="floating_phone" id="floating_phone" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="" />
              <label for="floating_phone" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Branches Preferred</label>

              <Select
                
                placeholder="Branches Preferred"
                isMulti
                onChange={this.onChange}
                options={options}
                value={this.state.values}
              />
              <p className='mt-2'>
                <input
                  onChange={this.onChangeCheckbox}
                  type="checkbox"
                  id="selectAll"
                  value="selectAll"
                  checked={this.state.checked}
                />
                <label for="selectAll">Select all</label>
              </p>
            </div>
          </div>

          <button onClick={this.onClick} type="submit" class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ... focus:ring-4 focus:outline-none ml-10 focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:focus:ring-blue-800 mb-4 mt-5">Create Drive</button>
        </form>
      </>

    );
  }
}
export default DriveForm;