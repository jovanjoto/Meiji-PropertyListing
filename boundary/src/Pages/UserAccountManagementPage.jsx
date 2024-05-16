import {
	TextInput,
	Dropdown,
	Button,
	Label,
	Checkbox,
	Spinner,
} from "flowbite-react";
import { BsArrowDownShort } from "react-icons/bs";
import { useContext, useEffect, useState } from "react";

import UserAccountCard from "../Components/Admin/UserAccountCard";
import CreateNewUserAccountModal from "../Components/Admin/CreateNewUserAccountModal";
import { FaSearch } from "react-icons/fa";
import { AuthContext } from "../Components/Authentication/AuthContext";
import axios from "axios";

export default function UserAccountManagementPage() {
	const { token } = useContext(AuthContext);
	const [search, setSearch] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [accountList, setAccountList] = useState([]);
	const [filter, setFilter] = useState({});
	const [userPageOpen, setUserPageOpen] = useState(false);

	useEffect(() => {
		setIsLoading(true);
		if (token) {
			// Get all profiles
			axios
				.get("/api/user/get_all_profiles", {
					headers: { Authorization: `Bearer ${token}` },
				})
				.then((res) => {
					if (res.status === 200) {
						res.data.profiles.forEach((profile) => {
							setFilter((prev) => ({
								...prev,
								[profile]: true,
							}));
						});
					} else {
						console.log(res.status);
					}
				})
				.catch((error) => {
					console.log(error);
				});

			// Get all user
			axios
				.get("/api/user/search_user_account", {
					headers: { Authorization: `Bearer ${token}` },
				})
				.then((res) => {
					if (res.status === 200) {
						setAccountList(res.data.accounts);
					} else {
						console.log(res.status);
					}
				})
				.catch((error) => {
					console.log(error);
				})
				.then(() => setIsLoading(false));
		}
	}, []);

	const handleFilter = (key, value) => {
		setFilter((prev) => ({
			...prev,
			[key]: value,
		}));
	};

	const searchFilter = (keyword, filter) => {
		let filtered_list = [];
		accountList.forEach((accountJson) => {
			let search_bool = accountJson.first_name
				.toLowerCase()
				.startsWith(keyword.toLowerCase());
			let search_bool2 = accountJson.last_name
				.toLowerCase()
				.startsWith(keyword.toLowerCase());
			let search_bool3 = accountJson.first_name
				.concat(" ", accountJson.last_name)
				.toLowerCase()
				.startsWith(keyword.toLowerCase());
			let filter_bool = filter[accountJson.profile];
			if ((search_bool || search_bool2 || search_bool3) && filter_bool) {
				filtered_list.push(accountJson);
			}
		});
		if (filtered_list.length > 0) {
			return displayList(filtered_list);
		} else {
			return displayEmptyList();
		}
	};

	const displayLoading = () => {
		return (
			<div className="text-center text-8xl">
				<Spinner aria-label="Extra large spinner example" size="xl" />
			</div>
		);
	};

	const displayList = (filtered_accounts) => {
		return filtered_accounts.map((accountJson) => {
			return (
				<UserAccountCard
					key={accountJson["email"]}
					profile={accountJson.profile}
					firstName={accountJson.first_name}
					lastName={accountJson.last_name}
					email={accountJson.email}
					phone_num={accountJson.phone}
					isSuspended={accountJson.suspended}
					suspensionDate={accountJson.suspension_end}
				/>
			);
		});
	};

	const displayEmptyList = () => {
		return <span>No matching accounts found.</span>;
	};

	const displayCreateAccountPage = () => {
		setUserPageOpen(true);
	};

	return (
		<div className="flex flex-col justify-center mx-10 my-4">
			<CreateNewUserAccountModal
				state={userPageOpen}
				setState={setUserPageOpen}
			/>
			<div className="flex w-full justify-between flex-wrap items-center gap-5">
				<TextInput
					id="Search"
					placeholder="Search User"
					className="mr w-96"
					icon={FaSearch}
					sizing="lg"
					onChange={(event) => setSearch(event.target.value)}
				/>

				<div
					className="flex flex-row items-center justify-center gap-5 my-2"
					id="selectBoxes"
				>
					<Dropdown
						label="Dropdown button"
						renderTrigger={() => (
							<Button
								size="lg"
								className="bg-custom_purple1 flex flex-row justify-center align-middle items-center"
								color="purple"
							>
								Filter
								<BsArrowDownShort className="ml-2" size={24} />
							</Button>
						)}
					>
						{Object.keys(filter).map((key) => (
							<div key={key} className="flex gap-2 my-2 mx-2">
								<Checkbox
									id={key}
									checked={filter[key]}
									onChange={() => handleFilter(key, !filter[key])}
								/>
								<Label htmlFor="buyer" className="flex">
									{key}
								</Label>
							</div>
						))}
					</Dropdown>

					<Button
						className="bg-custom_purple1 flex flex-row justify-center align-middle items-center"
						color={"purple"}
						size="lg"
						onClick={() => {
							displayCreateAccountPage();
						}}
					>
						Create new account
					</Button>
				</div>
			</div>

			<div className="flex flex-col justify-start items-center gap-5 my-6">
				{isLoading && displayLoading()}
				{!isLoading &&
					(search == "" && Object.values(filter).every((x) => x == true)
						? accountList.length > 0
							? displayList(accountList)
							: displayEmptyList()
						: searchFilter(search, filter))}
			</div>
		</div>
	);
}
