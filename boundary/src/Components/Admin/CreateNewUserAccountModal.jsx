import {
	Button,
	Modal,
	Card,
	Label,
	Textarea,
	Checkbox,
	TextInput,
	Radio,
	Spinner,
} from "flowbite-react";
import { FaPencilAlt, FaTimes, FaUser } from "react-icons/fa";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../Authentication/AuthContext";
import axios from "axios";

import MessageModal from "./MessageModal";

function CreateNewUserAccountModal({ state, setState }) {
	const { token, logout } = useContext(AuthContext);
	const [selectedProfile, setSelectedProfile] = useState("");
	const [isLoadingProfile, setIsLoadingProfile] = useState(true);
	const [isSuccess, setIsSuccess] = useState(false);
	const [messageModalOpen, setMessageModalOpen] = useState(false);
	const [profiles, setProfiles] = useState([]);
	const [account, setAccount] = useState({
		first_name: "",
		last_name: "",
		email: "",
		password: "",
		phone: "",
	});
	const enterDetails = (event) => {
		setAccount({
			...account,
			[event.target.id]: event.target.value,
		});
	};

	useEffect(() => {
		axios
			.get("/api/user/get_list_of_user_profiles", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			})
			.then((res) => {
				if (res.status === 200) {
					setProfiles(res.data.profiles);
					setIsLoadingProfile(false);
				} else {
					logout();
				}
			});
	}, []);

	const createAccount = async (event) => {
		event.preventDefault();
		await axios
			.put(
				"/api/user/create_user_account",
				{
					email: account.email,
					phone: account.phone,
					password: account.password,
					first_name: account.first_name,
					last_name: account.last_name,
					profile: selectedProfile,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((res) => {
				if (res.data.success) {
					setIsSuccess(true);
				} else {
					setIsSuccess(false);
				}
				setMessageModalOpen(true);
			})
			.catch((err) => {
				logout();
			});
	};
	const onCloseModal = (x) => {
		window.location.reload();
	};
	const displaySuccessMessage = () => {
		return <>Success</>
	}
	const displayErrorMessage = () => {
		return <>Error</>
	}
	return (
		<>
			<MessageModal state={messageModalOpen} setState={onCloseModal}>
				{isSuccess && displaySuccessMessage()}
				{!isSuccess && displayErrorMessage()}
			</MessageModal>
			<Modal
				className=""
				show={state}
				onClose={() => setState(false)}
				size="sm"
			>
				<FaTimes
					className="absolute top-0 left-0 m-2 rounded-md w-5 h-5 cursor-pointer" // Added absolute positioning
					onClick={() => setState(false)}
				/>

				<Card className=" ">
					<form
						className="flex flex-col items-center"
						onSubmit={createAccount}
					>
						<FaUser className="w-20 h-20 rounded-full mt-5" />
						<div className="mt-4 w-64 flex flex-col gap-y-2">
							<section className="flex flex-col">
								<Label htmlFor="First name" value="First Name" />
								<TextInput
									value={account.first_name}
									id="first_name"
									onChange={enterDetails}
									required
								/>
							</section>
							<section className="flex flex-col">
								<Label htmlFor="last_name" value="Last Name" />
								<TextInput
									value={account.last_name}
									id="last_name"
									onChange={enterDetails}
									required
								/>
							</section>
							<section className="flex flex-col">
								<Label htmlFor="email" value="Email" />
								<TextInput
									value={account.email}
									type="email"
									id="email"
									onChange={enterDetails}
									required
								/>
							</section>
							<section className="flex flex-col">
								<Label htmlFor="password" value="Password" />
								<TextInput
									id="password"
									type="password"
									onChange={enterDetails}
									value={account.password}
									required
								/>
							</section>
							<section className="flex flex-col">
								<Label htmlFor="phone" value="Phone" />
								<TextInput
									value={account.phone}
									id="phone"
									onChange={enterDetails}
									required
								/>
							</section>
							<Label htmlFor="roleTitle" value="Role" />
							<section className="flex flex-col gap-y-2 border h-24 overflow-y-auto">
								{isLoadingProfile ? (
									<Spinner />
								) : (
									profiles.map((profile) => (
										<div
											key={profile}
											className="flex items-center justify-between"
										>
											<Label
												htmlFor={`${profile}`}
												value={profile}
											/>
											<Radio
												id={profile}
												name="roles" required
												checked={selectedProfile === profile}
												onChange={() => setSelectedProfile(profile)}
											/>
										</div>
									))
								)}
							</section>
							<section className="flex justify-center pt-5 gap-5">
								<Button
									color="failure"
									className=" w-1/2"
									onClick={() => setState(false)}
								>
									Cancel
								</Button>
								<Button
									type="submit"
									className="bg-custom_purple1 w-1/2"
								>
									Confirm
								</Button>
							</section>
						</div>
					</form>
				</Card>
			</Modal>
		</>
	);
}
export default CreateNewUserAccountModal;
