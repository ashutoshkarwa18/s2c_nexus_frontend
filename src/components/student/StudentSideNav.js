import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function StudentSideNav(props) {

  const [active, setActive] = useState("dashboard")
  const navigate = useNavigate()

  const handleSideNavTabs = (e)=> {
    e.preventDefault()
    setActive(e.currentTarget.id)
    var data = e.currentTarget.id
    props.changeTab(data)
  }

  const handleLogout = (e)=> {
    e.preventDefault()
    localStorage.removeItem('activeStudentId')
    navigate("/")
  }

  return (
    <div className="font-open-sans" id="main-div" >
      <aside class="aside bg-[#0f172a] is-placed-left is-expanded  mt-16">
        <div class="text-lg menu is-menu-main">
          <ul class="mt-8 menu-list">
            <li id="dashboard" onClick={handleSideNavTabs}  className={`rounded-md m-3 ${active==="dashboard" ? "bg-[#374151]" : '' }`}>
              <a class="rounded-md" href="">
                <span class="icon"><i class="mdi mdi-desktop-mac"></i></span>
                <span class="menu-item-label">Dashboard</span>
              </a>
            </li>
          </ul>

          <ul class="menu-list">
            <li id="appliedDrive" onClick={handleSideNavTabs}  className={`rounded-md m-3 ${active==="appliedDrive" ? "bg-[#374151]" : '' }`}>
              <a class="rounded-md" href="">
                <span class="icon"><i class="mdi mdi-table"></i></span>
                <span class="menu-item-label">Applied Drives</span>
              </a>
            </li>

            <li id="profile"  onClick={handleSideNavTabs}  class={`rounded-md m-3 ${active==="profile" ? "bg-[#374151]" : ""}`}>
              <a class="rounded-md" href="/studentProfile">
                <span class="icon"><i class="mdi mdi-account-circle"></i></span>
                <span class="menu-item-label">Profile</span>
              </a>
            </li>
            <li id="resume" onClick={handleSideNavTabs}  className={`rounded-md m-3 ${active==="resume" ? "bg-[#374151]" : '' }`}>
              <a class="rounded-md" href="">
                <span class="icon"><i class="mdi mdi-clipboard-text"></i></span>
                <span class="menu-item-label" >Resume</span>
                
              </a>
            </li>

            {/* <li id="interview" onClick={handleSideNavTabs}  className={`rounded-md m-3 ${active==="interview" ? "bg-[#374151]" : '' }`}>
              <a class="rounded-md" href="">
                <span class="icon"><i class="mdi mdi-account-circle"></i></span>
                <span class="menu-item-label" >Interview</span>
                
              </a>
            </li> */}

            <li id="dforum" onClick={handleSideNavTabs}  className={`rounded-md m-3 ${active==="offers" ? "bg-[#374151]" : '' }`}>
              <a class="rounded-md" href="/companyprofile">
                <span class="icon"><i class="mdi mdi-forum"></i></span>
                <span class="menu-item-label">Discussion Forum</span>
              </a>
            </li>
            {/* <li id="interview" onClick={handleSideNavTabs}  className={`rounded-md m-3 ${active==="interview" ? "bg-[#374151]" : '' }`}>
              <a class="rounded-md" href="/companyprofile">
                <span class="icon"><i class="mdi mdi-account-circle"></i></span>
                <span class="menu-item-label">Interviews</span>
              </a>
            </li> */}
            <li onClick={handleLogout}>
              <a class="rounded-md m-2" href="#">
                <span class="icon"><i class="mdi mdi-lock"></i></span>
                <span class="menu-item-label">Log Out</span>
              </a>
            </li>
          </ul>

          {/* <p class="menu-label">About</p> */}
          <ul class="menu-list">

            {/* <li>
              <a href="/" class="has-icon rounded-md m-2">
                <span class="icon"><i class="mdi mdi-help-circle"></i></span>
                <span class="menu-item-label">About</span>
              </a>
            </li>
            <li>
              <a href="/" class="has-icon rounded-md m-2">
                <span class="icon"><i class="mdi mdi-github-circle"></i></span>
                <span class="menu-item-label">GitHub</span>
              </a>
            </li> */}
          </ul>
        </div>
      </aside>

      {/* <section class="is-title-bar">
      <div class="flex flex-col md:flex-row items-center justify-between space-y-6 md:space-y-0">
        <ul>
          <li>Admin</li>
          <li>Dashboard</li>
        </ul>
        <a href="https://therichpost.com/" onclick="alert('Coming soon'); return false" target="_blank" class="button blue">
          <span class="icon"><i class="mdi mdi-credit-card-outline"></i></span>
          <span>Premium Demo</span>
        </a>
      </div>
    </section> */}


    </div>



  );
}
// export default SideNav