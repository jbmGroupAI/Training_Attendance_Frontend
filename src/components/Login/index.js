import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import loginImg from './login.png';
import Swal from 'sweetalert2';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import "../../components/Login/index.css"
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const adminEmail = 'admin@example.com';
  const adminPassword = 'qwerty';
  const [email, setEmail] = useState(adminEmail);
  const [password, setPassword] = useState(adminPassword);

 const navigate = useNavigate()

  const onFinish = () => {
    if (email === adminEmail && password === adminPassword) {
      Swal.fire({
        timer: 1500,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          localStorage.setItem('is_authenticated', true);
          navigate('/', { replace: true });
          Swal.fire({
            icon: 'success',
            title: 'Successfully logged in!',
            showConfirmButton: false,
            timer: 1500,
          });
        },
      });
    } else {
      Swal.fire({
        timer: 1500,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Incorrect email or password.',
            showConfirmButton: true,
          });
        },
      });
    }
  };

  return (
    <>
    <div className='container align-items-center p-5 m-5'>
      <div className='d-flex justify-content-between m-auto'>
        <div className='col-7 m-auto'>
        <img src={loginImg} width="300" alt="login" />
        </div>
        <div className='col-5 border bg-white p-5 rounded-4'>
        <h2>Login</h2>
          <Form onFinish={onFinish}>
            <Form.Item>
              <Input
                prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className='login-input'
              />
            </Form.Item>
            <Form.Item>
              <Input
                prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className='login-input'
              />
            </Form.Item>
            <Form.Item>
              <Checkbox>Remember me</Checkbox>
              <div className='mt-3'>
              <Button type="primary" htmlType="submit" className="btn-login">
                Log in
              </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
      <div className="footer">
        <a href="" target="_blank" rel="noopener noreferrer" className="footerLink">
          Powered by ThirdEye AI
        </a>
      </div>
    </>
  );
};

export default Login;

