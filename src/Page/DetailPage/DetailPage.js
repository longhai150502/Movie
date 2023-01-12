import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { BASE_URL, createConfig, https } from '../../Service/configURl';
import { Progress, Tabs } from 'antd';
import './detailMovie.css'
import { BsFillShareFill, BsFillHeartFill, BsFillChatSquareFill } from "react-icons/bs";
import moment from 'moment'
export default function DetailPage() {
    let params = useParams();
    let [detailMovie, setDetailMovie] = useState([]);
    useEffect(()=>{
      // axios({
      //   url: `${BASE_URL}/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${params.id}`,
      //   method: "GET",
      //   headers: createConfig(),
      // })
      https.get(`/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${params.id}`)
      .then((res) => {
        console.log(res);
        setDetailMovie(res.data.content);
      }).catch((err) => {
        console.log(err);
      });
    }, [params.id])
    console.log(detailMovie);
    const onChange = (key) => {
      console.log(key);
    };
    let renderTinhTrang = () => {
      if(detailMovie.dangChieu == true){
        return <a href="#bookingTab"><button className='bg-slate-800 text-white px-3 py-1 rounded-md'>Đặt vé</button></a>
      }else{
        <span>Trình trạng: Sắp chiếu</span>
      }
    }
  return (
    <div className='container pt-24 bg-gray-800'>
      <div class="movie_card" id="bright">
        <div className='flex'>
          <div className="info_section w-1/3 h-full">
            <div className="movie_header flex justify-between">
              <div className='detail-img p-5'>
                <img className="locandina" src={detailMovie.hinhAnh} />
              </div>
              <div className='p-5'>
                <Progress type='circle' percent={detailMovie.danhGia *10} format={(number)=>{return `${number/10} điểm`}}></Progress>
                <h1 className='text-xl'>Phim: {detailMovie.tenPhim}</h1>
              </div>
            </div>
            <div className="movie_social flex justify-around items-center w-2/3">
              <div>
                {renderTinhTrang()}
              </div>
              <ul>
                <li><BsFillShareFill /></li>
                <li><BsFillHeartFill/> </li>
                <li><BsFillChatSquareFill/></li>
              </ul>
            </div>
          </div>
          <div className="w-2/3 h-full blur_back bright_back flex justify-center items-center">
            <div className='w-4/5'>
              <div className='mb-5'><iframe className='trailer' src={detailMovie.trailer} frameborder="0"></iframe></div>
              <div className="movie_desc">
                <p className="text-white">
                  <p>Mô tả:</p>
                  {detailMovie.moTa}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id='bookingTab' className='bg-white p-20'>
        <div className='mb-10'>
          <p>Chọn lịch chiếu:</p>
        </div>
        <Tabs
          className='border-solid border-2 border-indigo-600 ' 
          tabPosition='left'
          defaultActiveKey="1"
          onChange={onChange}
          items = {detailMovie.heThongRapChieu?.map((heThongRap)=>{
            return {
              label: <img className='h-16 w-16 object-cover' src={heThongRap.logo} alt="" />,
              key: heThongRap.maHeThongRap,
              children: (
                <Tabs
                  tabPosition='left'
                  defaultActiveKey="1"
                  onChange={onChange}
                  items = {heThongRap.cumRapChieu.map((cumRap)=>{
                    return {
                      label:  <div className='flex justify-center items-center text-left'>
                                            <img className='shadow shadow-black' style={{width: 80, height: 80}} src={cumRap.hinhAnh} alt="" />
                                            <div className='ml-2'>
                                                <p>{cumRap.tenCumRap}</p>
                                                <span>{cumRap.diaChi}</span>
                                            </div>
                                        </div>,
                        key: cumRap.maCumRap,
                        children: <div className='grid grid-cols-3 gap-5 mt-2'>
                                    {cumRap.lichChieuPhim.slice(0, 6).map((lichChieu)=>{
                                      return <NavLink to={`/booking/${lichChieu.maLichChieu}`}>
                                                <span className='bg-red-500 text-white rounded p-2 m-3'>
                                                  {moment(lichChieu.ngayChieuGioChieu).format("DD/MM/YYYY - hh:mm A")}
                                                </span>
                                              </NavLink>
                                    })}
                                  </div>
                    }
                  })}
                />
              )
            }
          })}
        />
      </div>
    </div>
  )
}
