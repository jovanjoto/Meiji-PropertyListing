import { Button, Modal, Card, Label, Dropdown } from "flowbite-react";
import { FaUser, FaChevronDown } from "react-icons/fa";
import { useContext, useState } from "react";
import axios from "axios";
import MessageModal from "./MessageModal";
import { AuthContext } from "../Authentication/AuthContext";

function SuspendProfileModal({ state, setState, profile }) {
	const [durationUnit, setDurationUnit] = useState("Days");
	const [duration, setDuration] = useState(1);
	const [reason, setReason] = useState("");
	const [messageModal, setMessageModal] = useState(false);
	const { token } = useContext(AuthContext);

	const onCloseModal = (x) => {
		setMessageModal(x);
		window.location.reload();
	};

	const handleSubmit = () => {
		const final_duration =
			durationUnit === "Days"
				? duration
				: durationUnit === "Weeks"
				? duration * 7
				: duration * 30;

		axios
			.put(
				"/api/suspension/suspend_user_profile",
				{
					profile: profile,
					reason: reason,
					duration: final_duration,
				},
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			)
			.then((res) => {
				if (res.data.success) {
					setState(false);
					setMessageModal(true);
				} else {
					alert("Failed to suspend, please try again...");
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	return (
		<>
			<MessageModal
				state={messageModal}
				setState={onCloseModal}
			>{`All users with profile ${profile} are successfully suspended.`}</MessageModal>
			<Modal
				className=""
				show={state}
				onClose={() => setState(false)}
				size="md"
				popup
			>
				<Card className=" ">
					<div className="flex flex-col items-center">
						<h5
							className="text-2xl font-medium text-gray-900 dark:text-white"
							contentEditable={false}
						>
							Suspend Profile :
						</h5>
						<h5 className="text-2xl font-medium text-gray-900 ">
							{profile}
						</h5>
						<FaUser className="w-20 h-20 rounded-full mt-5" />
						<div className="mt-4 flex flex-col gap-y-5">
							<section className="flex flex-col w-full ">
								<Label htmlFor="reason" value="Reason" />
								<textarea
									className="resize-none h-28 w-full rounded-lg"
									value={reason}
									onChange={(ev) => setReason(ev.target.value)}
								/>
							</section>
							<section className="flex flex-col">
								<Label htmlFor="duration" value="Duration" />
								<div className="flex flex-row h-10">
									<input
										type="number"
										className="border rounded-lg rounded-r-none border-black w-20"
										min={1}
										value={duration}
										onChange={(ev) =>
											setDuration(ev.target.valueAsNumber)
										}
									/>
									<Dropdown
										size=""
										className=""
										label={durationUnit}
										renderTrigger={() => (
											<Button
												color="gray"
												className="w-60 border-black text-black bg-white rounded-lg rounded-l-none "
											>
												{" "}
												{durationUnit}{" "}
												<FaChevronDown className="absolute right-2  h-5 w-5" />{" "}
											</Button>
										)}
									>
										<Dropdown.Item
											onClick={() => setDurationUnit("Days")}
										>
											Days
										</Dropdown.Item>
										<Dropdown.Item
											onClick={() => setDurationUnit("Weeks")}
										>
											Weeks
										</Dropdown.Item>
										<Dropdown.Item
											onClick={() => setDurationUnit("Months")}
										>
											Months
										</Dropdown.Item>
									</Dropdown>
								</div>
							</section>
							<section className="flex justify-center gap-5 mt-5">
								<Button
									color="failure"
									className="w-1/2 "
									onClick={() => setState(false)}
								>
									Cancel
								</Button>
								<Button
									className="w-1/2 bg-custom_purple1 text-white"
									onClick={() => handleSubmit()}
								>
									Confirm
								</Button>
							</section>
						</div>
					</div>
				</Card>
			</Modal>
		</>
	);
}
export default SuspendProfileModal;
