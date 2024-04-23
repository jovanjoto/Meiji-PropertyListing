// importing libraries
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// importing local dependencies
import LoginPage from "./Pages/LoginPage.jsx";
import RegisterPage from "./Pages/RegisterPage.jsx";
import TestPage from "./Pages/TestPage.jsx";
import ModalTestPage from "./Pages/ModalTestPage.jsx";
import UserAccountManagementPage from "./Pages/UserAccountManagementPage.jsx";
import ProfileManagementPage from "./Pages/ProfileManagementPage.jsx";
import AuthProvider from "./Components/Authentication/AuthContext.jsx";
import UnauthenticatedRoute from "./Components/Authentication/UnauthenticatedRoute.jsx";
import PrivateRoute from "./Components/Authentication/PrivateRoute.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
 <AuthProvider>
  <BrowserRouter>
   <Routes>
    {/* Unauthenticated Routes */}
    <Route
     path="/login"
     element={
      <UnauthenticatedRoute>
       <LoginPage />
      </UnauthenticatedRoute>
     }
    />
    {/* Admin Routes */}
    <Route
     path="/admin/viewAccounts"
     element={
      <PrivateRoute>
       <UserAccountManagementPage />
      </PrivateRoute>
     }
    />
    <Route
     path="/admin/viewProfiles"
     element={
      <PrivateRoute>
       <ProfileManagementPage />
      </PrivateRoute>
     }
        />
  {/* Others */}
  <Route path="/test" element={<TestPage />} />
    <Route path="/modalTest" element={<ModalTestPage />} />
   </Routes>
  </BrowserRouter>
 </AuthProvider>
);