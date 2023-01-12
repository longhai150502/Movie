import React from 'react'
import Footer from '../Component/Footer/Footer'
import Header from '../Component/Header/Header'

export default function Layout({children}) {
  return (
    <div className=''>
        <Header />
        {/* <Component /> */}
        {children}
        <div className='relative'>
          <Footer/>
        </div>
        <div className='fixed right-10 bottom-10 z-20 bg-red-500 p-2'>
          <button className='text-white'><a href="#">Top</a></button>
        </div>
    </div>
  )
}
