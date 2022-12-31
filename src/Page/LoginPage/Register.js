
import React from 'react';
import {Button, Form, Input, message, } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { userService } from '../../Service/userService';

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
export default function Register() {
  const [form] = Form.useForm();
  let navigate = useNavigate()
  const onFinish = (values) => {
    console.log('Received values of form: ', values);
    userService.dangKi(values)
    .then((res) => {
      message.success("Đăng kí thành công");
      setTimeout(()=>{
        navigate("/login");
      }, 700)
    }).catch((err) => {
      console.log(err);
      message.err("Đăng kí thất bại");
    });
  };
  return (
    <div className='top-1/2 left-1/2 translate-x-1/2 translate-y-1/4 w-1/2 flex justify-center items-center p-5 bg-blue-100 rounded-md shadow-xl '>
      <div className='w-1/3'>
        <span className='text-3xl font-semibold'>Đăng kí</span>
        <img className='mt-3 shadow-lg' src="https://colorlib.com/etc/regform/colorlib-regform-7/images/signin-image.jpg" alt="" />
      </div>
      <div className='w-2/3 p-2'>
        <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
        <Form.Item
          name="maNhom"
          initialValue={"GP00"}
          >
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
        >
          <Input />
        </Form.Item>

        <Form.Item
              label="Tên đăng nhập"
              name="taiKhoan"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập trường này!',
                },
              ]}
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
        >
          <Input.Password />
        </Form.Item>

        <Form.Item {...tailFormItemLayout}>
          <Button className="bg-blue-500 text-white hover:bg-white" htmlType="submit">
            Tạo tài khoản
          </Button>
          <NavLink className={"border-b border-blue-500 ml-10"} to={"/login"}>Bạn đã có tài khoản?</NavLink>
        </Form.Item>
        </Form>
      </div>
    </div>
  )
}
