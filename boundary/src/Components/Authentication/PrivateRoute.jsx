import { Navigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Spinner } from "flowbite-react";

export default function PrivateRoute({
	admin = false,
	buying = false,
	listing = false,
	selling = false,
	children,
}) {
	const { token, logout } = useContext(AuthContext);

	const [auth, setAuth] = useState(false);
	const [isTokenValidated, setIsTokenValidated] = useState(false);

	const logical_implication = (a, b) => !a || b;
	useEffect(() => {
		if (token) {
			axios
				.get("/api/authentication/verify_token", {
					headers: { Authorization: `Bearer ${token}` },
				})
				.then((res) => {
					if (res.data.success) {
						setAuth(true);
					} else {
						logout();
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
	}, [admin, buying, listing, selling, token]);

	if (!isTokenValidated) {
		return (
			<div className="text-center text-8xl">
				<Spinner aria-label="Extra large spinner example" size="xl" />
			</div>
		);
	}
	if (auth) {
		const user = jwtDecode(token);
		if (
			logical_implication(admin, user.has_admin_permission) &&
			logical_implication(buying, user.has_buying_permission) &&
			logical_implication(listing, user.has_listing_permission) &&
			logical_implication(selling, user.has_selling_permission)
		) {
			return children;
		} else if (user.has_admin_permission) {
			return <Navigate to="/admin" />;
		} else if (user.has_listing_permission) {
			return <Navigate to="/agent" />;
		} else if (user.has_selling_permission) {
			return <Navigate to="/seller" />;
		} else if (user.has_selling_permission) {
			return <Navigate to="/" />;
		}
	} else {
		return <Navigate to="/login" />;
	}
}
