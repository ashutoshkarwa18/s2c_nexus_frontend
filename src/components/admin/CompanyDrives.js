import React from "react";
import logo from '../../images/logos.png'
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdminSideNav from "./AdminSideNav";
import AdminNavbar from "./AdminNavbar";
import AdminDriveCard from "./AdminDriveCard";


export default function CompanyDrives(props) {
    const [driveData, setDriveData] = useState([])

    useEffect(() => {

        axios.get('http://localhost:8080/company/allDrives')
          .then(function (response) {
            if (response.data.success) {
              setDriveData(response.data.drives)
            } else {
              console.log(response.data.message)
            }
          })
          .catch(function (error) {
            console.log(error);
          })

    }, [])

  
  return (
    <>
    <AdminSideNav/>
    <AdminNavbar/>
    {driveData && driveData.length !== 0 ? driveData.map(drive => (
        <AdminDriveCard driveData={drive}/>
      )) : null}
    
  </>  
    
  );
}
