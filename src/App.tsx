import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';

import StoreProvider from './components/StoreProvider'
import Auth from './components/Auth/Auth';
import Products from './components/Products/Products';
import theme from './theme';

import './App.css'

const App = () => {
  const accessToken = sessionStorage.getItem("accessToken")

  return (
    <StoreProvider>
      <ConfigProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/products" element={<Products />} />
            <Route path="*" element={<Navigate to={accessToken ? "/products" : '/auth'} />} />
          </Routes>
        </Router>
      </ConfigProvider>
    </StoreProvider>
  )
}

export default App
