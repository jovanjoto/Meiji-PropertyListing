import { Card, Button } from "flowbite-react";

import { GoDotFill } from "react-icons/go";
import { LuBath } from "react-icons/lu";
import { FaBed } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function BuyerPropertyListingCard({
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
	const redirectToPage = (id) => {
		navigate(`/buyer/viewPropertyListingPage/${id}`);
	};

	const SGDollar = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	});

	return (
		<Card
			className="max-w-sm"
			size
			imgAlt="Meaningful alt text for an image that is not purely decorative"
			imgSrc={image_url}
			onClick={() => redirectToPage(id)}
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
				<div className="mt-1 flex flex-row gap-1">
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
		</Card>
	);
}
