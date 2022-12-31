import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { BASE_URL, createConfig } from '../../Service/configURl';
import { Progress, Tabs } from 'antd';
import './detailMovie.css'
import { BsFillShareFill, BsFillHeartFill, BsFillChatSquareFill } from "react-icons/bs";
import moment from 'moment'
export default function DetailPage() {
    let params = useParams();
    let [detailMovie, setDetailMovie] = useState([]);
    useEffect(()=>{
      axios({
        url: `${BASE_URL}/api/QuanLyRap/LayThongTinLichChieuPhim?MaPhim=${params.id}`,
        method: "GET",
        headers: createConfig(),
      })
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
  return (
    <div>
      <div class="movie_card" id="bright">
        <div className='flex'>
          <div className="info_section w-1/3 h-full">
            <div className="movie_header flex">
              <div className='detail-img'>
                <img className="locandina" src={detailMovie.hinhAnh} />
              </div>
              <div>
                <Progress type='circle' percent={detailMovie.danhGia *10} format={(number)=>{return `${number/10} điểm`}}></Progress>
                <h1>{detailMovie.tenPhim}</h1>
                <h4>2017, David Ayer</h4>
              </div>
            </div>
            <div className="movie_social">
              <ul>
                <li><BsFillShareFill /></li>
                <li><BsFillHeartFill/> </li>
                <li><BsFillChatSquareFill/></li>
              </ul>
            </div>
          </div>
          <div className="w-2/3 h-full blur_back bright_back">
            <iframe className='trailer' src={detailMovie.trailer} frameborder="0"></iframe>
            <div className="movie_desc">
              <p className="text">
                {detailMovie.moTa}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <Tabs
          tabPosition='left'
          defaultActiveKey="1"
          onChange={onChange}
          items = {detailMovie.heThongRapChieu?.map((heThongRap)=>{
            return {
              label: <img className='h-16 w-16 object-cover' src={heThongRap.logo} alt="" />,
              key: heThongRap.maHeThongRap,
              children: (
                <div className='p-5'>
                  {heThongRap.cumRapChieu.map((cumRap)=>{
                      return (
                        <div className='w-1/2 grid grid-cols-3 gap-5'>
                          {cumRap.lichChieuPhim.slice(0, 6).map((lichChieu)=>{
                            return <NavLink to={`/booking/${lichChieu.maLichChieu}`}>
                                      <span className='bg-red-500 text-white rounded p-2 m-3'>
                                        {moment(lichChieu.ngayChieuGioChieu).format("DD/MM/YYYY - hh:mm")}
                                      </span>
                                    </NavLink>
                          })}
                        </div>
                      )
                    })}
                </div>
              )
            }
          })}
        />
      </div>
    </div>
  )
}

