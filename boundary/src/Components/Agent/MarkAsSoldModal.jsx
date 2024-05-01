import { useContext, useState } from "react";
import MessageModal from "../Admin/MessageModal";
import ConfirmationModal from "../ConfirmationModal";
import { Modal, Card, Label, TextInput, Button } from "flowbite-react";
import DatePicker from "../DatePicker";
import { BsBuildingFill, BsFillHouseDoorFill } from "react-icons/bs";
import { format } from "date-fns";
import axios from "axios";
import { AuthContext } from "../Authentication/AuthContext";

export default function MarkAsSoldModal({
	state,
	setState,
	id,
	name,
	property_type,
}) {
	const [confirmationModal, setConfirmationModal] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const [messageModalOpen, setMessageModalOpen] = useState(false);
	const { token } = useContext(AuthContext);

	const [data, setData] = useState({
		date: new Date(),
		price: 1000,
	});

	const handleSubmit = (event) => {
		event.preventDefault();
		console.log(format(data.date, "yyyy-MM-dd"));
		axios
			.patch(
				"/api/property_listing/mark_sold_property_listing",
				{
					id: id,
					transaction_date: format(data.date, "yyyy-MM-dd"),
					transaction_price: data.price,
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
				}
			})
			.catch((error) => {
				console.log(error);
			})
			.then(() => setMessageModalOpen(true));
	};

	const onCloseModal = (x) => {
		setMessageModalOpen(x);
		window.location.reload();
	};

	return (
		<>
			<MessageModal
				id="mark_as_sold"
				state={messageModalOpen}
				setState={onCloseModal}
			>
				{isSuccess
					? `Property ${name} successfully marked as sold.`
					: "Failed to mark as sold. Please Try again."}
			</MessageModal>
			<ConfirmationModal
				state={confirmationModal}
				setState={setConfirmationModal}
				action={handleSubmit}
			>
				Confirm Property {id} to be marked as Sold
			</ConfirmationModal>

			<Modal show={state} onClose={() => setState(false)} size="md" popup>
				<Card className="">
					<div className="flex flex-col items-center">
						<h5
							className="text-2xl font-medium text-gray-900 dark:text-white my-5"
							contentEditable={false}
						>
							{name}
						</h5>

						{property_type === "HDB" || property_type === "condo" ? (
							<BsBuildingFill size={70} className="my-5" />
						) : (
							<BsFillHouseDoorFill size={70} className="my-5" />
						)}
						<form onSubmit={(ev) => handleSubmit(ev)}>
							<Label htmlFor="dateSold" />
							<DatePicker
								id="date"
								data={data}
								setData={(date) => setData(date)}
								update_key="date"
								className="w-full"
								max_date={new Date()}
							/>

							<div className="mt-4 flex flex-col gap-y-5 my-5">
								<section className="flex flex-col w-full ">
									<Label htmlFor="price" value="Price" />
									<TextInput
										id="price"
										value={data.price}
										min={1}
										type="number"
										className="w-64"
										onChange={(ev) =>
											setData((prev) => ({
												...prev,
												price: ev.target.value,
											}))
										}
									/>
								</section>
							</div>
							<div className="flex flex-row justify-around">
								<Button
									color="failure"
									className="w-5/12"
									onClick={() => setState(!state)}
								>
									Cancel
								</Button>
								<Button
									className="w-5/12 bg-custom_purple1"
									type="submit"
								>
									Confirm
								</Button>
							</div>
						</form>
					</div>
				</Card>
			</Modal>
		</>
	);
}
