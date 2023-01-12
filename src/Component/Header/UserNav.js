/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { userLocalService } from '../../Service/localStorageService';
import { Dropdown, Space } from 'antd';
import { AiOutlineMenuFold } from "react-icons/ai";


export default function UserNav() {

  let user = useSelector((state) => {
    return state.userSlice.userInfor;
  });

  let handleLogout = () => {
    userLocalService.remove();
    window.location.href = "/"
  }

  let renderContent = () => {
    if(user) {
      const items = [
        {
          label: <NavLink to={`/taikhoan/${user.hoTen}`} ><span className=''>Thông tin tài khoản</span></NavLink>,
          key: '0',
        },
        {
          type: 'divider',
        },
        {
          label: <button onClick={handleLogout} >Đăng xuất</button>,
          key: '2',
        },
      ];
      return (
        <div>
          <span className='mr-2 text-xl font-semibold text-blue-500'>Hello!</span>
          <Dropdown
            menu={{
              items,
            }}
            trigger={['click']}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space className=''>
                <p className='text-lg'>{user.hoTen}</p>
                <AiOutlineMenuFold className='text-2xl hover:text-blue-500 cursor-pointer' />
              </Space>
            </a>
          </Dropdown>
        </div>
      )
    } else {
      return (
        <div>
          <NavLink className={'border-r-2 p-2'} to={"/login"}>
            <button class="group relative h-8 w-20 overflow-hidden rounded-sm bg-white text-md shadow">
              <div class="absolute inset-0 w-2 bg-amber-400 transition-all duration-[250ms] ease-out group-hover:w-full"></div>
              <span class="relative text-black group-hover:text-white">Đăng nhập</span>
            </button>
          </NavLink>
          <NavLink className={'m-3'} to={`/dangki`} ><span className='hover:text-blue-600 hover:border-b-2 text-base p-1'>Đăng kí</span></NavLink>
        </div>
      )
    }
  }
  return (
    <div className='space-x-5'>{renderContent()}</div>
  )
}
