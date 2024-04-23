import { Card, Button } from "flowbite-react";
import { BsFillPersonFill } from "react-icons/bs";
import { MdAdminPanelSettings, MdPublish, MdSell } from "react-icons/md";
import { GiPayMoney } from "react-icons/gi";
import UserProfileModal from "./UserProfileModal";
import { useState } from "react";

export default function UserProfileCard({ profileJson }) {
	const [showViewModal, setShowViewModal] = useState(false);

	const list_of_permissions = [];
	if (profileJson.has_listing_permission) {
		list_of_permissions.push(
			<div key="listing" className="flex flex-row justify-center items-center gap-0.5 text-custom_purple2">
				<MdPublish />
				Listing
			</div>
		);
	}
	if (profileJson.has_buying_permission) {
		list_of_permissions.push(
			<div key="buying" className="flex flex-row justify-center items-center gap-0.5 text-custom_purple2">
				<GiPayMoney />
				Buying
			</div>
		);
	}
	if (profileJson.has_selling_permission) {
		list_of_permissions.push(
			<div key="selling" className="flex flex-row justify-center items-center gap-0.5 text-custom_purple2">
				<MdSell />
				Selling
			</div>
		);
	}

	return (
		<>
			<UserProfileModal
				state={showViewModal}
				setState={setShowViewModal}
			/>

			<Card
				variant="outline"
				direction={{ base: "column", sm: "row" }}
				className="w-full"
			>
				<div className="flex flex-wrap justify-center md:justify-between align-middle items-center gap-y-5">
					<div className="flex flex-row items-center gap-4 align-middle">
						{<BsFillPersonFill size={70} />}
						<div className="flex flex-col justify-center gap-1">
							<span className="text-3xl">{profileJson.name}</span>
							<div className="flex flex-row justify-start gap-2">
								{list_of_permissions}
							</div>
						</div>
					</div>

					<div className="flex md:w-5/12 w-full items-center justify-center gap-x-5">
						{/* view acc, suspend acc */}
						<Button
							color="purple"
							className="bg-custom_purple1 w-1/2 py-2"
							onClick={() => setShowViewModal(true)}
						>
							View
						</Button>
						<Button
							color="purple"
							className="bg-custom_purple1 w-1/2 py-2"
						>
							Suspend
						</Button>
					</div>
				</div>
			</Card>
		</>
	);
}
