import { Modal, Button, Label, Textarea } from "flowbite-react"
import { useState } from "react"


export default function ReviewAgentModal({ email, first_name, last_name, state, setState }) {

    const [agentReview, setAgentReview] = useState("");

    const submitReview = (review) => {
        //onSubmit function for button
        console.log(review);
        if (review.length == 0) {
            return false;
        }
        return true;
    }
    return (
        <>
            <Modal
                show={state}
                onClose={() => setState(false)}
                size="md"
                popup
            >
                <Modal.Header />
                <Modal.Body>
                    <div className="flex flex-col items-center justify-center">
                        <form
                            className="flex flex-col items-center justify-center w-full"
                            onSubmit={() => submitReview(agentReview)}>
                            <Label className="text-lg mb-5">Review {first_name} {last_name}</Label>

                            <Textarea id="agentReview" value={agentReview} onChange={(event) => setAgentReview(event.target.value)} placeholder="Leave a review.." required_rows={4} required />

                            <Button type="submit" className="bg-custom_purple1 mt-5" color="purple">
                                Confirm
                            </Button>
                        </form>
                    </div>

                </Modal.Body>


            </Modal>
        </>
    )
}