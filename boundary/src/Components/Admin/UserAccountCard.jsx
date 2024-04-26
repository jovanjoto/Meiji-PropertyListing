import { Card, Button } from "flowbite-react";
import { BsFillPersonFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import UserAccountModal from "./UserAccountModal";
import { useState } from "react";
import SuspendAccountModal from "./SuspendAccountModal";

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
	const [showSuspendModal, setShowSuspendModal] = useState(false);

	return (
		<>
			<UserAccountModal state={showViewModal} setState={setShowViewModal} primaryKey={email}/>
			<SuspendAccountModal
				state={showSuspendModal}
				setState={setShowSuspendModal}
				email={email}
				lastName={lastName}
				firstName={firstName}
			/>

			<Card
				id="account-card"
				variant="outline"
				direction={{ base: "column", sm: "row" }}
				className="w-full"
			>
				<div className="flex flex-wrap justify-center md:justify-between align-middle items-center gap-y-5">
					<div className="flex flex-row items-center gap-6 align-middle">
						<div className="flex flex-col justify-center items-center align-middle gap-1 w-32">
							{<BsFillPersonFill size={70} />}
							{<p className="text-center" id="profile-name">{profile}</p>}
						</div>
						<div className="flex flex-col justify-center gap-1">
							<span className="text-3xl" id="username">
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
						{isSuspended === true ? (
							<Button
								disabled
								color="purple"
								className="mx-2 bg-custom_purple1 w-1/2 ml-2 h-14 items-center my-1 text-white"
							>
								Suspended until {suspensionDate}
							</Button>
						) : (
							<Button
								color="purple"
								onClick={() => setShowSuspendModal(true)}
								className="mx-2 bg-custom_purple1 w-1/2 ml-2 h-14 items-center my-1"
							>
								Suspend
							</Button>
						)}
					</div>
				</div>
			</Card>
		</>
	);
}
