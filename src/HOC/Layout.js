import React from 'react'
import Header from '../Component/Header/Header'

export default function Layout({Component}) {
  return (
    <div className='space-y-5'>
        <Header />
        <Component />
    </div>
  )
}
