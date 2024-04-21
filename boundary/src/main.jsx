// importing libraries
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


// importing local dependencies
import UserAccountManagementPage from './Pages/UserAccountManagementPage.jsx'
import ProfileManagementPage from './Pages/ProfileManagementPage.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  
  <BrowserRouter> 
  <Routes>
    <Route path='/app' element={<App/>}/>
    {/* <Route path='/login' element={<LoginPage/>}/>
    <Route path='/register' element={<RegisterPage/>}/> */}
      <Route path='/viewAccounts' element={<UserAccountManagementPage />} />
      <Route path='/viewProfiles' element={<ProfileManagementPage/>} />
  </Routes>
  </BrowserRouter>
  
)
