import { Modal, Button, Label } from "flowbite-react";
import { useContext, useState } from "react";
import StarRatings from "react-star-ratings";
import { AuthContext } from "../Authentication/AuthContext";
import MessageModal from "../Admin/MessageModal";
import axios from "axios";

export default function RateAgentModal({
	email,
	first_name,
	last_name,
	state,
	setState,
}) {
	const { token } = useContext(AuthContext);
	const [agentRating, setAgentRating] = useState(1);
	const [messageModalOpen, setMessageModalOpen] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);

	const displaySuccessMessage = () => {
		setIsSuccess(true);
	}

	const displayErrorMessage = () => {
		setIsSuccess(false);
	}

	const submitRating = (rating) => {
		axios
			.post(
				"/api/rating/rate_agent",
				{
					agent_email: email,
					rating: rating,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			)
			.then((res) => {
				if (res.data.success === true) {
					displaySuccessMessage();
				} else {
					displayErrorMessage();
				}
			})
			.catch((err) => {
				console.log(err);
			})
			.then(() => setMessageModalOpen(true));
	};

	const onCloseModal = (x) => {
		window.location.reload();
	};

	return (
		<>
			<MessageModal state={messageModalOpen} setState={onCloseModal}>
				{isSuccess && "Success"}
				{!isSuccess &&
					`Error..You already rated ${first_name} ${last_name}`}
			</MessageModal>
			<Modal show={state} onClose={() => setState(false)} size="md" popup>
				<Modal.Header />
				<Modal.Body>
					<div className="flex flex-col items-center justify-center">
						<Label className="text-lg mb-5">
							Rate {first_name} {last_name}
						</Label>
						<StarRatings
							rating={agentRating}
							starRatedColor="rgb(240,192,14)"
							changeRating={(newRating) => setAgentRating(newRating)}
							numberOfStars={5}
							isAggregateRating={false}
							starDimension="30px"
							name="rating"
						></StarRatings>

						<Button
							className="bg-custom_purple1 w-1/5 mt-5"
							color="purple"
							onClick={() => submitRating(agentRating)}
						>
							Confirm
						</Button>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
}
