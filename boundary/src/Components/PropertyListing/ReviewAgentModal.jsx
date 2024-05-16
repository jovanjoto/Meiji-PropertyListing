import { Modal, Button, Label, Textarea } from "flowbite-react";
import { useContext, useState } from "react";
import { AuthContext } from "../Authentication/AuthContext";
import MessageModal from "../Admin/MessageModal";
import axios from "axios";

export default function ReviewAgentModal({
	email,
	first_name,
	last_name,
	state,
	setState,
}) {
	const { token } = useContext(AuthContext);
	const [agentReview, setAgentReview] = useState("");
	const [messageModalOpen, setMessageModalOpen] = useState(false);
	const [isSuccess, setIsSuccess] = useState(false);

	const displaySuccessMessage = () => {
		setIsSuccess(true);
	}

	const displayErrorMessage = () => {
		setIsSuccess(false);
	}

	const submitReview = (review) => {
		//onSubmit function for button
		if (review.trim() === "") {
			return alert("Please enter your review..");
		} else {
			axios
				.post(
					"/api/review/review_agent",
					{
						agent_email: email,
						review: review,
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
		}
	};

	const onCloseModal = (x) => {
		window.location.reload();
	};

	return (
		<>
			<MessageModal state={messageModalOpen} setState={onCloseModal}>
				{isSuccess && "Success"}
				{!isSuccess &&
					`Error..You already reviewed ${first_name} ${last_name}`}
			</MessageModal>
			<Modal show={state} onClose={() => setState(false)} size="md" popup>
				<Modal.Header />
				<Modal.Body>
					<div className="flex flex-col items-center justify-center">
						<div className="flex flex-col items-center justify-center w-full">
							<Label className="text-lg mb-5">
								Review {first_name} {last_name}
							</Label>

							<Textarea
								id="agentReview"
								value={agentReview}
								onChange={(event) => setAgentReview(event.target.value)}
								placeholder="Leave a review.."
								required_rows={4}
								required
							/>

							<Button
								type="button"
								onClick={() => submitReview(agentReview)}
								className="bg-custom_purple1 mt-5"
								color="purple"
							>
								Confirm
							</Button>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
}
