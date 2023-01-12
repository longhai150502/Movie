/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import { Card } from 'antd';
import { NavLink } from 'react-router-dom';
import Slider from "react-slick";
import "./card.css";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


const { Meta } = Card;

export default function MovieList({movieArr}) {
  
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 3,
        rows: 2,
        autoplay: true,
        responsive: [
            {
              breakpoint: 1024,
              settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
              }
            },
            {
              breakpoint: 600,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2,
                dots:false
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                dots:false
              }
            }
          ]
      };
    let renderMovieList = () => {
        return movieArr.map((item)=>{
            return (
              <div className="cards cards--two">
                <img src={item.hinhAnh} className="img-responsive"/>
                <span className="cards--two__rect"></span>
                <span className="cards--two__tri"><a href={`/detail/${item.maPhim}`}>Trailer</a> 
                </span>
                <ul className="cards__list">
                  <li><NavLink to={`/detail/${item.maPhim}`}>Chi tiết</NavLink></li>
                  <li><NavLink to={`/detail/${item.maPhim}`}>Đặt vé</NavLink></li>
                </ul>
                <p>{item.tenPhim}</p>
              </div>
            )
        })
    }
  return (
        <div id='movieList' className='relative py-10 px-56 mx-0 my-auto'>
            <Slider {...settings}>
                 {renderMovieList()}
            </Slider>
        </div>
  )
}

