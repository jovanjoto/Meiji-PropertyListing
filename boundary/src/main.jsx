// importing libraries
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// importing local dependencies
import LoginPage from "./Pages/LoginPage.jsx";
// import RegisterPage from "./Pages/RegisterPage.jsx";
import TestPage from "./Pages/TestPage.jsx";
import ModalTestPage from "./Pages/ModalTestPage.jsx";
import UserAccountManagementPage from "./Pages/UserAccountManagementPage.jsx";
import ProfileManagementPage from "./Pages/ProfileManagementPage.jsx";
import SuspendedPage from "./Pages/SuspendedPage.jsx";
import AuthProvider from "./Components/Authentication/AuthContext.jsx";
import UnauthenticatedRoute from "./Components/Authentication/UnauthenticatedRoute.jsx";
import PrivateRoute from "./Components/Authentication/PrivateRoute.jsx";
import NavBar from "./Components/NavBar";
import ResetPasswordPage from "./Pages/ResetPasswordPage.jsx";
import PropertyListingManagementPage from "./Pages/PropertyListingManagementPage.jsx";
import ViewPropertyListingPage from "./Pages/ViewPropertyListingPage.jsx";
import PropertyListingMarketPage from "./Pages/PropertyListingMarketPage.jsx";
import ViewRatingsPage from "./Pages/ViewRatingsPage.jsx";
import ViewReviewsPage from "./Pages/ViewReviewsPage.jsx";
import SellerPropertyListingPage from "./Pages/SellerPropertyListingPage.jsx";
import AgentDashboardPage from "./Pages/AgentDashboardPage.jsx";
import REAPage from "./Pages/REAPage.jsx";

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
        <Route
          path="/resetPassword"
          element={
            <UnauthenticatedRoute>
              <ResetPasswordPage />
            </UnauthenticatedRoute>
          }
        />
        {/* Admin Routes */}
        <Route
          path="/admin/viewAccounts"
          element={
            <PrivateRoute admin>
              <NavBar />
              <UserAccountManagementPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/viewProfiles"
          element={
            <PrivateRoute admin>
              <NavBar />
              <ProfileManagementPage />
            </PrivateRoute>
          }
        />
        {/* Agent Routes */}
        <Route
          path="/agent/propertyListingManagementPage"
          element={
            <PrivateRoute listing>
              <NavBar />
              <PropertyListingManagementPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/agent/viewPropertyListingPage/:id"
          element={
            <PrivateRoute listing>
              <NavBar />
              <ViewPropertyListingPage editable={true} />
            </PrivateRoute>
          }
        />

        <Route
          path="/agent/viewCustomerRatingPage"
          element={
            <PrivateRoute listing>
              <NavBar />
              <ViewRatingsPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/agent/viewCustomerReviewPage"
          element={
            <PrivateRoute listing>
              <NavBar />
              <ViewReviewsPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/agent"
          element={
            <PrivateRoute listing>
              <NavBar />
              <AgentDashboardPage />
            </PrivateRoute>
          }
        />
        {/* Buying Routes */}
        <Route
          path="/"
          element={
            <PrivateRoute buying>
              <NavBar />
              <PropertyListingMarketPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/buyer/viewPropertyListingPage/:id"
          element={
            <PrivateRoute buying>
              <NavBar />
              <ViewPropertyListingPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/buyer/REAPage"
          element={
            <PrivateRoute buying>
              <NavBar />
              <REAPage />
            </PrivateRoute>
          }
         />
        {/* Seller Routes */}
        <Route
          path="/seller"
          element={
            <PrivateRoute selling>
              <NavBar />
              <SellerPropertyListingPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/seller/viewPropertyListingPage/:id"
          element={
            <PrivateRoute selling>
              <NavBar />
              <ViewPropertyListingPage />
            </PrivateRoute>
          }
         />

         <Route
          path="/seller/REAPage"
          element={
            <PrivateRoute selling>
              <NavBar />
              <REAPage />
            </PrivateRoute>
          }
         />

        {/* Others */}
        <Route
          path="/test"
          element={
            <>
              <TestPage />
            </>
          }
        />
        <Route
          path="/suspended"
          element={
            <PrivateRoute>
              <NavBar />
              <SuspendedPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
