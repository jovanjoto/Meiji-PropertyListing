import { Button, Card, Label, TextInput, Spinner } from "flowbite-react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ResetPasswordCard() {
	const [loading, setLoading] = useState(false);
	const [email, enterEmail] = useState("");
	const [success, setSuccess] = useState(false);
	const [emailError, setEmailError] = useState("");
	const navigate = useNavigate();

	const resetPassword = async (event) => {
		event.preventDefault();
		setLoading(true);
		const response = await axios
			.post("/api/authentication/reset_password", {
				email: email,
			})
			.catch((error) => {
				console.log(error);
			});
		if (response.data.success) {
			displaySuccessMsg();
		} else {
			displayErrorMsg();
		}
		setLoading(false);
	};

	const displaySuccessMsg = () => {
		setSuccess(true);
		setTimeout(() => {
			navigate("/login");
		}, 3000);
	};

	const displayErrorMsg = () => {
		setEmailError("Email is invalid");
	};

	const displayResetPasswordPage = () => {
		return (
			<Card className="w-96">
				<h1 className="text-4xl font-bold text-gray-900 text-center">
					Reset password
				</h1>
				{success && (
					<Label className="font-normal text-gray-700 dark:text-gray-400 text-center w-72 mx-auto">
						Your new password has been generated and sent to {email}
					</Label>
				)}
				{!success && (
					<>
						<Label className="font-normal text-gray-700 dark:text-gray-400 text-center w-56 mx-auto">
							Please enter the email associated with your account.
						</Label>
						<form
							className="flex flex-col gap-2"
							onSubmit={resetPassword}
						>
							<div>
								<div className="mb-2 block">
									<Label htmlFor="email1" value="Your email" />
								</div>
								<TextInput
									id="email"
									type="email"
									placeholder="mymail@mail.com"
									required
									onChange={(event) => enterEmail(event.target.value)}
									color={emailError === "" ? "gray" : "failure"}
									helperText={
										<span className="font-medium">{emailError}</span>
									}
								/>
							</div>
							<Button
								color="purple"
								type="submit"
								className={`mt-2 mb-5 bg-custom_purple2 hover:bg-custom-purple2 ${
									loading ? "cursor-not-allowed opacity-50" : ""
								}`}
							>
								{loading ? (
									<div className="flex items-center">
										<Spinner
											aria-label="Spinner button example"
											size="sm"
										/>
										<span className="pl-3">Loading...</span>
									</div>
								) : (
									"ResetPassword"
								)}
							</Button>
						</form>
					</>
				)}
			</Card>
		);
	};

	return displayResetPasswordPage();
}
