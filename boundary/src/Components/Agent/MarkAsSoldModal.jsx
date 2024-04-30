import { useState } from "react"
import MessageModal from "../Admin/MessageModal";
import ConfirmationModal from "../ConfirmationModal";
import { Modal, Card, Label, TextInput, Datepicker, Button } from "flowbite-react";
import { BsBuildingFill, BsFillHouseDoorFill } from "react-icons/bs";


export default function MarkAsSoldModal({ state, setState, id, name, property_type }) {
    const [messageModal, onCloseModal] = useState(false);
    const [confirmationModal, setConfirmationModal] = useState(false);

    const handleSubmit = () => {
        //handle submit
    }
    return (
        <>
            <MessageModal
                id="mark_as_sold"
                state={messageModal}
                setState={onCloseModal}
            >{`Property ${id} successfully marked as sold.`}

            </MessageModal>
            <ConfirmationModal
                state={confirmationModal}
                setState={setConfirmationModal}
            // action={handleSubmit}
            >
                Confirm Property {id} to be marked as Sold
            </ConfirmationModal>

            <Modal
                show={state}
                onClose={() => setState(false)}
                popup
            >
                <Card
                    className="">
                    <div
                        className="flex flex-col items-center">
                        <h5
                            className="text-2xl font-medium text-gray-900 dark:text-white my-5"
                            contentEditable={false}
                        >
                            {name}
                        </h5>

                        {(property_type === "HDB" || property_type === "condo") ?
                            <BsBuildingFill size={70} className="my-5" /> :
                            <BsFillHouseDoorFill size={70} className="my-5" />}
                        <form onSubmit={handleSubmit}>

                            <Label htmlFor="dateSold"/>
                            <Datepicker
                                id="dateSold"
                                maxDate={new Date()}
                                className="w-64"
                                title="Date Sold"
                            />

                            <div className="mt-4 flex flex-col gap-y-5 my-5">
                                <section className="flex flex-col w-full ">
                                    <Label htmlFor="price" value="Price" />
                                    <TextInput id="price" type="number" className="w-64" />
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
    )
}