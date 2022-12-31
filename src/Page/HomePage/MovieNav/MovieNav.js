import React from 'react'
import { Select } from 'antd';

export default function MovieNav({ movieArr }) {
  console.log(movieArr)
    let searchMovie = () => {
        return (
          <Select
            showSearch
            placeholder = "Search" 
            style={{
              width: 250,
            }}
            mode='multiple'
            maxTagCount={2}
            allowClear
          >
            {movieArr.map((movie) =>{
              return (
                <Select.Option key={movie.maPhim} value={movie.tenPhim}>{movie.tenPhim}</Select.Option>
              )
            })}
          </Select>
        )
    }
  return (
    <div>
        {searchMovie()}
    </div>
  )
}
