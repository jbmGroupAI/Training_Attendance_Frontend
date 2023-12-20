
import React, { useState } from 'react';
import { Form, Input, Button, Checkbox } from 'antd';
import loginImg from './login.png';
import Swal from 'sweetalert2';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

const Login = ({ setIsAuthenticated }) => {
  const adminEmail = 'admin@example.com';
  const adminPassword = 'qwerty';
  const [email, setEmail] = useState(adminEmail);
  const [password, setPassword] = useState(adminPassword);

 

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
          setIsAuthenticated(true);

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
    //<div className="small-container"></div>
    <div className="small-container">
      <div className="sItem">
        <div className="loginImage">
          <img src={loginImg} width="300" style={{ position: 'relative' }} alt="login" />
        </div>
        <div className="loginForm">
          <h2>Login</h2>
          <Form onFinish={onFinish}>
            <Form.Item>
              <Input
                prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="Email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Input
                prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <Checkbox>Remember me</Checkbox>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div className="footer">
        <a href="" target="_blank" rel="noopener noreferrer" className="footerLink">
          Powered by ThirdEye AI
        </a>
      </div>
    </div>
  );
};

export default Login;

