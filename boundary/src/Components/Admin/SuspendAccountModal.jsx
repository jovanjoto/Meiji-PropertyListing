import { Button, Modal, Card, Label, Dropdown } from "flowbite-react";
import { FaUser } from "react-icons/fa";
import { useState, useRef, useContext } from "react";
import { FaChevronDown } from "react-icons/fa";
import axios from "axios";
import MessageModal from "./MessageModal";
import { AuthContext } from "../Authentication/AuthContext";
import ConfirmationModal from "../ConfirmationModal";

function SuspendAccountModal({ state, setState, email, firstName, lastName }) {
	const [durationUnit, setDurationUnit] = useState("Days");
	const [duration, setDuration] = useState(1);
	const [reason, setReason] = useState("");
	const [messageModal, setMessageModal] = useState(false);
	const [confirmationModal, setConfirmationModal] = useState(false);
	const { token } = useContext(AuthContext);
	const [reasonDuration, enterReasonDuration] = useState({"reason": "", "duration": 1})

	const onCloseModal = (x) => {
		setMessageModal(x);
		window.location.reload();
	};

	const displayConfirmationModal = () => {
		setMessageModal(true)
	}

	const confirm = () => {
		const final_duration =
			durationUnit === "Days"
				? reasonDuration["duration"]
				: durationUnit === "Weeks"
				? reasonDuration["duration"] * 7
				: reasonDuration["duration"] * 30;

		axios
			.put(
				"/api/suspension/suspend_user_account",
				{
					email: email,
					reason: reasonDuration["reason"],
					duration: final_duration,
				},
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			)
			.then((res) => {
				if (res.data.success) {
					setState(false);
					displayConfirmationModal();
				} else {
					alert("Failed to suspend, please try again...");
				}
			})
			.catch((error) => {
				console.log(error);
			});
	};

	const promptConfirmation = () => {
		setConfirmationModal(true);
	}

	const promptReasonDuration = () => {
		return <Card className=" ">
					<div className="flex flex-col items-center">
						<h5
							className="text-2xl font-medium text-gray-900 dark:text-white"
							contentEditable={false}
						>
							Suspend Account :
						</h5>
						<h5 className="text-2xl font-medium text-gray-900 ">
							{firstName.concat(" ", lastName)}
						</h5>
						<FaUser className="w-20 h-20 rounded-full mt-5" />
						<div className="mt-4 flex flex-col gap-y-5">
							<section className="flex flex-col w-full ">
								<Label htmlFor="reason" value="Reason" />
								<textarea
									className="resize-none h-28 w-full rounded-lg"
									value={reasonDuration["reason"]}
									onChange={(event) => enterReasonDuration((prev) => ({...prev, reason:event.target.value}))}
								/>
							</section>
							<section className="flex flex-col">
								<Label htmlFor="duration" value="Duration" />
								<div className="flex flex-row h-10">
									<input
										type="number"
										className="border rounded-lg rounded-r-none border-black w-20"
										min={1}
										value={reasonDuration["duration"]}
										onChange={(event) => enterReasonDuration((prev) => ({...prev, duration:event.target.valueAsNumber}))}
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
									onClick={() => promptConfirmation()}
								>
									Confirm
								</Button>
							</section>
						</div>
					</div>
				</Card>
	}

	return (
		<>
			<MessageModal
				id="suspend-status"
				state={messageModal}
				setState={onCloseModal}
			>{`${firstName} ${lastName} successfully suspended.`}</MessageModal>
			<ConfirmationModal
				state={confirmationModal}
				setState={setConfirmationModal}
				action={confirm}
			>Confirm suspension on {email}</ConfirmationModal>
			<Modal
				className=""
				show={state}
				onClose={() => setState(false)}
				size="md"
				popup
			>
			{promptReasonDuration()}
			</Modal>
		</>
	);
}
export default SuspendAccountModal;
