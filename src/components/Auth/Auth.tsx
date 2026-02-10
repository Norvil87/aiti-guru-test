import { useState } from 'react'
import { Alert, Button, Checkbox, Form, Input, notification, Typography } from 'antd';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

import { login } from "../../services/apiRequests.ts"
import AppIcon from '../AppIcon/AppIcon.tsx';
import type { IAuthFormField } from './Auth.types.ts';
import Logo from "../../assets/Logo.svg"
import User from "../../assets/user.svg"
import Lock from "../../assets/lock.svg"

import './Auth.css'

// emilys
// emilyspass

const Auth = () => {
  const navigate = useNavigate()
  const [api, contextHolder] = notification.useNotification();

  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const openNotification = () => {
    api.error({
      title: "Неудачная попытка входа",
    });
  }

  const onFormSubmit = async (fields: IAuthFormField) => {
    setLoading(true)
    setErrorMessage("")

    const result = await login({ username: fields.username, password: fields.password })

    setLoading(false)

    if (result instanceof AxiosError) {
      openNotification()

      if (result.response?.data?.message) {
        setErrorMessage(result.response.data.message)
      }
    } else {
      if (fields.remember) {
        sessionStorage.setItem("accessToken", result.accessToken)
      }

      navigate("/products")
    }
  }

  return (
    <div className='flex-centered auth_container'>
      <div className='auth_content'>
        <div className='auth_content-inner'>
          <div className='flex-centered'>
            <div className='auth_logo-container flex-centered'>
              <AppIcon width={35} height={35} icon={Logo} />
            </div>
          </div>
          <div className='align-center'>
            <Typography.Title level={1}>Добро пожаловать!</Typography.Title>
            <Typography.Text>Пожалуйста, авторизируйтесь</Typography.Text>
          </div>
          <div className='auth_form'>
            <Form
              name="auth"
              layout='vertical'
              onFinish={onFormSubmit}
            >
              <Form.Item
                label="Логин"
                name="username"
                rules={[{ required: true, message: 'Введите имя пользователя!' }]}
              >
                <Input allowClear placeholder='Введите имя пользователя' prefix={<AppIcon width={24} height={24} icon={User} />} />
              </Form.Item>

              <Form.Item
                label="Пароль"
                name="password"
                rules={[{ required: true, message: 'Введите пароль!' }]}
              >
                <Input.Password placeholder='Введите пароль' prefix={<AppIcon width={24} height={24} icon={Lock} />} />
              </Form.Item>

              {errorMessage && <Alert
                title={errorMessage}
                type="error"
                closable={{ closeIcon: true }}
              />}

              <Form.Item name="remember" valuePropName="checked" label={null}>
                <Checkbox>Запомнить данные</Checkbox>
              </Form.Item>

              <Form.Item className='align-center' label={null}>
                <Button loading={loading} type="primary" htmlType="submit">
                  Войти
                </Button>
              </Form.Item>
            </Form>
            <Typography.Text>или</Typography.Text>
            <div className='align-center' >
              <Typography.Text>Нет аккаунта?</Typography.Text>{" "}
              <Typography.Link href=''>Создать</Typography.Link>
            </div>
          </div>
        </div>
      </div>
      {contextHolder}
    </div>
  )
}

export default Auth
