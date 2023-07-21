import React from "react";
import Icon from "@mdi/react";
import { mdiAccountSchool,mdiDomain, mdiSecurity } from "@mdi/js";
// import recrutment from "./images/recrutment.jpg";
import Navbar from "./LandingNav";
function Land() {
  return (
    <>
    <Navbar/>
      <div style={{ marginLeft: "-15rem", marginTop: "-3.5rem" }}>
        <div>
          <div className=" h-96  w-full relative ">
            <img
              className="w-full h-screen object-cover absolute"
            //    src="https://www.peenaksolutions.com/wp-content/uploads/2020/05/Talent-Acquisition.png"
            //    src="https://e1.pxfuel.com/desktop-wallpaper/945/354/desktop-wallpaper-manpower.jpg"
            // src="https://quotienthr.com/wp-content/uploads/2021/02/All-About-HR-Automation-1024x631-1.png"
            // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLgrr9rVzR0DMw_w5xEDHc0YyPM8muTLa4NI9ScY_1p5r4fhu4PLErxIqWfn-BUOMkZTg&usqp=CAU"

               src="https://i.pinimg.com/736x/30/8f/2f/308f2fd627c36e007527bc50337f6c7b.jpg"
            />
            
            <div className="relative "> 

            <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <h1 className="text-3xl text-center  text-bold  mb-4">
                .
              </h1>
            
              <h1 className="text-3xl text-center  text-bold text-white mb-2">
                Explore the services provided by S2C Nexus!
              </h1>
              <p className="underline decoration-1 text-lg text-gray-400">
                A central platform for choosing deserving applicants from
                various fields, numerous software co-orporatios and business for
                conducting campus placements under one roof.
              </p>
            </div>

            <div style={{ marginLeft: "3rem" }} className="mb-8 ">
              <h3 className="text-lg ml-20 text-white mb-3">Getting Started!</h3>
              <p className="text-xl text-gray-400">
                Login/Sigup to your respective accounts and start applying or
                hiring with us.
              </p>
            </div>

<div className="group">
              <div className="bg-gray-200 ml-10 w-1/2 hover:bg-gray-300 dark:bg-slate-900 rounded-lg px-6 h-28 py-6 ring-1 ring-slate-900/5 shadow-xl">
              <a className="group-hover:bg-gray-500" href="/adminLogin">
                <div>
                  <span className="inline-flex items-center justify-center p-2 bg-indigo-500 rounded-md shadow-lg">
                    <Icon path={mdiSecurity} size={1} />
                  </span>
                </div>
                <h3 className="text-slate-900 mt-2 text-xl text-bold font-medium tracking-tight">
                  Admin Login 
                </h3>
                <p className="text-gray-600 mt-1 mb-2 text-lg">
                  Login to create, manage and monitor users and data.
                </p>
                </a>
              </div>
            

            
              <div className="bg-gray-200 ml-10 w-1/2  mt-6 dark:bg-slate-900 rounded-lg px-6 h-28 ring-1 ring-slate-900/5 shadow-xl">
              <a href="/login">
                <div>
                  <span className="inline-flex items-center justify-center p-2 bg-indigo-500 rounded-md shadow-lg">
                    <Icon path={mdiDomain} size={1} />
                  </span>
                </div>
               <h3 className="text-slate-900  mt-2 text-xl text-bold font-medium tracking-tight">
                  Company Login  
                </h3>
                <p class="text-gray-600 mt-1 mb-2 text-lg">
                  Register yourself with us and start hiring talent with
                  countless skills.
                </p>
                </a>
              </div>
            

          
              <div className="bg-gray-200 ml-10 w-1/2  mt-6 dark:bg-slate-900 rounded-lg px-6 h-28 ring-1 ring-slate-900/5 shadow-xl">
              <a href="/studentLogin">
                <div>
                  <span className="inline-flex items-center justify-center p-2 bg-indigo-500 rounded-md shadow-lg">
                    <Icon path={mdiAccountSchool} size={1} />
                  </span>
                </div>
                <h3 className="text-slate-900  mt-2 text-xl text-bold font-medium tracking-tight">
                  Student Login     
                </h3>
                <p className="text-gray-600 mt-1 mb-2 text-lg">
                  Start building resume and applying for various companies of
                  your interest.
                </p>
                </a>
              </div>
           
            </div>
            </div>

            </div>
        </div>
      </div>
   </>
  );
}
export default Land;
