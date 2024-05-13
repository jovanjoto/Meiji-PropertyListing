import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import { Card, Spinner } from "flowbite-react";
import axios from "axios";

import { AuthContext } from "../Components/Authentication/AuthContext";
import { jwtDecode } from "jwt-decode";
import ViewAgentProfile from "../Components/ViewAgentProfileCard";

export default function REAProfilePage() {
	const { token } = useContext(AuthContext);
	const params = useParams();
	const email = params.email;
	const [isLoading, setIsLoading] = useState(false);
	const [agent, setAgent] = useState();
	const navigate = useNavigate();

	useEffect(() => {
		setIsLoading(true);
		axios
			.get(`/api/user/view_rea?email=${email}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				if (res.data.success) {
					setAgent(() => ({
						...res.data.results,
					}));
				} else {
					navigate("/");
				}
			})
			.catch((error) => {
				navigate("/");
			})
			.then(() => setIsLoading(false));
	}, [email]);

	const displayLoading = () => {
		return (
			<div className="text-center text-8xl">
				<Spinner aria-label="Extra large spinner example" size="xl" />
			</div>
		);
	};

	const displayProfile = (user_json) => {
		return (
			<ViewAgentProfile
				email={user_json.email}
				phone={user_json.phone}
				first_name={user_json.first_name}
				last_name={user_json.last_name}
				profile={user_json.profile}
				ratings={user_json.ratings}
				reviews={user_json.reviews}
				properties={user_json.properties}
			/>
		);
	};

	if (isLoading || !agent) {
		return displayLoading();
	}

	return (
		<div className="mt-12 justify-center items-center align-middle">
			{displayProfile(agent)}
		</div>
	);
}
