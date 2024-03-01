import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Index from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';
import { Provider } from 'react-redux'
import store from './app/store'
import {ProtectedRoute} from "./components/ProtectedRoute"
import ProfileScreen from "./screens/ProfileScreen"
import CatalogScreen from './screens/CatalogScreen';
import DashboardScreen from './screens/DashboardScreen';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Layout />}> */}
          <Route index element={<Index />} />
          {/* {/* <Route path="blogs" element={<Blogs />} /> */}
          <Route path="login" element={<LoginScreen />} />
          <Route path="signup" element={<SignupScreen />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/profile' element={<ProfileScreen />} />
            <Route path='/catalog' element={<CatalogScreen />} />
          </Route>

          <Route element={<ProtectedRoute />}>
            <Route path='/admin/dashboard' element={<DashboardScreen />} />
          </Route>

          <Route path='*' element={<Navigate to='/' replace />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
   </Provider>
);


reportWebVitals();
