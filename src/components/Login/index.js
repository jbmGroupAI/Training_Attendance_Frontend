
import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { UserOutlined, LockOutlined, EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';
import axios from 'axios';
import Swal from 'sweetalert2';
import loginImg from './LoginScreen.png';
import "../../components/Login/index.css";
import config from "../../config.json"

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const onFinish = async () => {
    try {
      const response = await axios.post(`${config.url}/auth/login`, {
        email,
        password,
      });
      console.log('Login successful:', response.data);
      localStorage.setItem('is_authenticated', true);
      navigate('/', { replace: true });

      Swal.fire({
        icon: 'success',
        title: 'Successfully logged in!',
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Incorrect email or password.',
        showConfirmButton: true,
      });
    }
  };

  return (
    <>
      <div className=' d-flex align-items-center justify-content-between' style={{width:'100vw', height:'100vh'}}>
        <div className='row w-100' >
          <div className='col-md-5 d-none d-md-block'>
            <img className='w-100' src={loginImg} style={{height:'100vh'}} alt='login' />
          </div>
          <div className='col-md-7'>
            <div className='d-flex justify-content-center align-items-center h-100 w-100'>
          <div className='border bg-white  rounded-4 p-4'>
            <h3>Welcome Back!</h3>
            <Form onFinish={onFinish}>
              <Form.Item>
                <Input
                  prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder='Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='login-input'
                />
              </Form.Item>
              <Form.Item>
                <Input
                  prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                  type={showPassword ? 'text' : 'password'}
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='login-input'
                  suffix={
                    showPassword ? (
                      <EyeInvisibleOutlined onClick={() => setShowPassword(false)} />
                    ) : (
                      <EyeOutlined onClick={() => setShowPassword(true)} />
                    )
                  }
                />
              </Form.Item>
              <Form.Item>
                <Checkbox checked={showPassword} onChange={() => setShowPassword(!showPassword)}>
                  Show Password
                </Checkbox>
                <div className='mt-3 d-flex justify-content-between'>
                  <Button type='primary' htmlType='submit' className='btn-login'>
                    Log in
                  </Button>
                </div>
              </Form.Item>
            </Form>
            <div className='mt-3'>
              Don't have an account? <Link to='/signup'>Sign up</Link>
            </div>
          </div>
          </div>
          </div>

        </div>
      </div>
      <div className='footer'>
        <a href='' target='_blank' rel='noopener noreferrer' className='footerLink'>
          Powered by ThirdEye AI
        </a>
      </div>
    </>
  );
};

export default Login;
