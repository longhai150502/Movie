
import React from 'react'
import { NavLink } from 'react-router-dom'
import UserNav from './UserNav'

export default function Header() {
  let renderNavbar = () => {
    if (window.location.pathname == '/') {
      return (
        <div className='w-2/5'>
          <ul className='flex justify-between items-center'>
            <li className='font-semibold'><a className='hover:border-b-2 border-blue-500 hover:text-blue-500' href="#movieTab">Lịch Chiếu</a></li>
            <li className='font-semibold'><a className='hover:border-b-2 border-blue-500 hover:text-blue-500' href="#movieList">Phim</a></li>
            <li className='font-semibold'><a className='hover:border-b-2 border-blue-500 hover:text-blue-500' href="#movieTab">Cụm Rạp</a></li>
            <li className='font-semibold'><a className='hover:border-b-2 border-blue-500 hover:text-blue-500' href="#">Tin Tức</a></li>
            <li className='font-semibold'><a className='hover:border-b-2 border-blue-500 hover:text-blue-500' href="#ungDung">Ứng Dụng</a></li>
          </ul>
        </div>
      )
    } else {
      return (
        <div className='w-2/5'>
          <ul className='flex justify-between items-center'>
            <li className='font-semibold'><NavLink className='hover:border-b-2 border-blue-500 hover:text-blue-500' to={'/'}>Lịch Chiếu</NavLink></li>
            <li className='font-semibold'><NavLink className='hover:border-b-2 border-blue-500 hover:text-blue-500' to={'/'}>Phim</NavLink></li>
            <li className='font-semibold'><NavLink className='hover:border-b-2 border-blue-500 hover:text-blue-500' to={'/'}>Cụm Rạp</NavLink></li>
            <li className='font-semibold'><NavLink className='hover:border-b-2 border-blue-500 hover:text-blue-500' to={'/'}>Tin Tức</NavLink></li>
            <li className='font-semibold'><NavLink className='hover:border-b-2 border-blue-500 hover:text-blue-500' to={'/'}>Ứng Dụng</NavLink></li>
          </ul>
        </div>
      )
    }
  }
  return (
    <div className='w-full fixed top-0 z-50 bg-white opacity-90 flex justify-between px-10 py-5 shadow shadow-black items-center'>
        <NavLink to={"/"}>
            <span>Movie</span>
        </NavLink>
        {renderNavbar()}
        <UserNav />
    </div>
  )
}
