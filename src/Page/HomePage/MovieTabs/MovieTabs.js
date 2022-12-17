import React, { useEffect, useState } from 'react'
import { movieService } from '../../../Service/movieService'
import { Tabs } from 'antd';
const onChange = (key) => {
  console.log(key);
};
export default function MovieTabs() {
    const [dataMovie, setDataMovie] = useState([]);
    useEffect(() => {
        movieService.getPhimTheoHeThongRap()
        .then((res) => {
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
                                label: <div><p>{cumRap.tenCumRap}</p></div>,
                                key: cumRap.maCumRap,
                                items: [],
                            }
                        })}
                    />
                ),
            }
        })
    }
  return (
    <div>
        <Tabs
            tabPosition='left'
            defaultActiveKey="1"
            onChange={onChange}
            items = {renderHeThongRap()}
        />
    </div>
  )
}
