import React from 'react'
import { useSelector } from 'react-redux'
import { PacmanLoader } from 'react-spinners'

export default function Spinner() {
  let { isLoading } = useSelector((state)=> state.spinnerSlice );
  return isLoading ? (
    <div className='bg-slate-50 fixed w-screen h-screen z-20 top-0 left-0 flex items-center justify-center' >
        <PacmanLoader color="#36d7b7" />
    </div>
  ):(<></>)
}