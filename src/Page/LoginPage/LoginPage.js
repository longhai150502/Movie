import React from 'react'
import { Button, Checkbox, Form, Input, message } from 'antd';
import { userService } from '../../Service/userService';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { SET_USER_INFOR } from '../../redux/constant/userContant';
    
export default function LoginPage() {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const onFinish = (values) => {
        console.log('Success:', values);
        userService.postDangNhap(values)
        .then((res) => {
          dispatch({
            type: SET_USER_INFOR,
            payload: res.data.content,
          })
            message.success("Dang nhap thanh cong");
            setTimeout(() => {
                navigate('/');
            }, 1000)
        }).catch((err) => {
            message.error("Dang nhap that bai");
        });
      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
  return (
    <div className='w-screen h-screen flex justify-center items-center'>
    <div className='container p-5'>
        <Form
      name="basic"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 24,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      layout='vertical'
    >
      <Form.Item
        label="Username"
        name="taiKhoan"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="matKhau"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 24,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 24,
        }}
      >
        <Button className='bg-blue-600' htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </div>
    </div>
  )
}
