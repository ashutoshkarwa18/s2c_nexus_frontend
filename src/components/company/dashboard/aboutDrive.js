import React from "react";

class AboutDrive extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    //   List: Users,
    //   MasterChecked: false,
    //   SelectedList: [],
      show: false,
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  };

  showModal = () => {
    this.setState({ show: true });
    console.log(this.state.show)
  };

  hideModal = () => {
    this.setState({ show: false });
    console.log(this.state.show)
  };


//   //All Table commands
//   // Select/ UnSelect Table rows
//   onMasterCheck(e) {
//     let tempList = this.state.List;
//     // Check/ UnCheck All Items
//     tempList.map((user) => (user.selected = e.target.checked));

//     //Update State
//     this.setState({
//       MasterChecked: e.target.checked,
//       List: tempList,
//       SelectedList: this.state.List.filter((e) => e.selected),
//     });
//   }

//   // Update List Item's state and Master Checkbox State
//   onItemCheck(e, item) {
//     let tempList = this.state.List;
//     tempList.map((user) => {
//       if (user.id === item.id) {
//         user.selected = e.target.checked;
//       }
//       return user;
//     });

//     //To Control Master Checkbox State
//     const totalItems = this.state.List.length;
//     const totalCheckedItems = tempList.filter((e) => e.selected).length;

//     // Update State
//     this.setState({
//       MasterChecked: totalItems === totalCheckedItems,
//       List: tempList,
//       SelectedList: this.state.List.filter((e) => e.selected),
//     });
//   }

//   // Event to get selected rows(Optional)
//   getSelectedRows() {
//     this.setState({
//       SelectedList: this.state.List.filter((e) => e.selected),
//     });
//   }


  render() {

    return (
      <div>
        <Navbar />
        <SideNav />

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
                <h1 class="text-gray-900 font-bold text-xl leading-8 my-1">TCS Digital</h1>
                <p class="text-sm text-gray-500 hover:text-gray-600 leading-6">As a member of our Software Engineering Group, we look first and foremost for people who are passionate around solving business problems through innovation and engineering practices. You'll be required to apply your depth of knowledge and expertise to all aspects of the software development lifecycle, as well as partner continuously with your many stakeholders on a daily basis to stay focused on common goals.</p>
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
            
            
            <div class="w-full md:w-9/12 mx-2 h-64">

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
                      <div class="px-4 py-2 font-semibold">Type of Company</div>
                      <div class="px-4 py-2">Product Based</div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">Year of Establishment</div>
                      <div class="px-4 py-2">2002</div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">Required Skills</div>
                      <div class="px-4 py-2">Java,Python</div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">Eligibility Criteria</div>
                      <div class="px-4 py-2">10th Pass</div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">CTC Offered</div>
                      <div class="px-4 py-2">7 LPA</div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">Job Location</div>
                      <div class="px-4 py-2">Mumbai, Banglore</div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">Passing Year</div>
                      <div class="px-4 py-2">
                        <a class="text-blue-800" href="mailto:jane@example.com">2023</a>
                      </div>
                    </div>
                    <div class="grid grid-cols-2">
                      <div class="px-4 py-2 font-semibold">Preferred Branches</div>
                      <div class="px-4 py-2">Comps, IT</div>
                    </div>
                  </div>
                </div>
                <button
                className="bg-blue-200 text-black active:bg-blue-500 
            font-bold px-3 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none ml-96 mt-10"
                type="button"
                onClick={this.showModal}
              >
                Update Drive
              </button>
              </div>
              
            </div>
            
          </div>
        </div>




        {this.state.show ? 
          <div>
            <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
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
                      <input type="name" name="floating_email" id="floating_email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="*" />
                      <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Drive Name</label>
                    </div>
                    <div class="relative z-0 ml-10 mb-6 mr-10 group">
                      <input type="password" name="repeat_password" id="floating_repeat_password" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="" />
                      <label for="floating_repeat_password" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Job Description</label>
                    </div>

                    <div class="grid md:grid-cols-2 md:gap-6">
                      <div class="relative z-0 ml-10 mb-6 mr-10 group">
                        <input type="text" name="floating_first_name" id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="" />
                        <label for="floating_first_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Type of company</label>
                      </div>
                      <div class="relative z-0 ml-10 mb-6 mr-10 group">
                        <input type="text" name="floating_last_name" id="floating_last_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="" />
                        <label for="floating_last_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Year of Establishment</label>
                      </div>
                    </div>

                    <div class="grid md:grid-cols-2 md:gap-6">

                      <div class="relative z-0 mb-6 ml-10 mr-10 group">
                        <input type="text" name="floating_company" id="floating_company" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="" />
                        <label for="floating_company" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Required Skills</label>
                      </div>
                      <div class="relative z-0 mb-6 ml-10 mr-10 group">
                        <input type="text" name="floating_company" id="floating_company" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="" />
                        <label for="floating_company" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Eligiblity Criteria</label>
                      </div>
                      <div class="relative z-0 mb-6 ml-10 mr-10 group">
                        <input type="text" name="floating_company" id="floating_company" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="" />
                        <label for="floating_company" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">CTC Offered</label>
                      </div>
                      <div class="relative z-0 mb-6 ml-10 mr-10 group">
                        <input type="text" name="floating_company" id="floating_company" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="" />
                        <label for="floating_company" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Job Location</label>
                      </div>
                      <div class="relative z-0 mb-6 ml-10 mr-10 group">
                        <input type="text" name="floating_company" id="floating_company" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required="" />
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
                      onClick={this.hideModal}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div> : null }
        
      </div>
    )


  }
}

export default AboutDrive;















