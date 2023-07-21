import React from "react";
import { useNavigate } from "react-router-dom";
export default function SideNav() {
  const navigate = useNavigate()
  const handleLogout = (e) => {
    e.preventDefault()
    localStorage.removeItem("activeCompanyId")
    navigate("/")
  }
    return (
     <div id="main-div" >
        
        <aside class="aside bg-[#0f172a] is-placed-left is-expanded  mt-16">
        {/* <div class="aside-tools">
        <div>
          Admin <b class="font-black">TCS</b>
        </div>
      </div> */}
      <div class="menu text-lg is-menu-main">
        <p class="menu-label ">General</p>
        <ul class="menu-list">
          <li class="active">
            <a href="/compdashboard">
              <span class="icon"><i class="mdi mdi-desktop-mac"></i></span>
              <span class="menu-item-label">Dashboard</span>
            </a>
          </li>
        </ul>
        
        <ul class="menu-list">
          <li class="--set-active-tables-html">
            <a href="/createDrive">
              <span class="icon"><i class="mdi mdi-table"></i></span>
              <span class="menu-item-label">Create Drive</span>
            </a>
          </li>
          
          <li class="--set-active-profile-html">
            <a href="/companyprofile">
              <span class="icon"><i class="mdi mdi-account-circle"></i></span>
              <span class="menu-item-label">Company Profile</span>
            </a>
          </li>
          <li onClick={handleLogout}>
            <a href="/">
              <span class="icon"><i class="mdi mdi-lock"></i></span>
              <span class="menu-item-label">Log Out</span>
            </a>
          </li>
          </ul>

        {/* <p class="menu-label">About</p> */}
        <ul class="menu-list">
          
          {/* <li>
            <a class="has-icon">
              <span class="icon"><i class="mdi mdi-help-circle"></i></span>
              <span class="menu-item-label">About</span>
            </a>
          </li> */}
          {/* <li>
            <a href="/" class="has-icon">
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