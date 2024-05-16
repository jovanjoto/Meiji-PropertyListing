import {
	Button,
	Modal,
	Card,
	Label,
	Textarea,
	Checkbox,
	TextInput,
} from "flowbite-react";
import { FaTimes, FaUser } from "react-icons/fa";
import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Authentication/AuthContext";
import MessageModal from "./MessageModal";

function CreateNewUserProfileModal({ state, setState }) {
	const { token, logout } = useContext(AuthContext);
	const [profileName, setProfileName] = useState("");
	const [description, setDescription] = useState("");
	const [permission, setPermission] = useState({
		Buying: false,
		Listing: false,
		Selling: false,
	});
	const [isSuccess, setIsSuccess] = useState(false);
	const [messageModalOpen, setMessageModalOpen] = useState(false);

	const displayErrorMsg = () => {
		setIsSuccess(false);
	};

	const displaySuccessMsg = () => {
		setIsSuccess(true);
	};

	const enterDetails = async (details) => {
		if (
			Object.values(permission).reduce(
				(partialSum, a) => partialSum + a,
				0
			) == 0
		) {
			setIsSuccess(false);
			setMessageModalOpen(true);
			return;
		}
		await axios
			.put("/api/profile/create_user_profile", details, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				if (res.data.success) {
					// isCreated == True
					displaySuccessMsg();
				} else {
					displayErrorMsg(); // isCreated == False
				}
				setMessageModalOpen(true);
			})
			.catch((err) => {
				displayErrorMsg();
			});
	};

	const onCloseModal = (x) => {
		window.location.reload();
	};

	const displayCreateProfilePage = () => {
		return (
			<>
				<MessageModal state={messageModalOpen} setState={onCloseModal}>
					{isSuccess && <>Success</>}
					{!isSuccess && <>Error</>}
				</MessageModal>
				<Modal
					className=""
					show={state}
					onClose={() => setState(false)}
					size="2xl"
				>
					<FaTimes
						className="absolute top-0 left-0 m-2 rounded-md w-5 h-5 cursor-pointer" // Added absolute positioning
						onClick={() => setState(false)}
					/>
					<Card className=" ">
						<form
							onSubmit={(event) => {
								event.preventDefault();
								const details = {
									name: profileName,
									description: description,
									has_buying_permission: permission.Buying,
									has_listing_permission: permission.Listing,
									has_selling_permission: permission.Selling,
								};
								enterDetails(details);
							}}
						>
							<div className="flex flex-col items-center">
								<FaUser className="rounded-full h-20 w-20 mb-5" />
								<div className="grid grid-cols-2 gap-x-14">
									<section className="grid gap-y-4">
										<div>
											<Label>Profile Name</Label>
											<TextInput
												value={profileName}
												id="profileName"
												required
												className=""
												onChange={(e) =>
													setProfileName(e.target.value)
												}
											/>
										</div>
										<div className="flex flex-col w-52">
											<Label
												htmlFor="permissions"
												value="Permissions"
											/>
											<Card className="">
												{Object.keys(permission).map(
													(key, index) => (
														<div
															key={index}
															className="flex flex-row justify-between"
														>
															<Label htmlFor={key} value={key} />
															<Checkbox
																key={index}
																checked={permission[key]}
																onChange={() =>
																	setPermission(
																		(prevState) => ({
																			...prevState,
																			[key]: !prevState[key],
																		})
																	)
																}
																className="text-custom_purple_1 mb-2"
															/>
														</div>
													)
												)}
											</Card>
										</div>
									</section>
									<section className="w-54">
										<Label>Description </Label>
										<Textarea
											value={description}
											id="description"
											className="h-60 resize-none"
											required
											onChange={(e) =>
												setDescription(e.target.value)
											}
										/>
									</section>
								</div>
							</div>
							<section className="flex justify-center gap-5">
								<Button
									color="failure"
									className="w-1/4 mt-5"
									onClick={() => setState(false)}
								>
									Cancel
								</Button>
								<Button
									className="bg-custom_purple1 w-1/4 mt-5"
									type="submit"
								>
									Confirm
								</Button>
							</section>
						</form>
					</Card>
				</Modal>
			</>
		);
	};

	return displayCreateProfilePage();
}

export default CreateNewUserProfileModal;
