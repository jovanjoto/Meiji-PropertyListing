import { Navbar, Dropdown } from "flowbite-react";
import { BsFillPersonFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./Authentication/AuthContext";
import { jwtDecode } from "jwt-decode";
import ConfirmationModal from "./ConfirmationModal";

export default function NavBar({}) {
	const { logout, token } = useContext(AuthContext);
	const [permission, setPermission] = useState({
		admin: false,
		listing: false,
		buying: false,
		selling: false,
	});
	const [confirmationModal, setConfirmationModal] = useState(false);

	const navigate = useNavigate();
	const { pathname } = useLocation();

	useEffect(() => {
		const user = jwtDecode(token);
		setPermission((prev) => ({
			...prev,
			admin: user.has_admin_permission,
			listing: user.has_listing_permission,
			buying: user.has_buying_permission,
			selling: user.has_selling_permission,
		}));
	}, [token]);

	// an object of permissions
	const navigation_links = {
		admin: {
			"User Account Management": "/admin/viewAccounts",
			"User Profile Management": "/admin/viewProfiles",
		},
		listing: {
			"Dashboard": "/agent",
			"Property Listing": "/agent/propertyListingManagementPage",
			"Ratings": "/agent/viewCustomerRatingPage",
			"Reviews": "/agent/viewCustomerReviewPage"
		},
		buying: {
			"Property Listing": "/",
			"Real Estate Agents" : "/buyer/REAPage"
		},
		selling: {
			"Property Listing": "/seller",
			"Real Estate Agents" : "/seller/REAPage"
		},
	};

	const redirectToLogin = () => {
		navigate("/login");
	}

	const clearToken = () => {
		logout();
	};

	const displayConfirmModal = () => {
		setConfirmationModal(true);
	}

	return (
		<>
			<ConfirmationModal
				state={confirmationModal}
				setState={setConfirmationModal}
				action={() => {clearToken();redirectToLogin();}}
			>
				Are you sure you want to logout?
			</ConfirmationModal>
			<Navbar fluid rounded className=" max-w-full bg-gray-50 py-4 shadow">
				<Navbar.Toggle />
				<Navbar.Collapse>
					{Object.entries(navigation_links).map(([perm, routes]) => {
						if (permission[perm]) {
							return Object.entries(routes).map(([key, value]) => {
								if (value === pathname) {
									return (
										<Navbar.Link
											href={value}
											active
											className="text-lg mx-4"
											key={key}
										>
											{key}
										</Navbar.Link>
									);
								}
								return (
									<Navbar.Link
										href={value}
										className="text-lg mx-4"
										key={key}
									>
										{key}
									</Navbar.Link>
								);
							});
						}
					})}
				</Navbar.Collapse>

				<Dropdown
					arrowIcon={false}
					inline
					label={
						<IconContext.Provider value={{ size: "2em" }}>
							<BsFillPersonFill className="hover:text-gray-500 align-middle mr-5" />
						</IconContext.Provider>
					}
				>
					<Dropdown.Item
						onClick={clickLogoutButton => {
							displayConfirmModal();
						}}
					>
						Log Out
					</Dropdown.Item>
				</Dropdown>
			</Navbar>
		</>
	);
}
