import React from 'react'
import Footer from '../Component/Footer/Footer'
import Header from '../Component/Header/Header'

export default function Layout({children}) {
  return (
    <div className='space-y-5'>
        <Header />
        {/* <Component /> */}
        {children}
        <Footer/>
    </div>
  )
}
