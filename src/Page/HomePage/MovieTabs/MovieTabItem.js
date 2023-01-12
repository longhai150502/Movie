
import moment from 'moment'
import React from 'react'
import { NavLink } from 'react-router-dom'

export default function MovieTabItem({ movie }) {

  return (
    <div className='flex p-2 border-b-2'>
            <NavLink to={`/detail/${movie.maPhim}`}>
              <img className='w-24 h-40 object-cover mr-3 rounded' src={movie.hinhAnh} alt="" />
            </NavLink>
            <div>
                <h5 className='font-medium mb-3'>{movie.tenPhim}</h5>
                <div className='grid grid-cols-3 gap-2'>{movie.lstLichChieuTheoPhim.slice(0, 6).map((items) => {
                    return <NavLink className={"m-1"} to={`/booking/${items.maLichChieu}`}>
                              <span className='bg-red-500 text-white rounded p-2'>
                                {moment(items.ngayChieuGioChieu).format("DD/MM/YYYY - hh:mm A")}
                              </span>
                            </NavLink>
                })}</div>
            </div>
    </div>
  )
}
