import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom';
import { BASE_URL, createConfig } from '../../Service/configURl';
import { Tabs, Descriptions, Button, List , Empty ,Modal , Form , Input} from 'antd';
import { USER_LOGIN } from '../../Service/localStorageService';
import moment from 'moment';
import swal from 'sweetalert';


export default function UserInfor() {

  const info = JSON.parse(localStorage.getItem("USER_LOGIN"))
  let [thongTin, setThongTin] = useState([]);

  useEffect(()=>{
    axios({
      url: `${BASE_URL}/api/QuanLyNguoiDung/ThongTinTaiKhoan`,
      method: "POST",
      data: JSON.parse(localStorage.getItem(USER_LOGIN)),
      headers: createConfig(),
    })
    .then((res) => {
      console.log(res.data)
      setThongTin(res.data.content);    
    }).catch((err) => {
      console.log(err);
    });
  }, [])

  console.log(thongTin)

  let renderLinkAdmin = () => {
    if(info.maLoaiNguoiDung == "QuanTri"){
      return (
        <Button className=''><NavLink to="/admin/user">Trang quản trị</NavLink></Button>
      )
    }
  }

  let renderVeDaDat = () => {
    if(thongTin.thongTinDatVe == ""){
      return (
        <div className='flex justify-center items-center'>
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{
              height: 300,
              width: 500,
            }}
            description={
              <span>
                Lịch sử đặt vé trống !
              </span>
            }
          >
            <Button className="hover:bg-blue-500"><NavLink className={'hover:text-white'} to={'/'}>Create Now</NavLink></Button>
          </Empty>
        </div>
      )
    } else {
      return (
        <div className='w-full'>
            <List  
            className=''
                  id="scrollableDiv" 
                  style={{
                      height: 550,
                      overflow: 'auto',
                      padding: '0 16px',
                      border: '1px solid rgba(140, 140, 140, 0.35)',
                  }}
                >
                  {thongTin.thongTinDatVe?.map((veDat)=>{
                    return (
                      <div className='p-3 flex justify-around items-center border-b-2'>
                        <img className='w-36 h-52' src={veDat.hinhAnh} alt="" />
                        <div className='border-r-2 p-2'>
                          <p className='font-medium'>Tên phim: <span className='text-lg'>{veDat.tenPhim}</span></p>
                          <p className='mt-3 mb-4'>Giá vé: {veDat.giaVe}Đ</p>
                          <p className='mb-4'>Thời lượng phim: {veDat.thoiLuongPhim} phút</p>
                          <span className='bg-blue-500 p-2 rounded mt-5 text-white'>{moment(veDat.ngayDat).format("DD/MM/YYYY - hh:mm A")}</span>
                        </div>
                        <div className='w-2/3'>
                          <Descriptions title="Thông tin danh sách ghế đặt:">
                              {veDat.danhSachGhe.map((thongTinGhe)=> {
                                return (
                                  <div className='flex'>
                                      <Descriptions.Item label="Hệ thống rạp">Hệ thống rạp: {thongTinGhe.tenHeThongRap}: </Descriptions.Item>
                                      <Descriptions.Item className='' label="Tên rạp"> {thongTinGhe.tenRap}: </Descriptions.Item>
                                      <Descriptions.Item label="Ghế đã đặt"> ghế {thongTinGhe.tenGhe}</Descriptions.Item>
                                  </div>
                                )
                              })}
                          </Descriptions>
                        </div>
                      </div>
                    )
                  })}
          </List>            
        </div>
      )
    }
  }

  const onChange = (key) => {
    if(key == 2 && thongTin.thongTinDatVe == ""){
      swal({
        title: "Danh sách trống",
        buttons: "OK"
      });
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const [form] = Form.useForm()
  const onFinish = (values) => {
    axios({
      url: `${BASE_URL}/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung`,
      method: "PUT",
      data: values,
      headers: createConfig(),
    })
    .then((res) => {
      swal({
        title: "Sửa thông tin thành công",
        icon: "success",
      })
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }).catch((err) => {
      swal({
        title: err.response.data,
        text: "Điền lại thông tin!",
        icon: "warning",
        button: "OK",
      });
      console.log(err)
    });
  }
  const formItemLayout = {
    labelCol: {
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  return (
    <div className='container p-10 pt-20'>
      <Tabs
        defaultActiveKey="1"
        onChange={onChange}
        items={[
          {
            label: `Thông tin tài khoản`,
            key: '1',
            children: (
              <div className='w-4/5 p-5'>
                <Descriptions title="Thông tin người dùng">
                  <Descriptions.Item label="Họ và tên">{thongTin.hoTen}</Descriptions.Item>
                  <Descriptions.Item label="Tên đăng nhập">{thongTin.taiKhoan}</Descriptions.Item>
                  <Descriptions.Item label="Email">{thongTin.email}</Descriptions.Item>
                  <Descriptions.Item label="Số điện thoại">{thongTin.soDT}</Descriptions.Item>
                </Descriptions>
                <div>
                  
                    <Button onClick={showModal}>
                      Chỉnh sửa thông tin
                    </Button>
                    <Modal title="Thông tin tài khoản" open={isModalOpen}  onCancel={handleCancel} footer={[]}>
                      <Form
                        {...formItemLayout}
                        form={form}
                        name="register"
                        onFinish={onFinish}
                        scrollToFirstError
                      >
                        <Form.Item
                          name="maNhom"
                          initialValue={thongTin.maNhom}
                          >
                        </Form.Item>
                    
                        <Form.Item
                              label="Tên đăng nhập"
                              name="taiKhoan"
                              initialValue={thongTin.taiKhoan}
                            >
                              <Input disabled={true} />
                          </Form.Item>
                        
                        <Form.Item
                          name="hoTen"
                          label="Họ tên"
                          rules={[
                            {
                              required: true,
                              message: 'Vui lòng nhập họ tên!',
                              whitespace: true,
                            },
                          ]}
                          initialValue={thongTin.hoTen}
                        >
                          <Input />
                        </Form.Item>

                        <Form.Item
                          name="email"
                          label="E-mail"
                          rules={[
                            {
                              type: 'email',
                              message: 'Nhập đúng định dạng E-mail!',
                            },
                            {
                              required: true,
                              message: 'Vui lòng nhập trường này!',
                            },
                          ]}
                          initialValue={thongTin.email}
                        >
                          <Input />
                        </Form.Item>

                        <Form.Item
                          name="soDt"
                          label="Điện thoại"
                          rules={[
                            {
                              required: true,
                              message: 'Vui lòng nhập trường này!',
                            },
                          ]}
                          initialValue={thongTin.soDT}
                        >
                          <Input/>
                        </Form.Item>

                        <Form.Item
                          name="matKhau"
                          label="Mật khẩu"
                          rules={[
                            {
                              required: true,
                              message: 'Vui lòng nhập trường này!',
                            },
                          ]}
                          hasFeedback
                          initialValue={thongTin.matKhau}
                        >
                          <Input.Password />
                        </Form.Item>

                        <Form.Item
                          name="maLoaiNguoiDung"
                          initialValue={'KhachHang'}
                          >
                        </Form.Item>

                        <Form.Item {...tailFormItemLayout}>
                          <Button className="bg-blue-500 text-white hover:bg-white -mt-5" htmlType="submit">
                            Cập nhật thông tin
                          </Button>
                        </Form.Item>
                      </Form>
                    </Modal>
                  
                  {renderLinkAdmin()}
                </div>
              </div>
            ),
          },
          {
            label: `Lịch sử đặt vé`,
            key: '2',
            children: (
              <div>
                {renderVeDaDat()}
              </div>
            ),
          },
        ]}
      />
    </div>
  )
}
