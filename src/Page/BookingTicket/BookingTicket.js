import { message } from 'antd'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import swal from 'sweetalert'
import { https } from '../../Service/configURl'
import { userService } from '../../Service/userService'
import './bookingTicket.css'

export default function BookingTicket() {
  let [thongTinPhongVe, setThongTinPhongVe] = useState([])
  let params = useParams()
  let [dsGheChon, setDsGheChon] = useState([])

  useEffect(() => {
    https.get(`/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${params.maLichChieu}`)
    .then((res) => {
      setThongTinPhongVe(res.data.content)
    }).catch((err) => {
      console.log(err);
    });
  }, [params.maLichChieu])
  console.log(dsGheChon)
  
  let datGhe = (ghe) => {
    let index = dsGheChon.findIndex((gheDangChon)=>gheDangChon.maGhe === ghe.maGhe);

    if(index !== -1){
      dsGheChon.splice(index, 1);
    } else {
      dsGheChon = [...dsGheChon, ghe]
    }
    setDsGheChon([...dsGheChon]);
  }

  let renderGhe = (daDat, ghe) => {
    if(daDat){
      return <span className='w-9 h-9 mb-2 bg-slate-500 rounded flex justify-center items-center'>X</span>
    }else {
      let classActive = "";
      let index = dsGheChon.findIndex((gheDangChon)=>gheDangChon.maGhe === ghe.maGhe)
      if(index !== -1) {
        classActive = "activeSelected";
      }
      let classGheVip = "";
      if(ghe.loaiGhe === "Vip"){
        classGheVip = "gheVip";
      }
      return (
        <button
         className={`hover:bg-blue-800 w-9 h-9 mb-2 bg-slate-300 rounded ${classGheVip} ${classActive}`}
         onClick={()=>{datGhe(ghe)}}
        >{ghe.tenGhe}</button>
      )
    }
  }

  const renderDanhSachGhe = () => {
    return thongTinPhongVe.danhSachGhe?.map((ghe)=>{
      return (
        <div>{renderGhe(ghe.daDat, ghe)}</div>
      )
    })
  }

  let renderTongTien = () => {
    return dsGheChon.reduce((tongTien, gheChon)=> {
      return (
        tongTien += gheChon.giaVe
      )
    }, 0).toLocaleString();
  }


  let datVe = () => {
    if(dsGheChon == "") {
      message.error("Vui l??ng ch???n gh???")
    }else
    if(!localStorage.getItem("USER_LOGIN")){
      swal({
        title: "B???n ch??a ????ng nh???p",
        text: "Vui l??ng ????ng nh???p ????? ?????t v?? !",
        icon: "warning",
        buttons: "OK"
      });
    } else {
      let thongTinDatVe = {
        maLichChieu: params.maLichChieu,
        danhSachVe: dsGheChon,
        taiKhoanNguoiDung: JSON.parse(localStorage.getItem("USER_LOGIN")).taiKhoan,
      };
      userService.datVe(thongTinDatVe)
      .then((res) => {
        swal({
          title: "?????t v?? th??nh c??ng",
          text: "Ch??c b???n xem phim vui v??? !",
          icon: "success",
          buttons: "OK"
        });
        setTimeout(() => {
          window.location.reload();
        }, 1500);
        console.log(res.data)
      }).catch((err) => {
        message.error("?????t v?? th???t b???i")
        console.log(err);
      });
    }
  }
  console.log(thongTinPhongVe);
  return (
    <div style={{
      backgroundImage: `url('${thongTinPhongVe.thongTinPhim?.hinhAnh}')`,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }} className='booking container flex py-20 items-center'>
      <div className='w-2/3 z-10'>
        <div className='flex justify-center'>
          <div className='dsGhe w-2/3'>
            {renderDanhSachGhe()}
          </div>
        </div>
        <div className='flex justify-center items-center'>
          <div className='grid grid-cols-1'>
            <button className='w-9 h-9 mb-2 bg-slate-500 rounded'>X</button>
            <span className='text-white'>???? ?????t</span>
          </div>
          <div className='grid grid-cols-1 m-5'>
            <button className='w-9 h-9 mb-2 bg-slate-300 rounded'></button>
            <span className='text-white'>Th?????ng</span>
          </div>
          <div className='grid grid-cols-1'>
            <button className='w-9 h-9 mb-2 bg-yellow-400 rounded'></button>
            <span className='text-white'>Vip</span>
          </div>
        </div>
      </div>
      
      <div class="ticket rounded">
        <div class="title__ticket mx-3">
          <p class="cinema">{thongTinPhongVe.thongTinPhim?.tenCumRap}</p>
          <p class="movie-title">{thongTinPhongVe.thongTinPhim?.tenPhim}</p>
        </div>
        <div class="poster">
          <img src={thongTinPhongVe.thongTinPhim?.hinhAnh} alt="" />
        </div>
        <div class="info bg-white">
          <div>
            <p className='font-semibold'>?????a ch???: {thongTinPhongVe.thongTinPhim?.diaChi}</p>
          </div>
          <table>
            <tr>
              <th>T??n r???p</th>
              <th>Gh??? ch???n:</th>
            </tr>
            <tr>
              <td class="bigger">{thongTinPhongVe.thongTinPhim?.tenRap}</td>
              <td class="bigger">{dsGheChon.map((ghe)=>{
                    return <span className='mr-2'>Gh??? {ghe.tenGhe},</span>
                  })}
              </td>
            </tr>
          </table>
          <div class="holes-lower"></div>
          <table>
            <tr>
              <th>T???ng ti???n</th>
              <th>Ng??y</th>
              <th>Gi???</th>
            </tr>
            <tr>
              <td>{renderTongTien()}</td>
              <td>{thongTinPhongVe.thongTinPhim?.ngayChieu}</td>
              <td>{thongTinPhongVe.thongTinPhim?.gioChieu}</td>
            </tr>
          </table>
        <div class="holes-lower"></div>
        <button onClick={()=>{datVe()}} className='bg-red-500 px-5 py-2 rounded text-white w-full'>?????t v??</button>
        </div>
      </div>
    </div>
  )
}
