import React from 'react'
import DriveCard from './DriveCard'

import Navbar from './navBar'
import SideNav from './sideNav'

export default function Drive() {
  return (
    <>
        <Navbar />
        <SideNav margin="2rem" />
        <DriveCard />
    </>
  )
}
