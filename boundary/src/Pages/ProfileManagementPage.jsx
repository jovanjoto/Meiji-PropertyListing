import { useContext, useEffect, useState } from "react";
import {
	Button,
	Checkbox,
	Dropdown,
	Label,
	Spinner,
	TextInput,
} from "flowbite-react";
import { FaSearch } from "react-icons/fa";
import UserProfileCard from "../Components/Admin/UserProfileCard";
import axios from "axios";
import { AuthContext } from "../Components/Authentication/AuthContext";
import { BsArrowDownShort } from "react-icons/bs";

import CreateNewUserProfileModal from "../Components/Admin/CreateNewUserProfileModal";

export default function ProfileManagementPage({}) {
	const { token } = useContext(AuthContext);
	const [isLoading, setIsLoading] = useState(true);
	const [profilesList, setProfilesList] = useState([]);
	const [search, setSearch] = useState("");
	const [filter, setFilter] = useState({
		has_listing_permission: false,
		has_buying_permission: false,
		has_selling_permission: false,
	});
	const [profilePageOpen, setProfilePageOpen] = useState(false);

	const displayCreateProfilePage = () => {
		setProfilePageOpen(true);
	}

	useEffect(() => {
		setIsLoading(true);
		if (token) {
			axios
				.get("/api/profile/search_user_profile", {
					headers: { Authorization: `Bearer ${token}` },
				})
				.then((res) => {
					if (res.status === 200) {
						setProfilesList(res.data.profiles);
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

	// For search and filtering
	const logical_implication = (a, b) => !a || b;
	const checkSearchFilter = (profileJson) => {
		let search_bool = profileJson.name
			.toLowerCase()
			.startsWith(search.toLowerCase());
		let filter_bool_listing = logical_implication(
			filter.has_listing_permission,
			profileJson.has_listing_permission
		);
		let filter_bool_buying = logical_implication(
			filter.has_buying_permission,
			profileJson.has_buying_permission
		);
		let filter_bool_selling = logical_implication(
			filter.has_selling_permission,
			profileJson.has_selling_permission
		);
		return (
			search_bool &&
			filter_bool_listing &&
			filter_bool_buying &&
			filter_bool_selling
		);
	};

	const handleFilter = (key, value) => {
		setFilter((prev) => ({
			...prev,
			[key]: value,
		}));
	};

	const searchFilter = () => {
		let filtered_list = [];

		profilesList.forEach((profileJson) => {
			if (checkSearchFilter(profileJson)) {
				filtered_list.push(
					<UserProfileCard
						key={profileJson.name}
						profileJson={profileJson}
					/>
				);
			}
		});
		return filtered_list;
	};

	const displayLoading = () => {
		return (
			<div className="text-center text-8xl">
				<Spinner aria-label="Extra large spinner example" size="xl" />
			</div>
		);
	};

	const displayList = () => {
		return searchFilter();
	};

	const displayEmptyList = () => {
		return <span>No matching profiles found.</span>;
	};

	if (isLoading) {
		return displayLoading();
	}

	return (
		<div className="flex flex-col justify-center mx-10 my-4">
			<CreateNewUserProfileModal state={profilePageOpen} setState={setProfilePageOpen} />
			<div className="flex w-full justify-between flex-wrap items-center gap-5">
				<TextInput
					id="Search"
					placeholder="Search profile"
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
						<div className="flex gap-2 m-2 items-center">
							<Checkbox
								id="listing"
								checked={filter.has_listing_permission}
								onChange={() =>
									handleFilter(
										"has_listing_permission",
										!filter.has_listing_permission
									)
								}
							/>
							<Label htmlFor="listing" className="flex">
								Listing
							</Label>
						</div>
						<div className="flex gap-2 m-2 items-center">
							<Checkbox
								id="Buying"
								checked={filter.has_buying_permission}
								onChange={() =>
									handleFilter(
										"has_buying_permission",
										!filter.has_buying_permission
									)
								}
							/>
							<Label htmlFor="Buying" className="flex">
								Buying
							</Label>
						</div>
						<div className="flex gap-2 m-2 items-center">
							<Checkbox
								id="Selling"
								checked={filter.has_selling_permission}
								onChange={() =>
									handleFilter(
										"has_selling_permission",
										!filter.has_selling_permission
									)
								}
							/>
							<Label htmlFor="Selling" className="flex">
								Selling
							</Label>
						</div>
					</Dropdown>
					<Button
						size="lg"
						className="bg-custom_purple1 flex flex-row justify-center align-middle items-center"
						color="purple"
					onClick={displayCreateProfilePage}>
						Create new profile
					</Button>
				</div>
			</div>
			<div className="flex flex-col justify-start items-center gap-5 my-6">
				{displayList()}
				{searchFilter().length == 0 && displayEmptyList()}
			</div>
		</div>
	);
}
