import React, { useRef, useEffect, useState } from "react";
import Navbar from "./navBar";
import SideNav from "./sideNav";
import axios from "axios";
import * as XLSX from 'xlsx'
import html2pdf from "html2pdf.js";

class StudentTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tableData: [],
      testResultClearedEmails: [],
      driveData: {},
      // List: Users,
      MasterChecked: false,
      SelectedList: [],
      show: false,
      showResume: false,
      skillsRequired: "",
      jobLocation: "",
      preferredBranches: "",
      jsonData: null,
      isActive: true,
      emailSubject: "",
      emailDescription: "",
      showOfferEmailModal: false,
      showProcessor: false,
      showEmailSendProcessor: false,
      studentData:{},
      formData: {

      },
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.showResume = this.showResume.bind(this);
    this.hideResume = this.hideResume.bind(this);
    this.handleResumeModal = this.handleResumeModal.bind(this);

    this.showEmailModal = this.showEmailModal.bind(this);
    this.hideEmailModal = this.hideEmailModal.bind(this);
    this.handleEmailModal = this.handleEmailModal.bind(this);

    this.showOfferEmailModal = this.showOfferEmailModal.bind(this);

    this.onInputEmailChange = this.onInputEmailChange.bind(this)
    this.onEmailSubmit = this.onEmailSubmit.bind(this)
  }

  onInputEmailChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    })
  };

  onEmailSubmit = (e) => {
    e.preventDefault();
    this.showEmailSendProcessor()
    console.log(this.state.emailDescription)
    console.log(this.state.emailSubject)
    axios.post("http://localhost:8080/email/users/", {
      subject: this.state.emailSubject,
      description: this.state.emailDescription,
      driveData: this.state.driveData
    })
      .then(response => {
        this.hideEmailSendProcessor()
        alert(response.data.respMesg)
      }
      );
  };

  onEmailOfferSubmit = (e) => {
    e.preventDefault();
    this.showEmailSendProcessor()
    console.log(this.state.emailDescription)
    console.log(this.state.emailSubject)
    axios.post("http://localhost:8080/email/offer/", {
      subject: this.state.emailSubject,
      description: this.state.emailDescription,
      driveData: this.state.driveData
    })
      .then(response => {
        this.hideEmailSendProcessor()
        alert(response.data.respMesg)
      });
  };

  handleTestFileUpload = (event) => {
    this.showProcessor()
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      this.setState({ jsonData });
      var sortedEmails = []
      jsonData.map((data, index) => {
        if (index !== 0) {
          if (data[2] < 40) {
            sortedEmails.push(data[1])
          }
        }
      })
      axios.post('http://localhost:8080/company/filterStudentsByTest', {
        driveId: localStorage.getItem("activeCompanyDriveId"),
        studentEmails: sortedEmails,
      }).then(response => {
        if (response.data.success) {
          console.log(response.data.message)
          this.loadDriveData()
          this.hideProcessor()
        } else {
          console.log(response.data.message)
        }
      }).catch(error => {
        console.log(error)
      })
    };

    reader.readAsBinaryString(file);
  };

  handleInterviewFileUpload = (event) => {
    this.showProcessor()
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target.result;
      const workbook = XLSX.read(data, { type: 'binary' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      this.setState({ jsonData });
      var sortedEmails = []
      jsonData.map((data, index) => {
        if (index !== 0) {
          if (data[2] === "no") {
            sortedEmails.push(data[1])
          }
        }
      })
      axios.post('http://localhost:8080/company/filterStudentsByInterview', {
        driveId: localStorage.getItem("activeCompanyDriveId"),
        studentEmails: sortedEmails,
      }).then(response => {
        if (response.data.success) {
          console.log(response.data.message)
          this.loadDriveData()
          this.hideProcessor()
        } else {
          console.log(response.data.message)
        }
      }).catch(error => {
        console.log(error)
      })
    };

    reader.readAsBinaryString(file);
  };

  handleClick() {
    this.setState((prevState) => ({
      isActive: !prevState.isActive,
    }));
  }

  handleResumeModal() {
    this.setState((prevState) => ({
      isActive: !prevState.isActive,
    }));
  }

  handleEmailModal() {
    this.setState((prevState) => ({
      isActive: !prevState.isActive,
    }));
  }

  loadDriveData() {
    axios.get('http://localhost:8080/company/driveInfo', {
      params: {
        driveId: localStorage.getItem("activeCompanyDriveId")
      }
    })
      .then((response) => {
        if (response.data.success) {
          this.setState({
            tableData: response.data.drive[0].appliedStudents.filter(student => student.rejected == false),
            driveData: response.data.drive[0],
            skillsRequired: response.data.drive[0].skillsRequired.toString(),
            jobLocation: response.data.drive[0].jobLocation.toString(),
            preferredBranches: response.data.drive[0].branchesPreferred.toString(),
            formData: response.data.drive[0]
          })
        } else {
          console.log(response.data.message)
        }
        console.log(response)
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  componentDidMount() {
    this.loadDriveData()
    // axios.get('http://localhost:8080/company/appliedStudentsDrive', {
    //   params: {
    //     driveId: localStorage.getItem("activeCompanyDriveId")
    //   }
    // })
    //   .then((response) => {
    //     if (response.data.success) {
    //       this.setState({
    //         tableData: response.data.appliedStudents ? response.data.appliedStudents : [],
    //       })
    //     } else {
    //       console.log(response.data.message)
    //     }
    //     console.log(response)
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   })
  }

  showModal = () => {
    this.setState({ show: true });
    console.log(this.state.formData)
  };

  hideModal = () => {
    this.setState({ show: false });
    console.log(this.state.show)
  };

  showResume = (e) => {
    e.preventDefault()   
    console.log(e.target.id)
    const studentId = e.target.id
    axios.get('http://localhost:8080/student/getDetails', {
      params:{
        studentId: studentId,
      }
    }).then(response => {
      if (response.data.success) {
        this.setState({ showResume: true , studentData: response.data.studentData});
      
      } 
    }).catch(error => {
      console.log(error)
    })
  }

  hideResume = () => {
    this.setState({ showResume: false });
    console.log(this.state.show)
  };

  showProcessor = () => {
    this.setState({ showProcessor: true });
  };

  hideProcessor = () => {
    this.setState({ showProcessor: false });
  };

  showEmailSendProcessor = () => {
    this.setState({ showEmailSendProcessor: true });
  };

  hideEmailSendProcessor = () => {
    this.setState({ showEmailSendProcessor: false });
  };

  showEmailModal = () => {
    this.setState({ showEmailModal: true });
    console.log(this.state.show)
  };

  hideEmailModal = () => {
    this.setState({ showEmailModal: false, showOfferEmailModal: false });
    console.log(this.state.show)
  };

  showOfferEmailModal = () => {
    this.setState({ showOfferEmailModal: true });
    console.log(this.state.show)
  };

  // onMasterCheck(e) {
  //   let tempList = this.state.List;
  //   tempList.map((user) => (user.selected = e.target.checked));

  //   this.setState({
  //     MasterChecked: e.target.checked,
  //     List: tempList,
  //     SelectedList: this.state.List.filter((e) => e.selected),
  //   });
  // }

  // onItemCheck(e, item) {
  //   let tempList = this.state.List;
  //   tempList.map((user) => {
  //     if (user.id === item.id) {
  //       user.selected = e.target.checked;
  //     }
  //     return user;
  //   });

  //   const totalItems = this.state.List.length;
  //   const totalCheckedItems = tempList.filter((e) => e.selected).length;


  //   this.setState({
  //     MasterChecked: totalItems === totalCheckedItems,
  //     List: tempList,
  //     SelectedList: this.state.List.filter((e) => e.selected),
  //   });
  // }


  getSelectedRows() {
    this.setState({
      SelectedList: this.state.List.filter((e) => e.selected),
    });
  }

  handleRejectStudent = (e) => {
    e.preventDefault()
    const studentId = e.target.id
    axios.post('http://localhost:8080/company/removeStudentFromDrive', {
      studentId: studentId,
      driveId: localStorage.getItem("activeCompanyDriveId")
    }).then(response => {
      if (response.data.success) {
        alert(response.data.message)
      } else {
        alert(response.data.message)
      }
    }).catch(error => {
      console.log(error)
    })
  }
  handleDownload = () => {
    const sheetName = 'Sheet1';
    const worksheet = XLSX.utils.table_to_sheet(document.getElementById('table-id'));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, sheetName);
    XLSX.writeFile(workbook, 'student-list.xlsx');
  };


  handleInputChange = e => {
    const { name, value } = e.target;
    console.log(name, value)
    this.setState(prevState => ({
      formData: {
        ...prevState.formData,
        [name]: value,
      },
    }));
  };

  handleDriveDetails = (e) => {
    e.preventDefault()
    this.setState({ show: false })
    axios.post('http://localhost:8080/company/updateDrive', {
      driveId: localStorage.getItem("activeCompanyDriveId"),
      updatedData: this.state.formData
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

  handleDownloadPDF = () => {
    const options = {
      margin: 0.5,
      filename: 'resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    html2pdf()
      .from(this.pdfRef)
      .set(options)
      .save();
  };



  render() {
    const { isActive } = this.state;
    const buttonColor = isActive ? "green" : "red";
    const buttonText = isActive ? "Active" : "Inactive";

    
    // const { data } = this.props;
    // const { studentData } = this.state;
    return (

      <>

        <Navbar />
        <SideNav />

        {this.state.showResume ? (
          
          <div className="flex justify-center  items-center h-[100%] w-[100%] overflow-x-hidden overflow-y-auto absolute top-[10%]  inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-16 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg mt-24 shadow-lg relative flex flex-col w-full   outline-none focus:outline-none">
                <div className="flex items-start justify-between  mt-32 border-b border-solid border-gray-300 rounded-t ">
                  {/* <h3 className="text-2xl font=semibold">Update Drive Info</h3> */}
                  {/* <button
                        className="bg-transparent border-0 text-black float-right"
                        onClick={this.hideModal}
                      >
                        <span className="text-black opacity-7 h-7 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                          x
                        </span>
                      </button> */}
                </div>
                {this.state.studentData.personalDetails ? 
                <div
                  id="myDiv" ref={(el) => (this.pdfRef = el)}
                  class="max-w-5xl p-3 mx-auto my-auto bg-gray-100 border-2 border-gray-500 print:border-0 page print:max-w-screen print:max-h-screen print:mx-0 print:my-o lg:h-letter md:max-w-letter md:h-letter xsm:p-8 sm:p-9 md:p-6 lg:mt-4 rounded-md print:bg-white"
                >
                  <div class="block w-full">
                    <h1 class="mb-0 text-xl font-bold text-gray-750">{this.state.studentData.personalDetails.name}</h1>
                    <h2 class="m-0 ml-2 text-md font-semibold text-gray-700 leading-snugish">
                      Full Stack Web Developer
                    </h2>
                    <div class="flex justify-start w-full">
                      <h3 class="m-0 mt-1 ml-2 font-md text-sm text-gray-550 leading-snugish">
                        {this.state.studentData.personalDetails.address}
                      </h3>
                      <h2 class="m-0 mt-1 ml-2 font-md text-sm text-gray-550 leading-snugish mx-2">
                        |
                      </h2>
                      <h3 class="m-0 mt-1 ml-2 font-md text-sm text-gray-550 leading-snugish">
                        {this.state.studentData.credentials.email}
                      </h3>
                      <h2 class="m-0 mt-1 ml-2 font-md text-sm text-gray-550 leading-snugish mx-2">
                        |
                      </h2>
                      {/* <h3 class="m-0 mt-1 ml-2 font-md text-sm text-gray-550 leading-snugish">
                        { }LinkedIn
                      </h3> */}
                      {/* <h2 class="m-0 mt-1 ml-2 font-md text-sm text-gray-550 leading-snugish mx-2">
                        |
                      </h2> */}
                      <h3 class="m-0 mt-1 ml-2 font-md text-sm text-gray-550 leading-snugish">
                        { }{this.state.studentData.personalDetails.mobileNumber}
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
                  {this.state.studentData.experienceDetails  && this.state.studentData.experienceDetails.map(exp=> (
                  <div className="mt-0">
                    <span className="text-md font-semibold text-gray-600"> {exp.organisation}-{exp.position}</span>
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
                  
                  {/* <div className="mt-1">
                    <span className="text-md font-semibold text-gray-600"> EARNEEDS</span>
                    <ul class="list-disc ml-4  text-sm">
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

                  
                  {/* Academic Projects*/}
                  
                  <div>
                    <h2 className="text-md font-bold italic">Academic Projects</h2>
                  </div>
                  {this.state.studentData.projectDetails  && this.state.studentData.projectDetails.map(project=> (
                  <div className="mt-0">
                    <span className="text-md font-semibold text-gray-600">  {project.name}</span>
                    <ul class="list-disc ml-4  text-sm">
                      <li>
                      {project.description}
                      </li>
                      {/* <li>
                        Technologies used: Pythons GUI package Tkinter, MySQL, Pandas,
                        Numpy, Matplotlib, Seaborn.
                      </li> */}
                    </ul>
                    
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
                    {this.state.studentData.academicDetails.technicalSkills  && this.state.studentData.academicDetails.technicalSkills.map(skill=>(
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
                    {this.state.studentData.academicDetails.certifications  && this.state.studentData.academicDetails.certifications.map(certification=>(
                    <li>{certification.certificationName} - {certification.certificationYear}</li>
                    ))}            
                    </ul>
                  </div>
                </div>
                :<h1>Couldn't load resume</h1>
        }


                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 z-50 rounded-b">
                  <button class="mr-80 mb-5 mt-4 inline-block px-6 py-3 bg-[#0f172a] text-white font-medium text-xs uppercase rounded shadow-md hover:bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 ... hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    onClick={this.handleDownloadPDF}>
                    Download PDF
                  </button>
                  <button
                    className="text-black background-transparent font-bold bg-gray-400 uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={this.hideResume}
                  >
                    Close
                  </button>

                </div>
              </div>
            </div>
          </div>
        ) : null}
        <div>

          <header class="card-header ">
            <p class="card-header-title text-3xl font-semibold mt-5">
              <span class="icon"><i class="mdi mdi-account-multiple"></i></span>
              Drive Information
            </p>
          </header>
        </div>

        {/* <div class="box-content h-400 w-200 p-4 border-4 ..."> */}
        <div class="container mx-auto my-1 p-5">
          <div class="md:flex no-wrap md:-mx-2 ">

            <div class="w-full md:w-3/12 md:mx-2">

              <div class="bg-white p-3 border-t-4 border-green-400">
                <h1 class="text-gray-900 font-bold text-xl leading-8 my-1">{this.state.driveData.driveName}</h1> {/*Drive name to be displayed */}
                <p class="text-sm text-gray-500 hover:text-gray-600 leading-6">{this.state.driveData.jobDescription}</p>
                <ul
                  class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                  <li class="flex items-center py-3">
                    <span>Drive Status</span>
                    {/* <span class="ml-auto"><span
                      class="bg-green-500 py-1 px-2 rounded text-white text-sm">Active</span></span> */}
                    <button
                      onClick={this.handleClick}
                      style={{ backgroundColor: buttonColor }}
                      class="ml-auto py-1 px-2 rounded text-white text-sm"
                    >
                      {buttonText}
                    </button>
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
                      <div class="px-4 py-2">{this.state.driveData.jobRole}</div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">Job Type </div>
                      <div class="px-4 py-2">{this.state.driveData.jobType}</div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">10th Percentage/CGPA</div>
                      <div class="px-4 py-2">{this.state.driveData.tenthPercentage}%</div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">12th Percentage/CGPA</div>
                      <div class="px-4 py-2">{this.state.driveData.twelfthPercentage}%</div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">BE CGPA</div>
                      <div class="px-4 py-2">{this.state.driveData.cgpa}</div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">BE CGPA in Percentage</div>
                      <div class="px-4 py-2">{this.state.driveData.cgpaInPercentage}%</div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">No. of Live KT</div>
                      <div class="px-4 py-2">{this.state.driveData.numberOfDeadKT}</div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">No. of Dead KT</div>
                      <div class="px-4 py-2">{this.state.driveData.numberOfDeadKT}</div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">No. of Academic Gaps</div>
                      <div class="px-4 py-2">{this.state.driveData.numberOfAcademicGaps}</div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">No. of Drops during Engineering</div>
                      <div class="px-4 py-2">{this.state.driveData.numberOfDegreeGaps}</div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">Required Skills</div>
                      <div class="px-4 py-2">{this.state.skillsRequired}</div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">CTC Offered</div>
                      <div class="px-4 py-2">{this.state.driveData.ctcOffered}</div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">Job Location</div>
                      <div class="px-4 py-2">{this.state.jobLocation}</div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">Passing Year</div>
                      <div class="px-4 py-2">
                        <a class="text-blue-800" href="mailto:jane@example.com">{this.state.driveData.batch}</a>
                      </div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">Preferred Branches</div>
                      <div class="px-4 py-2">{this.state.preferredBranches}</div>
                    </div>
                  </div>
                </div>
                <button
                  className="bg-blue-200 text-black active:bg-blue-500 
      font-bold px-3 py-2 rounded shadow hover:text-white hover:bg-[#0f172a] outline-none focus:outline-none ml-96 mt-10"
                  type="button"
                  onClick={this.showModal}
                >
                  Update Drive
                </button>
              </div>

            </div>

          </div>
        </div>



        {this.state.show ? (
          <>
            <div className="flex justify-center items-center max-h-fix overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                    <h3 className="text-2xl font=semibold">Update Drive Info</h3>
                    {/* <button
                        className="bg-transparent border-0 text-black float-right"
                        onClick={this.hideModal}
                      >
                        <span className="text-black opacity-7 h-7 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                          x
                        </span>
                      </button> */}
                  </div>
                  <form >
                    <div class="relative z-0 ml-10 mb-6 mt-7 mr-10 group"  >
                      <input value={this.state.formData.driveName} onChange={this.handleInputChange} type="name" name="driveName" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="*" />
                      <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Drive Name</label>
                    </div>
                    <div class="relative z-0 ml-10 mb-6 mr-10 group">
                      <input value={this.state.formData.jobDescription} onChange={this.handleInputChange} type="text" name="jobDescription" id="floating_repeat_password" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="" />
                      <label for="floating_repeat_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Job Description</label>
                    </div>

                    <div class="grid md:grid-cols-2 md:gap-6">
                      <div class="relative z-0 ml-10 mb-6 mr-10 group">
                        <input value={this.state.formData.jobRole} onChange={this.handleInputChange} type="text" name="jobRole" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="" />
                        <label for="floating_first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Job Role</label>
                      </div>
                      <div class="relative z-0 ml-10 mb-6 mr-10 group">
                        <input value={this.state.formData.jobType} onChange={this.handleInputChange} type="text" name="jobType" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="" />
                        <label for="floating_first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Job Type</label>
                      </div>
                      <div class="relative z-0 ml-10 mb-6 mr-10 group">
                        <input value={this.state.formData.tenthPercentage} onChange={this.handleInputChange} type="text" name="tenthPercentage" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="" />
                        <label for="floating_first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">10th Percentage/CGPA</label>
                      </div>
                      <div class="relative z-0 ml-10 mb-6 mr-10 group">
                        <input value={this.state.formData.twelfthPercentage} onChange={this.handleInputChange} type="text" name="twelfthPercentage" id="floating_last_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="" />
                        <label for="floating_last_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">12th Percentage/CGPA</label>
                      </div>
                      <div class="relative z-0 ml-10 mb-6 mr-10 group">
                        <input value={this.state.formData.cgpa} onChange={this.handleInputChange} type="text" name="cgpa" id="floating_last_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="" />
                        <label for="floating_last_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">BE CGPA</label>
                      </div>
                      <div class="relative z-0 ml-10 mb-6 mr-10 group">
                        <input value={this.state.formData.cgpaInPercentage} onChange={this.handleInputChange} type="text" name="cgpaInPercentage" id="floating_last_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="" />
                        <label for="floating_last_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">BE CGPA in Percentage</label>
                      </div>
                      <div class="relative z-0 ml-10 mb-6 mr-10 group">
                        <input value={this.state.formData.numberOfLiveKT} onChange={this.handleInputChange} type="text" name="numberOfLiveKT" id="floating_last_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="" />
                        <label for="floating_last_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">No. of Live KT</label>
                      </div>
                      <div class="relative z-0 ml-10 mb-6 mr-10 group">
                        <input value={this.state.formData.numberOfDeadKT} onChange={this.handleInputChange} type="text" name="numberOfDeadKT" id="floating_last_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="" />
                        <label for="floating_last_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">No. of Dead KT</label>
                      </div>
                      <div class="relative z-0 ml-10 mb-6 mr-10 group">
                        <input value={this.state.formData.numberOfAcademicGaps} onChange={this.handleInputChange} type="text" name="numberOfAcademicGaps" id="floating_last_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="" />
                        <label for="floating_last_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">No. of Academic Gaps</label>
                      </div>
                      <div class="relative z-0 ml-10 mb-6 mr-10 group">
                        <input value={this.state.formData.numberOfDegreeGaps} onChange={this.handleInputChange} type="text" name="numberOfDegreeGaps" id="floating_last_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="" />
                        <label for="floating_last_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">No. of Drops in Degree</label>
                      </div>
                    </div>

                    <div class="grid md:grid-cols-2 md:gap-6">

                      <div class="relative z-0 mb-6 ml-10 mr-10 group">
                        <input value={this.state.formData.skillsRequired} onChange={this.handleInputChange} type="text" name="skillsRequired" id="floating_company" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="" />
                        <label for="floating_company" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Required Skills</label>
                      </div>

                      <div class="relative z-0 mb-6 ml-10 mr-10 group">
                        <input value={this.state.formData.ctcOffered} onChange={this.handleInputChange} type="text" name="ctcOffered" id="floating_company" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="" />
                        <label for="floating_company" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">CTC Offered</label>
                      </div>
                      <div class="relative z-0 mb-6 ml-10 mr-10 group">
                        <input value={this.state.formData.jobLocation} onChange={this.handleInputChange} type="text" name="jobLocation" id="floating_company" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="" />
                        <label for="floating_company" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Job Location</label>
                      </div>
                      <div class="relative z-0 mb-6 ml-10 mr-10 group">
                        <input value={this.state.formData.batch} onChange={this.handleInputChange} type="text" name="batch" id="floating_company" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="" />
                        <label for="floating_company" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Passing Year (Batch)</label>

                      </div>
                    </div>

                  </form>

                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      onClick={this.hideModal}
                    >
                      Close
                    </button>
                    <button
                      className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                      type="button"
                      onClick={this.handleDriveDetails}

                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </>
        ) : null}

        {/* </div> */}



        <div className="container">
          <div className="row">
            <div className="col-md-12">
              {this.state.showProcessor ?
                <div class="flex items-center justify-center">
                  <div
                    class="inline-block mr-5 h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                    role="status">
                    <span
                      class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                    >Loading...</span
                    >
                  </div>
                  <span>Processing Excel files</span>
                </div> :
                <div>
                  <p class="card-header-title">
                    <span class="icon"><i class="mdi mdi-account-multiple"></i></span>
                    Applied Students
                  </p>
                  <table className="table ml-2" id="table-id" >

                    <thead>
                      <tr>
                        {/* <th scope="col">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={this.state.MasterChecked}
                        id="mastercheck"
                        onChange={(e) => this.onMasterCheck(e)}
                      />
                    </th> */}

                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Resume</th>
                        <th scope="col">Branch</th>
                        <th scope="col">Batch</th>
                        <th scope="col">Applied on</th>


                      </tr>
                    </thead>
                    <tbody>
                      {this.state.tableData.length != 0 ? this.state.tableData.map((user) => (
                        <tr key={user.id} >
                          {/* <th scope="row">
                        <input
                          type="checkbox"
                          checked={user.selected}
                          className="form-check-input"
                          id="rowcheck{user.id}"
                          onChange={(e) => this.onItemCheck(e, user)}
                        />
                      </th> */}
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td><button id={user.id} class="bg-gray-200 p-1 rounded px-2" onClick={this.showResume}>Resume</button></td>
                          <td>{user.branch}</td>
                          <td>2023</td>
                          <td>{user.appliedDate}</td>


                          <div class="buttons right nowrap mr-7">
                            {/* <button class="button small text-center inline-flex items-center green --jb-modal" data-target="sample-modal-2" type="button">
                          <span class="icon"><i class="mdi mdi-check"></i></span>Accept
                        </button> */}


                            <button id={user.id} onClick={this.handleRejectStudent} class="button small text-center inline-flex items-center red --jb-modal" data-target="sample-modal" type="button">
                              <span class="icon"><i class="mdi mdi-window-close"></i></span>Reject
                            </button>
                          </div>

                        </tr>
                      )) : null}
                    </tbody>
                  </table>
                </div>}

              <button class="py-2 px-4 ml-3 bg-blue-200 text-black active:bg-blue-500 
            font-bold text-center rounded shadow hover:shadow-lg outline-none focus:outline-none mt-2 mb-1 hover:text-white hover:bg-[#0f172a] ..." onClick={this.handleDownload}>Download List</button>
              <div>
                <label class="block mb-2 text-md font-medium text-gray-900 mt-3 ml-4" for="Upload Test Results">Upload Test Results: </label>
                <input class="block mb-5 ml-4 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-700 focus:outline-none dark:bg-gray-400 dark:border-gray-600 dark:placeholder-gray-700"
                  type="file" onChange={this.handleTestFileUpload} />
              </div>

              <div>
                <label class="block mb-2 mt-3 ml-4 text-md font-medium text-gray-900" for="Upload Interview Results">Upload Interview Results: </label>
                <input class="block mb-5 ml-4 text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-700 focus:outline-none dark:bg-gray-400 dark:border-gray-600 dark:placeholder-gray-700 " type="file" onChange={this.handleInterviewFileUpload} />
              </div>


              {this.state.showEmailModal || this.state.showOfferEmailModal ? (

                <div class="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">

                  <form class="bg-[#ccdcf1] shadow-md rounded px-8 pt-6 pb-8 mb-4">

                    <div class="mb-4">
                      {/* <p class="text-green-500 text-xs bold italic">{this.state.msg}</p> */}
                      <label class="block text-gray-700 text-sm font-bold mb-2" for="subject">
                        Subject
                      </label>
                      <input
                        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={this.state.emailSubject}
                        onChange={(e) => this.setState({ emailSubject: e.target.value })}
                        name="subject"
                        type="text"
                        placeholder="Subject" />
                    </div>
                    <div class="mb-6">
                      <label class="block text-gray-700 text-sm font-bold mb-2" for="description">
                        Description
                      </label>

                      <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Description"
                        name="description"
                        onChange={(e) => this.setState({ emailDescription: e.target.value })}
                        value={this.state.emailDescription}
                      >
                      </textarea>
                    </div>
                    {this.state.showEmailSendProcessor ?
                      <div class="flex items-center justify-center">
                        <div
                          class="inline-block mr-5 h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                          role="status">
                          <span
                            class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                          >Loading...</span
                          >
                        </div>
                        <span>Sending Email</span>
                      </div> :
                      <div class="flex items-center justify-between">
                        <button onClick={this.state.showEmailModal ? this.onEmailSubmit : this.onEmailOfferSubmit} class=" bg-[#6f8aaf]  text-black active:bg-blue-500 
      font-bold rounded shadow hover:text-white hover:bg-[#0f172a] outline-none focus:outline-none py-2 px-4 mx-1" type="button">
                          Send Email
                        </button>
                        <button
                          className="text-black background-transparent font-bold bg-gray-400 hover:bg-gray-500 hover:text-white rounded uppercase px-6 py-2 mx-2 mt-1 text-sm outline-none focus:outline-none mr-1 mb-1"
                          type="button"
                          onClick={this.hideEmailModal}
                        >
                          Close
                        </button>

                      </div>}
                  </form>

                </div>
              ) : null}





              <div class="buttons right nowrap">
                <div class="flex items-center justify-between mb-5">
                  <div class="buttons">
                    <button onClick={this.showEmailModal} type="button" class="button bg-blue-200 text-black active:bg-blue-500 
      font-bold rounded shadow hover:text-white hover:bg-[#0f172a] outline-none focus:outline-none ">Send Exam Link</button>
                    <button onClick={this.showEmailModal} type="button" class="button bg-blue-200 text-black active:bg-blue-500 
      font-bold rounded shadow hover:text-white hover:bg-[#0f172a] outline-none focus:outline-none ">Schedule Interview</button>
                    <button onClick={this.showOfferEmailModal} type="button" class="button  bg-blue-200 text-black active:bg-blue-500 
      font-bold rounded shadow hover:text-white hover:bg-[#0f172a] outline-none focus:outline-none ">Send Offer Letter</button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>

      </>
    );


  }
}

export default StudentTable;














