import { Card, Label, Button } from "flowbite-react";
import sampleImg from "../../assets/sample_img.jpg";
import { IoLocationOutline } from "react-icons/io5";
import { FaPencilAlt, FaLightbulb, FaUser, FaStar } from "react-icons/fa";
import { MdOutlineKingBed } from "react-icons/md";
import { PiBathtubBold, PiHouseLine } from "react-icons/pi";
import { MdOutlineCropSquare } from "react-icons/md";
import { GrLocationPin } from "react-icons/gr";
import React, { useContext, useEffect, useState } from "react";
import RateAgentModal from "./RateAgentModal";
import ReviewAgentModal from "./ReviewAgentModal";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { AuthContext } from "../Authentication/AuthContext";
import ConfirmationModal from "../ConfirmationModal";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

function ViewPropertyListingCard({
	id,
	price,
	name,
	type,
	address,
	district,
	description,
	num_of_bedrooms,
	num_of_bathrooms,
	area,
	image_url,
	listing_date,
	is_sold,
	transaction_date,
	agent,
	editable,
	showUpdateModalState,
	setShowUpdateModalState,
	openUpdatePLFunc,
	displayUpdatePLPageFunc,
	is_shortlisted,
}) {
	const SGDollar = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "SGD",
	});
	const { token } = useContext(AuthContext);
	const user = jwtDecode(token);
	const navigate = useNavigate();
	const [showAgentRatingModal, setShowAgentRatingModal] = useState(false);
	const [showAgentReviewModal, setShowAgentReviewModal] = useState(false);
	const [shortListed, setShortlisted] = useState(is_shortlisted);
	const [confirmationOpen, setConfirmationOpen] = useState(false);
	const rate = (agent_email) => {
		setShowAgentRatingModal(true);
		console.log(agent_email);
	};

	const promptRating = () => {
		return (
			<>
				<RateAgentModal
					email={agent.email}
					first_name={agent.first_name}
					last_name={agent.last_name}
					state={showAgentRatingModal}
					setState={setShowAgentRatingModal}
				/>
			</>
		);
	};

	const review = (agent_email) => {
		setShowAgentReviewModal(true);
	};

	const promptReview = () => {
		return (
			<>
				<ReviewAgentModal
					email={agent.email}
					first_name={agent.first_name}
					last_name={agent.last_name}
					state={showAgentReviewModal}
					setState={setShowAgentReviewModal}
				/>
			</>
		);
	};

	const shortlist = () => {
		axios
			.post(
				"/api/shortlist/shortlist_property",
				{
					propertyId: id,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((res) => {
				if (res.data.success === true) {
					setShortlisted(true);
				}
			})
			.catch((err) => {
				console.log(err);
				navigate("/");
			});
	};

	const clickRemoveIcon = () => {
		setConfirmationOpen(true);
	};

	const clickYes = () => {
		axios
			.delete("/api/shortlist/remove_shortlist_property", {
				headers: {
					Authorization: `Bearer ${token}`,
				},
				data: {
					propertyId: id,
				},
			})
			.then((res) => {
				if (res.data.success === true) {
					setShortlisted(false);
					setConfirmationOpen(false);
				}
			})
			.catch((err) => {
				console.log(err);
				navigate("/");
			});
	};

	return (
		<>
			<ConfirmationModal
				state={confirmationOpen}
				setState={setConfirmationOpen}
				action={clickYes}
			>
				Are you sure to remove this shortlist?
			</ConfirmationModal>
			{showAgentRatingModal && promptRating()}
			{showAgentReviewModal && promptReview()}
			{displayUpdatePLPageFunc(
				showUpdateModalState,
				setShowUpdateModalState
			)}
			<Card className={`w-5/6 2xl:w-10/12 mx-auto bg-gray-100`}>
				{is_sold && (
					<div className="flex w-full h-full justify-center items-center bg-custom_purple2 text-white font-bold rounded-lg">
						THIS PROPERTY HAS BEEN SOLD ON {transaction_date}
					</div>
				)}
				<div
					className={`flex flex-col lg:flex-row justify-between gap-12 ${
						is_sold && "text-gray-400"
					}`}
				>
					<img src={image_url} className="lg:w-1/2 rounded shadow" />

					{/* HTML Card For Property's Information */}

					<div className="block p-6 bg-white border border-gray-200 lg:w-1/2 rounded-lg shadow cursor-default">
						<header className="border-b border-black">
							<section className="flex justify-between flex-row mb-4">
								<h1 className="text-5xl font-bold mb-1">{name}</h1>
								{editable && !is_sold && (
									<div className="hover:bg-gray-100 p-2 mr-2 mt-2 rounded-lg">
										<FaPencilAlt
											className="cursor-pointer"
											size={24}
											onClick={openUpdatePLFunc}
										/>
									</div>
								)}
							</section>
							<section className="flex justify-between flex-col mb-2 gap-3">
								<section className="flex flex-row">
									<IoLocationOutline className="mr-2" size={20} />
									<p className="text-sm ">{address}</p>
								</section>
								<section className="flex flex-row">
									<GrLocationPin className="mr-2" size={20} />
									<p className="text-sn">{district}</p>
								</section>

								<div className="flex flex-row gap-2">
									<span
										className={`px-4 py-1 ${
											is_sold ? "bg-gray-400" : "bg-custom_purple2"
										} text-white text-xs rounded-full mb-2 mt`}
									>
										{type}
									</span>
									<span className="text-custom_purple3">
										Listed on {listing_date}
									</span>
								</div>
							</section>
						</header>

						<header className="flex border-b border-black">
							{/* Price */}
							<section className="w-full border-black py-5 flex flex-row justify-between">
								<h1 className="text-4xl font-semibold">
									{SGDollar.format(price)}
								</h1>
								{user.has_buying_permission ? shortListed ? (
									<FaHeart
										size={42}
										color="red"
										onClick={clickRemoveIcon}
									/>
								) : (
									<CiHeart size={42} onClick={shortlist} />
								):<></>}
							</section>
							{/* Logo - More Information */}
						</header>
						<div className="flex flex-row justify-between mt-4">
							<section className="flex flex-col gap-5">
								<div className="flex flex-row items-center gap-5">
									<MdOutlineKingBed className="" size={24} />
									<span>{num_of_bedrooms} bedroom(s)</span>
								</div>
								<div className="flex flex-row items-center gap-5">
									<PiBathtubBold className="" size={24} />
									<span>{num_of_bathrooms} bathroom(s)</span>
								</div>
								<div className="flex flex-row items-center gap-5">
									<MdOutlineCropSquare className="" size={24} />
									<div className="flex flex-row items-center ">
										<span className="leading-tight">{area} sqft</span>
									</div>
								</div>
							</section>
							{/* Agent Card */}
							<a className="block p-6 bg-white border border-gray-200 rounded-lg shadow lg:w-1/2 justify-start">
								<div className="flex flex-row items-center mb-4">
									<FaUser
										className="mr-3 rounded-full bg-white"
										size={42}
									/>
									<section className="flex flex-col justify-center">
										<h1 className="text-2xl font-semibold">
											{agent.first_name + " " + agent.last_name}
										</h1>
										{/* <div className="flex flex-row items-center">
									<FaStar className="mr-1" size={12} />
									<p className="text-sm">{agent.rating}</p>
								</div> */}
									</section>
								</div>
								<div className="flex flex-col gap-4">
									<section className="flex flex-col">
										<Label
											className="text-gray-500 text-md"
											color=""
											value="Phone :"
										/>
										<Label
											className="text-md"
											color=""
											value={agent.phone}
										/>
									</section>
									<section className="flex flex-col">
										<Label
											className="text-gray-500 text-md"
											color=""
											value="Email :"
										/>
										<Label
											className="text-md"
											color=""
											value={agent.email}
										/>
									</section>
									{user.has_buying_permission && (
										<section className="flex flex-row justify-around">
											<Button
												color="purple"
												className="bg-custom_purple1 w-2/5"
												onClick={() => rate(agent.email)}
											>
												Rate
											</Button>
											<Button
												color="purple"
												className="bg-custom_purple1 w-2/5"
												onClick={() => review(agent.email)}
											>
												Review
											</Button>
										</section>
									)}
								</div>
							</a>
						</div>
					</div>
				</div>
				<div
					className={`flex flex-col p-6 bg-white border border-gray-200 rounded-lg shadow justify-between gap-1 mt-2 ${
						is_sold && "text-gray-400"
					}`}
				>
					<h3 className="text-2xl font-bold tracking-tight">
						About This Property
					</h3>
					<p className="text-md mt-1 text-justify">{description}</p>
				</div>
			</Card>
		</>
	);
}

export default ViewPropertyListingCard;
