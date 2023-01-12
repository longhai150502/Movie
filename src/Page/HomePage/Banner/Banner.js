import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./styles.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper";
import { https } from '../../../Service/configURl';
import { NavLink } from 'react-router-dom';

export default function Banner() {
    let [banner, setBanner] = useState([])
    useEffect(()=>{
        https.get(`/api/QuanLyPhim/LayDanhSachBanner`)
        .then((res) => {
            console.log(res);
            setBanner(res.data.content)
        }).catch((err) => {
            console.log(err)
        });
    },[])
    console.log(banner)
    let renderBanner = () => {
        return (
            <div>
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                    delay: 3500,
                    disableOnInteraction: false,
                    }}
                    pagination={{
                    clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper"
                >
                    {banner.map((item)=>{
                        return (
                            <SwiperSlide
                                style={{
                                    backgroundImage: `url('${item.hinhAnh}')`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    height: 600
                                }}
                            >
                                <div className='absolute left-32 bottom-20'>
                                    <button className='px-2 py-1 bg-blue-400 rounded text-white mr-3'><NavLink to={`/detail/${item.maPhim}`}>Xem chi tiết</NavLink></button>
                                    <button className='hover:bg-gray-900 px-2 py-1 border-blue-500 border rounded text-white transition'><NavLink to={`/detail/${item.maPhim}`}>Đặt vé</NavLink></button>
                                </div>
                            </SwiperSlide>
                        )
                    })}
                </Swiper>
            </div>
        )
    }
  return (
    <div className='container mt-16 p-1'>
        {renderBanner()}
    </div>
  )
}
