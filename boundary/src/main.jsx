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
							<PropertyListingManagementPage/>
						</PrivateRoute>
					}
				/>

				<Route 
					path="/agent/viewPropertyListingPage/:id"
					element={
						<PrivateRoute listing>
							<NavBar />
							<ViewPropertyListingPage/>
						</PrivateRoute>
					}
				/>
				{/* Buying Routes */}
				<Route
					path="/"
					element={
						<PrivateRoute buying>
							<NavBar />
							You are a buyer!
						</PrivateRoute>
					}
				/>
				{/* Seller Routes */}
				<Route
					path="/seller"
					element={
						<PrivateRoute selling>
							<NavBar />
							You are a seller!
						</PrivateRoute>
					}
				/>
				{/* Others */}
				<Route path="/test" element={<TestPage />} />
				<Route path="/modalTest" element={<ModalTestPage />} />
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
