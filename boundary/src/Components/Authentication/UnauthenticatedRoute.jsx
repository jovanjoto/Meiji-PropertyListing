import { Navigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Spinner } from "flowbite-react";

export default function UnauthenticatedRoute({ children }) {
	const { token, logout } = useContext(AuthContext);

	const [auth, setAuth] = useState(false);
	const [isTokenValidated, setIsTokenValidated] = useState(false);

	useEffect(() => {
		if (token) {
			axios
				.get("/api/authentication/verify_token", {
					headers: { Authorization: `Bearer ${token}` },
				})
				.then((res) => {
					console.log(res.data.success);
					if (res.data.success) {
						setAuth(true);
					}
				})
				.catch((error) => {
					console.log(error);
					logout();
				})
				.then(() => setIsTokenValidated(true));
		} else {
			setIsTokenValidated(true);
		}
	}, [token]);

	if (!isTokenValidated) {
		return (
			<div className="text-center text-8xl">
				<Spinner aria-label="Extra large spinner example" size="xl" />
			</div>
		);
	}
	if (auth) {
		const user = jwtDecode(token);
		if (user.has_admin_permission) {
			return <Navigate to="/admin" />;
		} else if (user.has_listing_permission) {
			return <Navigate to="/agent" />;
		} else if (user.has_selling_permission) {
			return <Navigate to="/seller" />;
		} else if (user.has_selling_permission) {
			return <Navigate to="/" />;
		}
	} else {
		return children;
	}
}
