import React from 'react'
import { NavLink } from 'react-router-dom'
import UserNav from './UserNav'

export default function Header() {
  return (
    <div className='flex justify-between px-10 py-5 shadow shadow-black items-center'>
        <NavLink to={"/"}>
            <span>Movie</span>
        </NavLink>
        <UserNav />
    </div>
  )
}
