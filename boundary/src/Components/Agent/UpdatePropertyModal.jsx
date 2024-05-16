import {
	Modal,
	Card,
	Label,
	TextInput,
	Button,
	Select,
	Textarea,
} from "flowbite-react";
import { FaTimes } from "react-icons/fa";
import { useContext, useState } from "react";
import DropImageInput from "../DropImageInput";
import { AuthContext } from "../Authentication/AuthContext";
import MessageModal from "../Admin/MessageModal";
import axios from "axios";

export default function UpdatePropertyModal({
	state,
	setState,
	id,
	name,
	address,
	price,
	num_of_bedrooms,
	num_of_bathrooms,
	district,
	property_type,
	area,
	description,
}) {
	const { token } = useContext(AuthContext);
	const [messageModalOpen, setMessageModalOpen] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);
	const list_of_district = [
		"D01 Boat Quay / Raffles Place / Marina",
		"D02 Chinatown / Tanjong Pagar",
		"D03 Alexandra / Commonwealth",
		"D04 Harbourfront / Telok Blangah",
		"D05 Buona Vista / West Coast / Clementi New Town",
		"D06 City Hall / Clarke Quay",
		"D07 Beach Road / Bugis / Rochor",
		"D08 Farrer Park / Serangoon Rd",
		"D09 Orchard / River Valley",
		"D10 Tanglin / Holland / Bukit Timah",
		"D11 Newton / Novena",
		"D21 Clementi Park / Upper Bukit Timah",
		"D12 Balestier / Toa Payoh",
		"D13 Macpherson / Potong Pasir",
		"D14 Eunos / Geylang / Paya Lebar",
		"D15 East Coast / Marine Parade",
		"D16 Bedok / Upper East Coast",
		"D17 Changi Airport / Changi Village",
		"D18 Pasir Ris / Tampines",
		"D19 Hougang / Punggol / Sengkang",
		"D20 Ang Mo Kio / Bishan / Thomson",
		"D22 Boon Lay / Jurong / Tuas",
		"D23 Dairy Farm / Bukit Panjang / Choa Chu Kang",
		"D24 Lim Chu Kang / Tengah",
		"D25 Admiralty / Woodlands",
		"D26 Mandai / Upper Thomson",
		"D27 Sembawang / Yishun",
		"D28 Seletar / Yio Chu Kang",
	];

	const [property, setproperty] = useState({
		name: name,
		address: address,
		price: price,
		num_of_bedrooms: num_of_bedrooms,
		num_of_bathrooms: num_of_bathrooms,
		district: district,
		property_type: property_type,
		area: area,
		file: null,
		description: description,
	});

	const enterDetailsToUpdate = (details) => {
		if (
			details.num_of_bathrooms > 0 &&
			details.num_of_bathrooms <= 8 &&
			details.num_of_bedrooms > 0 &&
			details.num_of_bedrooms <= 8 &&
			details.area > 0 &&
			details.price > 0 &&
			details.name.trim() != "" &&
			details.address.trim() != "" &&
			details.description.trim() != ""
		) {
			var formData = new FormData();
			formData.append("id", id);

			if (details.name != name) {
				formData.append("name", details.name);
			}
			if (details.address != address) {
				formData.append("address", details.address);
			}
			if (details.price != price) {
				formData.append("price", details.price);
			}
			if (details.num_of_bedrooms != num_of_bedrooms) {
				formData.append("num_of_bedrooms", details.num_of_bedrooms);
			}
			if (details.num_of_bathrooms != num_of_bathrooms) {
				formData.append("num_of_bathrooms", details.num_of_bathrooms);
			}
			if (details.district != district) {
				formData.append("district", details.district);
			}
			if (details.property_type != property_type) {
				formData.append("type", details.property_type);
			}
			if (details.area != area) {
				formData.append("area", details.area);
			}
			if (details.description != description) {
				formData.append("description", details.description);
			}
			if (details.file != null) {
				formData.append("file", details.file);
			}

			axios
				.patch("/api/property_listing/update_property_listing", formData, {
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "multipart/form-data",
					},
				})
				.then((res) => {
					if (res.data.success) {
						displaySuccessMsg();
					} else {
						displayErrorMsg();
					}
				})
				.catch((error) => {
					console.log(error);
					displayErrorMsg();
				});
		} else {
			alert("Invalid data");
		}
	};

	const handleChange = (attribute, value) => {
		setproperty({
			...property,
			[attribute]: value,
		});
	};

	const onCloseModal = (x) => {
		window.location.reload();
	};

	const displaySuccessMsg = () => {
		setIsSuccess(true);
		setMessageModalOpen(true);
	};

	const displayErrorMsg = () => {
		setIsSuccess(false);
		setMessageModalOpen(true);
	};

	const displayUpdatePLPage = () => {
		return (
			<>
				<MessageModal state={messageModalOpen} setState={onCloseModal}>
					{isSuccess && <>{name} has been successfully updated</>}
					{!isSuccess && <>Error when updating, please try again.</>}
				</MessageModal>
				<Modal show={state} onClose={() => setState(false)}>
					<FaTimes
						className="absolute top-0 left-0 m-2 rounded-md w-5 h-5 cursor-pointer" // Added absolute positioning
						onClick={() => setState(false)}
					/>
					<Card>
						<form
							onSubmit={(ev) => {
								ev.preventDefault();
								enterDetailsToUpdate(property);
							}}
						>
							<div className="flex flex-col gap-1">
								<div className="flex flex-row justify-between">
									<div className="flex flex-col mr-5 w-1/2 pb-1.5">
										<Label htmlFor="image" value="Property Image" />
										<DropImageInput
											name="image"
											show={state}
											file={property.file}
											setFile={(val) => handleChange("file", val)}
										/>
									</div>
									<div className="w-1/2 flex flex-col gap-1 justify-between">
										<section className="flex flex-col">
											<Label htmlFor="name" value="Listing Name" />
											<TextInput
												value={property.name}
												id="name"
												onChange={(event) =>
													handleChange("name", event.target.value)
												}
												required
											/>
										</section>
										<section className="flex flex-col">
											<Label htmlFor="address" value="Address" />
											<TextInput
												value={property.address}
												id="address"
												onChange={(event) =>
													handleChange(
														"address",
														event.target.value
													)
												}
												required
											/>
										</section>
										<section className="flex flex-col">
											<Label htmlFor="district" value="District" />
											<Select
												name="district"
												required
												onChange={(ev) =>
													handleChange("district", ev.target.value)
												}
											>
												{list_of_district.map((value, index) => (
													<option key={index} value={value}>
														{value}
													</option>
												))}
											</Select>
										</section>
										<section className="flex flex-col">
											<Label
												htmlFor="property_type"
												value="Property Type"
											/>
											<div className="flex flex-row my-2">
												<Button.Group id="property_type">
													<Button
														value="HDB"
														color={"purple"}
														className={
															property.property_type === "HDB"
																? "hover:text-white bg-custom_purple2 outline outline-1"
																: "hover:text-white bg-white text-black outline outline-1"
														}
														onClick={() =>
															handleChange(
																"property_type",
																"HDB"
															)
														}
													>
														HDB
													</Button>
													<Button
														value="CONDO"
														color={"purple"}
														className={
															property.property_type === "CONDO"
																? "hover:text-white bg-custom_purple2 outline"
																: "hover:text-white bg-white text-black outline outline-1"
														}
														onClick={() =>
															handleChange(
																"property_type",
																"CONDO"
															)
														}
													>
														Condominium
													</Button>
													<Button
														value="LANDED"
														color={"purple"}
														className={
															property.property_type === "LANDED"
																? "hover:text-white bg-custom_purple2 outline"
																: "hover:text-white bg-white text-black outline outline-1"
														}
														onClick={() =>
															handleChange(
																"property_type",
																"LANDED"
															)
														}
													>
														Landed
													</Button>
												</Button.Group>
											</div>
										</section>
									</div>
								</div>

								<div className="flex flex-row justify-between">
									<div className="flex flex-col mr-5 w-1/2">
										<Label
											htmlFor="description"
											value="Description"
										/>
										<Textarea
											value={property.description}
											placeholder="Description about your property..."
											onChange={(ev) =>
												handleChange("description", ev.target.value)
											}
											required
											className="h-full"
										/>
									</div>

									<div className="w-1/2 flex flex-col gap-1 justify-between">
										<section className="flex flex-col">
											<Label
												htmlFor="num_of_bedrooms"
												value="Bedrooms"
											/>
											<TextInput
												id="num_of_bedrooms"
												className="w-full"
												color={
													property.num_of_bedrooms > 8 ||
													property.num_of_bedrooms < 1
														? "failure"
														: "success"
												}
												type="number"
												value={property.num_of_bedrooms}
												onChange={(event) =>
													handleChange(
														"num_of_bedrooms",
														event.target.value
													)
												}
												required
											/>
										</section>

										<section className="flex flex-col">
											<Label
												htmlFor="num_of_bathrooms"
												value="Bathrooms"
											/>
											<TextInput
												id="num_of_bathrooms"
												className="w-full"
												color={
													property.num_of_bathrooms > 8 ||
													property.num_of_bathrooms < 1
														? "failure"
														: "success"
												}
												type="number"
												value={property.num_of_bathrooms}
												onChange={(event) =>
													handleChange(
														"num_of_bathrooms",
														event.target.value
													)
												}
												required
											/>
										</section>

										<section className="flex flex-col">
											<Label htmlFor="area" value="Floor Size" />
											<TextInput
												id="area"
												className="w-full"
												color={
													property.area < 0 ? "failure" : "success"
												}
												type="number"
												value={property.area}
												onChange={(event) =>
													handleChange("area", event.target.value)
												}
												required
											/>
										</section>

										<section className="flex flex-col">
											<Label
												htmlFor="transaction_price"
												value="Price"
											/>
											<TextInput
												value={property.price}
												id="transaction_price"
												type="number"
												onChange={(event) =>
													handleChange("price", event.target.value)
												}
												required
											/>
										</section>
									</div>
								</div>
								<div className="flex justify-center my-2 pt-3 gap-5">
									<Button
										color="failure"
										className="w-1/2"
										onClick={() => setState(false)}
									>
										Cancel
									</Button>
									<Button
										type="submit"
										className="bg-custom_purple1 w-1/2"
									>
										Submit
									</Button>
								</div>
							</div>
						</form>
					</Card>
				</Modal>
			</>
		);
	};

	return displayUpdatePLPage();
}
