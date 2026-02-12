import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ConfigProvider } from 'antd';

import StoreProvider from './components/StoreProvider'
import Auth from './components/Auth/Auth';
import Products from './components/Products/Products';
import AuthRedirect from './components/Auth/AuthRedirect';
import theme from './theme';

import './App.css'

const App = () => {
  return (
    <StoreProvider>
      <ConfigProvider theme={theme}>
        <Router>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route element={<AuthRedirect />}>
              <Route path="/products" element={<Products />} />
            </Route>
            <Route path="*" element={<Navigate to="/auth" replace />} />
          </Routes>
        </Router>
      </ConfigProvider>
    </StoreProvider>
  );
}

export default App
