import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar'

const MainLoyout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default MainLoyout
