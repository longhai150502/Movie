import React from 'react'
import { Button, Checkbox, Form, Input, message} from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import animationLogin from '../../assets/72874-user-profile-v2.json';
import Lottie from 'lottie-react';
import { setLoginActionService } from '../../redux/actions/userAction';
import { userService } from '../../Service/userService';
import { userLocalService } from '../../Service/localStorageService';
import { setUserInfor } from '../../redux-toolkit/slice/userSlice';

export default function LoginPage() {
    let navigate = useNavigate();
    let dispatch = useDispatch();
    const onFinish = (values) => {
        console.log('Success:', values);
        userService.postDangNhap(values)
        .then((res) => {
          dispatch(setUserInfor(res.data.content))
            message.success("Đăng nhập thành công");
            userLocalService.set(res.data.content);
            setTimeout(() => {
                navigate('/');
            }, 1000)
        }).catch((err) => {
          console.log(err);
            message.error("Đăng nhập thất bại");
        });
    };
    // const onFinishReduxThunk = (values) => {
    //   let onSuccess = () => {
    //     setTimeout(() => {
    //         navigate('/');
    //     }, 1000)
    //   }
    //   dispatch(setLoginActionService(values, onSuccess))
    // }
    const onFinishFailed = (errorInfo) => {
      console.log('Failed:', errorInfo);
    };
  return (
    <div className='w-screen h-screen flex justify-center items-center bg-slate-100'>
      <div className='w-2/3 h-2/3 flex justify-center items-center rounded-md shadow-lg bg-white'>
        <div className='container flex justify-center items-center'>
          <div className='h-full w-1/2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500'>
            <Lottie animationData={animationLogin} loop={true} />
          </div>
          <div className='h-full w-1/2'>
            <Form
            className='ml-14'
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
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
                span: 16,
              }}
            >
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Form.Item
              wrapperCol={{
                span: 16,
              }}
            >
              <Button className='bg-blue-600 text-white mr-3' htmlType="submit">
                Submit
              </Button>
              <NavLink to={"/dangki"}>
                <button class="text-white p-1 px-3 rounded-md bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 ...">
                  Đăng kí
                </button>
              </NavLink>
            </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}
