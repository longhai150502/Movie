import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper";


export default function AppMobile() {
  return (
    <div 
    style={{
        backgroundImage: 'url(http://demo1.cybersoft.edu.vn/static/media/backapp.b46ef3a1.jpg)',
        backgroundSize: 'contain'
    }}
    id='ungDung' className='relative pt-32 pb-20'>
        <div className='flex justify-center'>
            <div className='flex w-3/5 justify-center'>
                <div className='w-2/3 p-4  text-white'>
                    <p className='font-bold mb-8 text-4xl'>Ứng dụng tiện lợi dành cho</p>
                    <p className='font-bold mb-8 text-4xl'>người yêu điện ảnh</p>
                    <p className='mb-8 mt-16 text-lg'>Không chỉ đặt vé, bạn còn có thể bình luận phim, chấm điểm rạp và đổi quà hấp dẫn.</p>
                    <a className='py-3 px-8 bg-red-600 mt-8 rounded font-bold text-xl' href="/#"><span>App miễn phí - Tải về ngay!</span></a>
                    <p className='mt-8'>TIX có hai phiên bảnIOS&Android</p>
                </div>
                <div className='relative w-1/3 ml-5'>
                    <img className='w-52 h-11/12' src="https://i.ibb.co/smKg7xh/mobile.png" alt="" />
                    <div className='absolute top-0 left-0 w-48 h-11/12 ml-2 mt-2'>
                        <Swiper
                        style={{
                            borderRadius: 20,
                        }}
                            centeredSlides={true}
                            autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                            }}

                            modules={[Autoplay, Pagination, Navigation]}
                            className="mySwiper"
                        >
                            <SwiperSlide>
                                <div>
                                    <img src="http://demo1.cybersoft.edu.vn/static/media/banner-slider-3.33a486d1.jpg" alt="" />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div>
                                    <img src="http://demo1.cybersoft.edu.vn/static/media/banner-slider-5.8a084f78.jpg" alt="" />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div>
                                    <img src="http://demo1.cybersoft.edu.vn/static/media/banner-slider-6.0b2b382d.jpg" alt="" />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div>
                                    <img src="http://demo1.cybersoft.edu.vn/static/media/banner-slider-4.16bf933f.jpg" alt="" />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div>
                                    <img src="http://demo1.cybersoft.edu.vn/static/media/banner-slider-1.c4d5fe9e.jpg" alt="" />
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div>
                                    <img src="http://demo1.cybersoft.edu.vn/static/media/banner-slider-2.454924ec.jpg" alt="" />
                                </div></SwiperSlide>
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
