import React from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button } from 'antd';
import { UserOutlined, MailOutlined, LockOutlined } from '@ant-design/icons';
import config from "../../config.json"

const SignUpForm = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(`${config.url}/auth/register`, values);
      console.log('User signed up successfully!', response.data);
      
      Swal.fire({
        icon: 'success',
        title: 'Successfully signed up!',
        showConfirmButton: false,
        timer: 1500,
      });

      navigate('/ta/login', { replace: true });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Failed to sign up. Please try again.',
        showConfirmButton: true,
      });
    }
  };

  const passwordValidator = (_, value) => {
    if (!value) {
      return Promise.reject(new Error('Please input your Password!'));
    } else if (!/(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]/.test(value)) {
      return Promise.reject(new Error('Password must contain at least 1 letter and 1 number'));
    }
    return Promise.resolve();
  };

  return (
    <div className='container align-items-center p-5 m-5'>
      <div className='col-5 border bg-white p-5 rounded-4 m-auto'>
        <h3>Create Account</h3>
        <Form form={form} onFinish={handleSubmit}>
          <Form.Item
            name="name"
            rules={[{ required: true, message: 'Please input your Name!' }]}
          >
            <Input
              prefix={<UserOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder='Name'
              className='signup-input'
            />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, message: 'Please input your Email!' }]}
          >
            <Input
              prefix={<MailOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder='Email'
              type='email'
              className='signup-input'
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              { required: true, message: 'Please input your Password!' },
              { validator: passwordValidator }
            ]}
          >
            <Input
              prefix={<LockOutlined style={{ color: 'rgba(0,0,0,.25)' }} />}
              type='password'
              placeholder='Password'
              className='signup-input'
            />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' className='btn-signup'>
              Sign Up
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default SignUpForm;
