import {
	Button,
	Modal,
	Card,
	Label,
	Textarea,
	Checkbox,
	TextInput,
	Spinner,
} from "flowbite-react";
import { FaPencilAlt, FaTimes, FaUser } from "react-icons/fa";
import { useState, useRef, useEffect, useContext } from "react";
import { AuthContext } from "../Authentication/AuthContext";
import axios from "axios";
import MessageModal from "./MessageModal";

function UserAccountModal({ state, setState, email }) {
	const [editedAccount, setEditedAccount] = useState({});
	const [isEditable, setIsEditable] = useState(false);
	const [messageModal, setMessageModal] = useState(false);
	const [message, setMessage] = useState("");
	const [fullName, setFullName] = useState("");
	const [phoneChanged, setPhoneChanged] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	const { token } = useContext(AuthContext);

	// email = 'admin@admin.com'
	useEffect(() => {
		axios
			.get("/api/user/view_user_account", {
				params: {
					email: `${email}`,
				},
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((response) => {
				console.log("response : ", response.data);
				setEditedAccount(response.data.data);
				const first_name = response.data.data.first_name;
				const last_name = response.data.data.last_name;
				setEditedAccount((prev) => ({
					...prev,
					fullName: first_name + " " + last_name,
				}));
				setFullName(
					response.data.data.first_name +
						" " +
						response.data.data.last_name
				);
			})
			.catch((error) => {
				console.error("error : ", error);
			})
			.then(() => setIsLoading(false));
	}, []);

	const handleChange = (event) => {
		if (event.target.id === "phone") {
			setPhoneChanged(true);
		}

		setEditedAccount({
			...editedAccount,
			[event.target.id]: event.target.value,
		});
	};

	const submitUpdates = (newDetails) => {
		if (fullName.trim() === "") {
			setMessage(`Name cannot be empty! please try again.`);
			setMessageModal(true);
			return;
		}
		setIsEditable(false);

		axios
			.patch("/api/user/update_user_account", newDetails, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				if (res.data.success) {
					displaySuccessMsg();
				} else {
					displayErrorMsg();
				}
			})
			.catch((error) => {
				console.error("error : ", error);
				displayErrorMsg();
			})
			.then(() => {
				setMessageModal(true);
			});
	};

	const handleCancelButton = () => {
		// setEditedAccount(account);
		setIsEditable(false);
	};

	const handleNameChange = (event) => {
		setEditedAccount((prev) => ({
			...prev,
			fullName: event.target.value,
		}));

		setFullName(event.target.value);
		console.log(fullName);
	};

	const displaySuccessMsg = () => {
		setMessage(`${fullName} successfully updated.`);
	};

	const displayErrorMsg = () => {
		setMessage(`Failed to update, please try again.`);
	};

	const onCloseModal = (x) => {
		setMessageModal(x);
		window.location.reload();
	};

	const displayLoadingPage = () => {
		return (
			<div className="text-center text-8xl">
				<Spinner aria-label="Extra large spinner example" size="xl" />
			</div>
		);
	};

	const displayUpdatePage = () => {
		setIsEditable(true);
	};

	const openUpdate = () => {
		displayUpdatePage();
	};

	const displayUserAcc = () => {
		return (
			<>
				<MessageModal state={messageModal} setState={onCloseModal}>
					{message}
				</MessageModal>

				<Modal
					className=""
					show={state}
					onClose={() => setState(false)}
					size="sm"
				>
					{!isEditable && (
						<FaTimes
							className="absolute top-0 left-0 m-2 rounded-md w-5 h-5 cursor-pointer" // Added absolute positioning
							onClick={() => setState(false)}
						/>
					)}

					{!isEditable && (
						<FaPencilAlt
							id="edit-pencil"
							className="absolute top-0 right-0 m-2 rounded-md w-5 h-5 cursor-pointer"
							onClick={openUpdate}
						/>
					)}
					<Card className=" ">
						<div className="flex flex-col items-center">
							{isEditable ? (
								<input
									className="text-center"
									type="text"
									value={fullName}
									onChange={handleNameChange}
									required
								/>
							) : (
								<h5 className="text-xl font-medium text-gray-900 dark:text-white">
									{fullName}
								</h5>
							)}
							<FaUser className="w-20 h-20 rounded-full my-5" />
							<h5>{editedAccount.profile}</h5>
							<form
								className="mt-4 w-64 flex flex-col gap-y-2"
								onSubmit={(ev) => {
									ev.preventDefault();
									const names = fullName.split(" ");
									const first_name = names[0];
									const last_name = names.slice(1).join(" ");
									var newDetails = {};

									if (phoneChanged) {
										newDetails = {
											email: `${email}`,
											first_name: `${first_name}`,
											last_name: `${last_name}`,
											phone: `${editedAccount.phone}`,
										};
									} else {
										newDetails = {
											email: `${email}`,
											first_name: `${first_name}`,
											last_name: `${last_name}`,
										};
									}
									submitUpdates(newDetails);
								}}
							>
								<section className="flex flex-col">
									<Label htmlFor="email" value="Email" />
									<TextInput
										id="email"
										value={editedAccount.email}
										onChange={handleChange}
										disabled={true}
										required
									/>
								</section>
								<section className="flex flex-col">
									<Label htmlFor="password" value="Password" />
									<TextInput
										id="password"
										type="password"
										value={"********"}
										onChange={handleChange}
										disabled={true}
										readOnly={!isEditable}
										required
									/>
								</section>
								<section className="flex flex-col">
									<Label htmlFor="phone" value="Phone" />
									<TextInput
										id="phone"
										value={editedAccount.phone}
										onChange={handleChange}
										disabled={!isEditable}
										readOnly={!isEditable}
										required
									/>
								</section>
								<section className="flex justify-center pt-5 gap-5">
									{isEditable && (
										<>
											{" "}
											<Button
												color="failure"
												className=" w-1/2"
												onClick={handleCancelButton}
											>
												Cancel
											</Button>{" "}
											<Button
												className="bg-custom_purple1 w-1/2 text-white"
												type="submit"
											>
												Confirm
											</Button>{" "}
										</>
									)}
								</section>
							</form>
						</div>
					</Card>
				</Modal>
			</>
		);
	};

	if (isLoading) {
		return displayLoadingPage();
	}

	return displayUserAcc();
}
export default UserAccountModal;

// <h5
// id="fullName"
// className="text-xl font-medium text-gray-900 dark:text-white"
// contentEditable={isEditable}
// onChange={handleNameChange}
// >
// {/* {editedAccount.first_name} {editedAccount.last_name} */}{" "}
// {firstName} {lastName}
// </h5>
