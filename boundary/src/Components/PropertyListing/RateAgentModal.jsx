import { Modal, Button, Label } from "flowbite-react"
import { useState } from "react";
import StarRatings from 'react-star-ratings';

export default function RateAgentModal({ email, first_name, last_name, state, setState }) {

    const [agentRating, setAgentRating] = useState(0);


    const submitRating = (rating) => {
        console.log(rating);
        //axios request here
    }

    return (
        <>
            <Modal
                show={state}
                onClose={()=> setState(false)}
                size="md"
                popup
            >
                <Modal.Header />
                <Modal.Body>
                    <div className="flex flex-col items-center justify-center">
                        <Label className="text-lg mb-5">Rate {first_name} {last_name}</Label>
                        <StarRatings
                            rating={agentRating}
                            starRatedColor="rgb(240,192,14)"
                            changeRating={(newRating) => setAgentRating(newRating)}
                            numberOfStars={5}
                            isAggregateRating={false}
                            starDimension="30px"
                            name='rating'
                        >
                        </StarRatings>

                        <Button className="bg-custom_purple1 w-1/5 mt-5" color="purple" onClick={() => submitRating(agentRating)}>
                            Confirm
                        </Button>
                    </div>

                </Modal.Body>


            </Modal>

        </>

    )
}