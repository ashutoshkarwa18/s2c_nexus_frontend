import React, {useState, useEffect} from "react";
import ProjectsImg from "../student/Authentication/LoginImg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { useSelector } from "react-redux";

export default function AdminSignup() {
    const navigate = useNavigate()
    useEffect(() => {
        if (localStorage.getItem("activeAdminId")) {
            navigate("/adminDashboard")
        }
    }, [])
    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    })
    const [isLoading, setIsLoading] = useState(false)

    const handleSignupChange = (e) => {
        const { name, value } = e.target
        setCredentials(prevValue => (
            {
                ...prevValue,
                [name]: value
            }
        ))
    }

    const handleSignupSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)
        axios.post('http://localhost:8080/admin/signup', credentials).then(function (response) {
            if (response.data.success) {
                setIsLoading(false)
                alert(response.data.message)
                navigate("/adminLogin")
            } else {
                alert(response.data.message)
            }
        }).catch(function (error) {
            setIsLoading(false)
            console.log(error)
            alert("BACKEND SERVER NOT STARTED");
        })
    }
    return (
        <>
            <div className="flex flex-row h-screen overflow-hidden ">
            <ProjectsImg/>

                <div className="flex font-open-sans   flex-col items-center w-full p-10 overflow-auto">
                    <h3 className="text-3xl md:text-5xl text-center mt-2 font-bold">
                        SignUp as Admin!
                    </h3>
                    <form className="flex flex-col items-center pt-2 md:pt-8 w-full max-w-md mx-auto">
                        <input
                            name="email"
                            onChange={handleSignupChange}
                            className=" mt-2 py-2 px-4 block w-full rounded text-lg focus:ring-2 focus:border-transparent focus:ring-blue-500 outline-none border-2 border-gray-300 placeholder-gray-500"
                            placeholder="Email"
                        />

                        <input
                            name="password"
                            onChange={handleSignupChange}
                            className=" mt-2 py-2 px-4 block w-full rounded text-lg focus:ring-2 focus:border-transparent focus:ring-blue-500 outline-none border-2 border-gray-300 placeholder-gray-500"
                            placeholder="Password"
                        />

                        <button
                            onClick={handleSignupSubmit}
                            type="submit"
                            className=" font-semibold tracking-wider disabled:bg-gray-400 w-full max-w-md uppercase py-2 md:py-4 px-4 md:px-6 mt-4 rounded bg-black text-white text-lg md:text-xl transition duration-500 hover:bg-gray-600 cursor-pointer"
                        >{ "Signup"}</button>

                        <div>
                            <a
                                href="/adminLogin"
                                className="text-black hover:text-blue-500 text-sm md:text-base"
                                style={{ display: "inline-block", marginTop: "18px" }}
                            >
                                Already have an account? Login here
                            </a>
                        </div>
                    </form>
                    {/* <hr className="w-full h-1 bg-black rounded-full my-6 block" />
        <div>
          <p className=" font-bold text-center text-gray-800 pb-4">
            Or continue with
          </p>
          <a
            // href="login"
            className="flex items-center space-between py-2 px-4 m-2 bg-white text-black hover:bg-gray-400 transition-all duration-500 rounded shadow-2xl border-2 border-gray-600 text-base font-semibold  cursor-pointer"
          >
            <FcGoogle
              style={{ display: "inline-block", marginRight: "8px" }}
              size={21}
            />
            Google
          </a>
        </div> */}
                </div>
            </div>
        </>
    );
}
