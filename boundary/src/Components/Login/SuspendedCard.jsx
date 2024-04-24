import { useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { Card, Label } from "flowbite-react";
import { AuthContext } from "../Authentication/AuthContext";
import axios from "axios";
import { jwtDecode } from "jwt-decode";


function SuspendedCard() {
	const [suspensionInformation, setSuspensionInformation] = useState({
		end:"", reason:""
	});
	const navigation = useNavigate();
	const { token, logout } = useContext(AuthContext);

	useEffect(() => {
		if (token) {
			const user = jwtDecode(token);
			axios
				.get("/api/suspension/get_suspension", {
					params: {
					  email: user.email,
					},
					headers: {
					  Authorization: `Bearer ${token}`
					}
				  })
				.then((res) => {
					if (res.data.success) {
						setSuspensionInformation((prev) => ({
							...prev,
							end: res.data.data.end,
							reason: res.data.data.reason
						})) 
					}
				})
				.catch((error) => {
					console.log(error);
					logout()
					navigation("/login");
				})
		} else {
			logout()
			navigation("/login");
		}
	}, [token]);

	return (
		<Card>
			<div className="mb-2 text-center block w-96 mx-4">
				<Label className="text-xl" value="Your account is suspended until" />
                <br />
                <Label className="text-xl" value={suspensionInformation.end} />
				<br />
				<Label className="text-xl" value="Reason:" />
				<br />
				<Label className="text-xl" value={suspensionInformation.reason} />
			</div>
		</Card>
	);
}

export default SuspendedCard;
