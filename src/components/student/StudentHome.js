import React, { useEffect, useState } from 'react'
import Navbar from '../company/dashboard/navBar'
import StudentSideNav from './StudentSideNav'
import StudentDashboard from './StudentDashboard'
import StudentProfile from './StudentProfile'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import DiscussionForum from './DiscussionForum/DiscussionForum'
import ResumePDF from './ResumeToPdf'
import { StudentOffers } from './StudentOffers'
import AppliedStudentDrive from './StudentAppliedDrive'

export default function StudentHome() {
  const navigate = useNavigate()
  useEffect(()=> {
    if(!localStorage.getItem("activeStudentId")){
      alert("PLEASE LOGIN")
      navigate("/studentLogin")
    }
  },[])
  const [activeTab, setActiveTab] = useState("dashboard")

  const handleTabChange = (data) => {
    console.log(data)
    setActiveTab(data)
  }
  return (
    <>
    <div className='overflow-hidden'>
      <Navbar />
      <StudentSideNav changeTab={handleTabChange} />
      {activeTab === "dashboard" && <StudentDashboard />}
      {activeTab === "resume" && <ResumePDF />}
      {activeTab === "appliedDrive" && <AppliedStudentDrive />}
      {activeTab === "profile" && <StudentProfile />}
      {activeTab === "dforum" && <DiscussionForum />}
      {activeTab === "interview" && <StudentOffers />}
    </div>
    </>
  )
}
