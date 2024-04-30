import React, { useContext, useState } from "react";
import { Card, Label, TextInput, Button } from "flowbite-react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../Authentication/AuthContext";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function LoginCard() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [invalidMsg, setInvalidMsg] = useState("");
	const navigate = useNavigate();
	const { login } = useContext(AuthContext);

	const handleSubmit = async (event) => {
		event.preventDefault();
		const response = await axios
			.post("/api/authentication/login", {
				email: email,
				password: password,
			})
			.catch((error) => {
				console.log(error);
			});
		if (response.data.access_token) {
			login(response.data.access_token);
			const user = jwtDecode(response.data.access_token);
			if (user.has_admin_permission) {
				return navigate("/admin/viewaccounts");
			} else if (user.has_listing_permission) {
				return navigate("/agent/propertyListingManagementPage");
			} else if (user.has_selling_permission) {
				return navigate("/seller");
			} else if (user.has_selling_permission) {
				return navigate("/");
			}
		} else {
			setInvalidMsg("email or password incorrect");
		}
	};

	return (
		<Card>
			<div className="mb-2 text-center block w-96 mx-4">
				<Label className="text-xl" value="Sign in to your account" />
			</div>
			<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
				<div>
					<div className="mb-2 block text-start">
						<Label htmlFor="email" value="Email" />
					</div>
					<TextInput
						id="email"
						type="email"
						placeholder="user@mail.com"
						required={true}
						onChange={(event) => setEmail(event.target.value)}
						color={invalidMsg === "" ? "gray" : "failure"}
					/>
				</div>
				<div>
					<div className="mb-2 block text-start">
						<Label htmlFor="password1" value="Your password" />
					</div>
					<TextInput
						id="password1"
						type="password"
						required={true}
						onChange={(event) => setPassword(event.target.value)}
						color={invalidMsg === "" ? "gray" : "failure"}
						helperText={
							<React.Fragment>
								<span className="font-medium">{invalidMsg}</span>
							</React.Fragment>
						}
					/>
				</div>
				<Button
					color="purple"
					type="submit"
					className="mt-2 mb-2 bg-custom_purple2 hover:bg-custom-purple2"
				>
					Sign In
				</Button>
				<div className="mb-2 block">
					<Label value="Forget your password? " />
					<Link
						to="/resetPassword"
						className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
					>
						Reset Password
					</Link>
				</div>
			</form>
		</Card>
	);
}

export default LoginCard;
