import React, { useState } from 'react'
import { message, Select } from 'antd';
import axios from 'axios';
import { BASE_URL, createConfig } from '../../../Service/configURl';
import { useNavigate } from 'react-router-dom';
import moment from 'moment/moment';

export default function MovieNav({ movieArr }) {
  let [maPhim, setMaPhim] = useState("")
  let [heThongRap, setheThongRap] = useState([])
  let [lichChieu, setLichChieu] = useState([])
  let [maLichChieu, setMaLichChieu] = useState([])
  let navigate = useNavigate()
  let loadApi = (value)=>{
    axios({
      url: `${BASE_URL}/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${value}`,
      method: "GET",
      headers: createConfig(),
    })
    .then((res) => {
      setheThongRap(res.data.content)
    }).catch((err) => {
      console.log(err);
    });
  }

  let handleChange  = (value) => {
      movieArr.map((movie)=>{
        if(movie.tenPhim == value){
          setMaPhim(movie.maPhim)
          loadApi(movie.maPhim)
        }
      })
  }

  let handleChangeRapChieu = (value) => {
    heThongRap.heThongRapChieu?.map((cumRap)=>{
      cumRap.cumRapChieu.map((rapChieu)=>{
        if(rapChieu.maCumRap == value) {
          setLichChieu(rapChieu.lichChieuPhim)
        }
      })
    })
  }

  let handleChangeLichChieu = (value) => {
    lichChieu.map((time)=>{
      if(time.maLichChieu == value){
        setMaLichChieu(time.maLichChieu)
      }
    })
  }

  let handleBooking = () => {
    if(maPhim == "" ){
      message.error("Vui lòng nhập tên phim !")
    }
    else if(maLichChieu == "" ){
      message.error("Vui lòng chọn lịch chiếu !")
    }
    else {
      navigate(`/booking/${maLichChieu}`)
    } 
  }

  return (
    <div className='w-full flex justify-center items-center bg-white'>
      <div className='flex justify-center items-center p-5 w-2/3 shadow-md'>
          <Select
                showSearch
                placeholder = "Chọn tên phim" 
                style={{
                  width: 250,
                }}
                onChange={handleChange}
                size={'large'}
                className='shadow rounded-lg'
                id="scrollableDiv"
              >
                {movieArr.map((movie) =>{
                  return (
                    <Select.Option key={movie.maPhim} value={movie.tenPhim}>{movie.tenPhim}</Select.Option>
                  )
                })}
              </Select>
              <Select
                className='m-2 shadow rounded-lg'
                style={{
                  width: 250,
                }}
                placeholder = "Chọn rạp chiếu"
                onChange={handleChangeRapChieu}
                size={'large'}
              >
                {heThongRap.heThongRapChieu?.map((cumRap)=>{
                  return cumRap.cumRapChieu.map((rapChieu)=>{
                    return (
                        <Select.Option key={rapChieu.maCumRap} value={rapChieu.maCumRap}>{rapChieu.tenCumRap}</Select.Option>
                    )
                  })
                })}
              </Select>
              <Select
                style={{
                  width: 250,
                }}
                placeholder = "Chọn lịch chiếu"
                onChange={handleChangeLichChieu}
                size={'large'}
                className='shadow rounded-lg'
              >
                {lichChieu.map((time)=>{
                  return (
                    <Select.Option key={time.maLichChieu} value={time.maLichChieu}>{moment(time.ngayChieuGioChieu).format("DD/MM/YYYY - hh:mm A")}</Select.Option>
                  )
                })}
              </Select>
              <button onClick={handleBooking} className='py-2 mx-3 px-4 bg-red-500 rounded text-white'>Đặt vé</button>
      </div>
    </div>
  )
}
