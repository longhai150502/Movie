import React from 'react'
import Header from '../Component/Header/Header'

export default function Layout({Component}) {
  return (
    <div>
        <Header />
        <Component />
    </div>
  )
}
