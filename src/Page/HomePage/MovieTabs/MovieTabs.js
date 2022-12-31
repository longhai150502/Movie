import React, { useEffect, useState } from 'react'
import { movieService } from '../../../Service/movieService'
import { Tabs } from 'antd';
import { List } from 'antd';
import MovieTabItem from './MovieTabItem';

const onChange = (key) => {
  console.log(key);
};
export default function MovieTabs() {
    
    const [dataMovie, setDataMovie] = useState([]);
    useEffect(() => {
        movieService.getPhimTheoHeThongRap()
        .then((res) => {
            console.log(res);
            setDataMovie(res.data.content);
        }).catch((err) => {
            console.log(err);
        });
    }, []);
    let renderHeThongRap = () => {
        return dataMovie.map((heThongRap)=> {
            return {
                label: <img className='h-16 w-16 object-cover' src={heThongRap.logo} alt="" />,
                key: heThongRap.maHeThongRap,
                children: (
                    <Tabs
                        tabPosition='left'
                        defaultActiveKey="1"
                        onChange={onChange}
                        items = {heThongRap.lstCumRap.map((cumRap) => {
                            return {
                                label:  <div className='flex justify-center items-center text-left'>
                                            <img className='shadow shadow-black' style={{width: 80, height: 80}} src={cumRap.hinhAnh} alt="" />
                                            <div className='ml-2'>
                                                <p>{cumRap.tenCumRap}</p>
                                                <p>{cumRap.diaChi}</p>
                                            </div>
                                        </div>,
                                key: cumRap.maCumRap,
                                children: 
                                <List 
                                    id="scrollableDiv" 
                                    style={{
                                        height: 650,
                                        overflow: 'auto',
                                        padding: '0 16px',
                                        border: '1px solid rgba(140, 140, 140, 0.35)',
                                    }}
                                >
                                    {cumRap.danhSachPhim.map((phim) => {
                                        return <MovieTabItem movie={phim} />
                                    })}
                                </List>
                            };
                        })}
                    />
                ),
            }
        })
    }
  return (
    <div className='m-20 border-dashed border-2 border-indigo-600'>
        <Tabs
            tabPosition='left'
            defaultActiveKey="1"
            onChange={onChange}
            items = {renderHeThongRap()}
        />
        
    </div>
  )
}


