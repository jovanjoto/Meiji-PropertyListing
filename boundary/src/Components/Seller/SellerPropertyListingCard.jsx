import { Card, Button } from "flowbite-react";

import { GoDotFill } from "react-icons/go";
import { LuBath } from "react-icons/lu";
import { FaBed, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import ShortlistCountModal from "./ShortlistCountModal";
import { useState } from "react";
import ViewCountModal from "./ViewCountModal";
import NumShortlistModal from "./NumShortlistModal";

function SellerPropertyListingCard({
	name,
	id,
	address,
	num_bedrooms,
	num_bathrooms,
	district,
	price,
	property_type,
	area,
	is_sold,
	image_url,
}) {
	const navigate = useNavigate();
	const [showViews, setShowViews] = useState(false);
	const [showShortlist, setShowShortlist] = useState(false);
	const redirectToPage = (id) => {
		navigate(`/seller/viewPropertyListingPage/${id}`);
	};

	const SGDollar = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	});

	return (
		<>
			<ViewCountModal state={showViews} setState={setShowViews} id={id} />
			<NumShortlistModal
				state={showShortlist}
				setState={setShowShortlist}
				propertyName={name}
				propertyId={id}
			/>
			<Card
				className="max-w-sm"
				imgAlt="Meaningful alt text for an image that is not purely decorative"
				imgSrc={image_url}
			>
				<div className="flex flex-col gap-1">
					<h1 className="text-2xl font-bold">{name}</h1>
					<span className="font-medium">S{SGDollar.format(price)}</span>
					<div className="flex flex-row gap-3">
						<div className="flex flex-row">
							<span className="text-sm mr-2">{num_bedrooms} </span>
							<span>
								<FaBed size={20} />
							</span>
						</div>
						<div className="flex flex-row">
							<span className="text-sm mr-2">{num_bathrooms}</span>
							<span>
								<LuBath size={20} />
							</span>
						</div>
						<div className="flex justify-center items-center align-middle">
							<GoDotFill size={6} />
						</div>
						<span className="text-sm mr-2">{area} sqft</span>
					</div>
					<span className="text-gray-500">{address}</span>
					<span className="text-gray-500">{district}</span>
					<div className="flex flex-col gap-3">
						<section className="flex flex-row justify-between gap-7">
							<div className="mt-1 flex flex-row gap-1 justify-between w-1/2">
								<div className="flex flex-row gap-1">
									<span
										className={`px-4 py-1 w-fit ${
											is_sold ? "bg-gray-400" : "bg-custom_purple2"
										} text-white text-xs rounded-full`}
									>
										{property_type}
									</span>
									{is_sold && (
										<span
											className={
												"px-4 py-1 w-fit bg-gray-400 text-white text-xs rounded-full"
											}
										>
											SOLD
										</span>
									)}
								</div>
							</div>
						</section>
						<Button
							color="purple"
							className="bg-custom_purple1"
							onClick={() => redirectToPage(id)}
						>
							View Listing
						</Button>
						<div className="flex flex-row justify-between gap-1">
							<Button
								color="purple"
								className="bg-custom_purple1 z-50 w-1/2"
								onClick={() => setShowViews(true)}
							>
								Views Stats
							</Button>
							<Button
								color="purple"
								className="bg-custom_purple1 w-1/2"
								onClick={() => setShowShortlist(true)}
							>
								Shortlist Count
							</Button>
						</div>
					</div>
				</div>
			</Card>
		</>
	);
}

export default SellerPropertyListingCard;
