import { Card } from "flowbite-react";
import React from "react";
import { CiMail } from "react-icons/ci";
import { FaPhoneAlt } from "react-icons/fa";
import StarRatings from "react-star-ratings";
import BuyerPropertyListingCard from "./Buyer/BuyerPropertyListingCard";

export default function ViewAgentProfileCard({
	email,
	phone,
	first_name,
	last_name,
	profile,
	ratings,
	reviews,
	properties,
}) {
	var avg_rating = 0;

	if (ratings.length > 0) {
		avg_rating =
			ratings.reduce((sum, rating) => {
				return sum + rating.rating;
			}, 0) / ratings.length;
	}

	return (
		<div className="flex flex-col w-11/12 justify-center mx-auto">
			<Card className="bg-gray-100">
				<div className="flex flex-row gap-5 justify-center">
					<div className="flex flex-col gap-2 bg-white border shadow-md p-5 px-8 rounded-lg w-5/12">
						<header className="flex flex-col py-2 border-b border-black">
							<h1 className=" text-4xl font-bold">
								{first_name + " " + last_name}
							</h1>
							<h2 className="text-lg font-semibold text-custom_purple2">
								{profile}
							</h2>
							<div className="flex flex-row text-lg gap-2 items-center mt-2">
								<CiMail size={22} />
								<span>{email}</span>
							</div>
							<div className="flex flex-row text-lg gap-2 items-center mt-2">
								<FaPhoneAlt size={22} />
								<span>{phone}</span>
							</div>
						</header>
						<section className="border-b border-black py-4">
							<StarRatings
								rating={avg_rating}
								starRatedColor="dark_purple"
								numberOfStars={5}
								name="rating"
								starDimension="30px"
							/>
						</section>
						<h2 className="text-xl font-semibold mt-1">Ratings:</h2>
						<section className="flex flex-col overflow-auto h-48 gap-3">
							{ratings.map((r) => (
								<div
									key={r.raterEmail}
									className="flex flex-row gap-3 justify-center items-center w-full border border-custom_purple4 shadow-md p-4 rounded-2xl"
								>
									<span className="font-medium">{r.raterEmail}</span>
									<StarRatings
										rating={r.rating}
										starRatedColor="dark_purple"
										numberOfStars={5}
										name="rating"
										starDimension="20px"
									/>
								</div>
							))}
							{ratings.length == 0 && "No ratings yet."}
						</section>
					</div>
					<div className="w-7/12 bg-white border shadow-md p-5 px-8 rounded-lg">
						<h2 className="text-xl font-semibold mb-2">Reviews:</h2>
						<section className="flex flex-col overflow-auto gap-3">
							{reviews.map((r) => (
								<div
									key={r.reviewerEmail}
									className="flex flex-col gap-2 w-full border border-custom_purple4 shadow-md px-8 py-4 rounded-2xl"
								>
									<span className="font-medium">
										{r.reviewerEmail}
									</span>
									<p className="text-custom_purple2 text-justify">
										"{r.review}"
									</p>
								</div>
							))}
							{reviews.length == 0 && "No reviews yet."}
						</section>
					</div>
				</div>
			</Card>
			<h1 className="text-3xl font-semibold mt-5">Property Listings</h1>
			<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-10 gap-y-10 mt-5">
				{properties.map((p) => (
					<BuyerPropertyListingCard
						key={p.id}
						name={p.name}
						id={p.id}
						address={p.address}
						num_bedrooms={p.num_bedrooms}
						num_bathrooms={p.num_bathrooms}
						district={p.district}
						price={p.price}
						property_type={p.property_type}
						area={p.area}
						is_sold={p.is_sold}
						image_url={p.image_url}
						is_shortlisted={p.is_shortlisted}
					/>
				))}
				{properties.length == 0 && "No listings yet."}
			</div>
		</div>
	);
}
