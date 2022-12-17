import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { userLocalService } from '../../Service/localStorageService';

export default function UserNav() {
  let user = useSelector((state) => {
    return state.userReducer.userInfor;
  });

  let handleLogout = () => {
    userLocalService.remove();
    window.location.href = "/"
  }
  let renderContent = () => {
    if(user) {
      return (
        <div>
          <span className='mr-3'>{user.hoTen}</span>
          <button onClick={handleLogout} class="group relative h-9 w-24 overflow-hidden rounded-lg bg-white text-lg shadow">
            <div class="absolute inset-0 w-3 bg-amber-400 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
            <span class="relative text-black group-hover:text-white">Log out</span>
          </button>
        </div>
      )
    } else {
      return (
        <div>
          <NavLink to={"/login"}>
            <button class="group relative h-9 w-24 overflow-hidden rounded-lg bg-white text-lg shadow">
              <div class="absolute inset-0 w-3 bg-amber-400 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
              <span class="relative text-black group-hover:text-white">Login{""}</span>
            </button>
          </NavLink>
          <button class="group relative h-9 w-24 overflow-hidden rounded-lg bg-white text-lg shadow">
            <div class="absolute inset-0 w-3 bg-amber-400 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
            <span class="relative text-black group-hover:text-white">Register</span>
          </button>
        </div>
      )
    }
  }
  return (
    <div className='space-x-5'>{renderContent()}</div>
  )
}
