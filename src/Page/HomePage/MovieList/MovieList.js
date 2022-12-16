import React from 'react'
import { Card } from 'antd';
import { NavLink } from 'react-router-dom';
const { Meta } = Card;
export default function MovieList({movieArr}) {
    let renderMovieList = () => {
        return movieArr.map((item)=>{
            return (
                <Card
                hoverable
                style={{
                width: "100%",
                }}
                cover={<img className='h-80 object-cover' alt="example" src={item.hinhAnh} />}
            >
                <Meta title={item.tenPhim} description="www.instagram.com" />
                <NavLink to={`/detail/${item.maPhim}`} className={"bg-red-500 px-5 py-2 rounded text-white"}>
                    Detail
                </NavLink>
            </Card>
            )
        })
    }
  return (
    <div className='grid grid-cols-5 gap-5' >{renderMovieList()}</div>
  )
}

