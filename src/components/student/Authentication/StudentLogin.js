import React, { useEffect, useState } from "react";
import login from "../../../images/login.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {studentLogin,studentLogout} from "./../../../actions/index"
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import ProjectsImg from "./LoginImg";

export default function StudentLogin() {
  const navigate = useNavigate()
  useEffect(()=> {
    // localStorage.removeItem("activeStudentId")
    if(localStorage.getItem("activeStudentId")){
      navigate("/studentDashboard")
    }
  },[])
  const [credentials, setCredentials] = useState({
    email: "",
    password: ""
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleLoginChange = (e) => {
    const { name, value } = e.target
    setCredentials(prevValue => (
      {
        ...prevValue,
        [name]: value
      }
    ))
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    axios.get('https://s2c-nexus-3gq5.onrender.com/student/login', {
      params: credentials
    }).then(function (response) {
      if (response.data.success) {
        setIsLoading(false)
        localStorage.setItem("activeStudentId",response.data.studentId)
        navigate("/studentDashboard")
      } else {
        alert(response.data.message)
      }
    })
      .catch(function (error) {
        setIsLoading(false)
        alert("BACKEND SERVER NOT STARTED");
      })
  }
  return (
    <>
      <div className="flex flex-row h-screen overflow-hidden ">
        <ProjectsImg/>


        <div className="flex font-open-sans   flex-col items-center w-full p-10 overflow-auto">
          <h2 className="text-xl md:text-3xl text-center mt-4 uppercase font-bold">
            Welcome Back
          </h2>
          <h3 className="text-3xl md:text-5xl text-center mt-2 font-bold">
            Log into your account
          </h3>
          <form className="flex flex-col items-center pt-2 md:pt-8 w-full max-w-md mx-auto">
            <input
              name="email"
              onChange={handleLoginChange}
              className=" mt-2 py-2 px-4 block w-full rounded text-lg focus:ring-2 focus:border-transparent focus:ring-blue-500 outline-none border-2 border-gray-300 placeholder-gray-500"
              placeholder="Email"
            />

            <input
              name="password"
              onChange={handleLoginChange}
              className=" mt-2 py-2 px-4 block w-full rounded text-lg focus:ring-2 focus:border-transparent focus:ring-blue-500 outline-none border-2 border-gray-300 placeholder-gray-500"
              placeholder="Password"
            />

            <button
              onClick={handleLoginSubmit}
              type="submit"
              className=" font-semibold tracking-wider disabled:bg-gray-400 w-full max-w-md uppercase py-2 md:py-4 px-4 md:px-6 mt-4 rounded bg-black text-white text-lg md:text-xl transition duration-500 hover:bg-gray-600 cursor-pointer"
            >{ isLoading ? "Logging in..." : "Login"}</button>
            
            <div className="flex pt-6 justify-between w-full max-w-md">
              
              <a
                href="/studentSignup"
                className=" text-black-700 hover:text-black ml-36 text-sm md:text-base" 
              >
                Create new account
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
