import React from 'react'
import Home from '../../pages/Home';
import Login from '../../pages/Login';
import Signup from '../../pages/Signup';
import ForgotPassword from '../../pages/ForgotPassword';
import {
    BrowserRouter,
    Routes,
    Route,
  } from "react-router-dom";
import PageNotFound from '../../pages/PageNotFound';

const Main = () => {
  return (
    <React.Fragment>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/signup' element={<Signup/>}/>
                <Route path='/forgot-password' element={<ForgotPassword/>}/>
                <Route path='*' element={<PageNotFound/>}/>
            </Routes>
        </BrowserRouter>
    </React.Fragment>
  )
}

export default Main