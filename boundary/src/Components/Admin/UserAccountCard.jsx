import { Card, Button } from "flowbite-react";
import { BsFillPersonFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import UserAccountModal from "./UserAccountModal";
import { useState } from "react";

export default function UserAccountCard({
	profile,
	firstName,
	lastName,
	email,
	phone_num,
	isSuspended,
	suspensionDate,
}) {
	const [showViewModal, setShowViewModal] = useState(false);
	return (
		<>
			<UserAccountModal state={showViewModal} setState={setShowViewModal} />

			<Card
				variant="outline"
				direction={{ base: "column", sm: "row" }}
				className="w-full"
			>
				<div className="flex flex-wrap justify-center md:justify-between align-middle items-center gap-y-5">
					<div className="flex flex-row items-center gap-4 align-middle">
						<div className="flex flex-col justify-center gap-1">
							{<BsFillPersonFill size={70} />}
							{<div className="text-center">{profile}</div>}
						</div>
						<div className="flex flex-col justify-center gap-1">
							<span className="text-3xl">
								{firstName.concat(" ", lastName)}
							</span>
							<span className="text-sm">{email}</span>
							<span className="text-sm">{phone_num}</span>
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
