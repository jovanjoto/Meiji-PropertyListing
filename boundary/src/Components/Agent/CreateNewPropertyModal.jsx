import { Modal, Card, Label, TextInput, Button } from "flowbite-react"
import { FaTimes } from "react-icons/fa"
import { useState } from "react";
import { FileInput } from "flowbite-react";

export default function CreateNewPropertyModal({ state, setState }) {
    // const [propertyType, setPropertyType] = useState("HDB");
    const [numBedrooms, setNumBedrooms] = useState(1);
    const [numBathrooms, setNumBathrooms] = useState(1);
    const [area, setArea] = useState(100);
    const [property, setproperty] = useState({
        name: "",
        id: "0",
        address: "",
        num_bedrooms: 1,
        num_bathrooms: 1,
        district: "",
        property_type: "",
        area: 1.0,
        is_sold: false,
        transaction_date: "",
        transaction_price: 0.0,
        img_url: ""
    });


    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(property)
        if (property.num_bedrooms < 0 || property.num_bedrooms > 8 || property.num_bathrooms < 0 || property.num_bathrooms > 8 || property.area < 0) {
            return false;
        } else {
            console.log(property);
        }
        return true;

    }

    const handleChange = (attribute, value) => {
        setproperty({
            ...property,
            [attribute]: value,
        });
    };

    return (
        <>
            <Modal
                show={state}
                onClose={() => setState(false)}
            >
                <FaTimes
                    className="absolute top-0 left-0 m-2 rounded-md w-5 h-5 cursor-pointer" // Added absolute positioning
                    onClick={() => setState(false)}
                />
                <Card>
                    <form
                        onSubmit={handleSubmit}>
                        <div
                            className="flex flex-row justify-between">
                            <div
                                className="mr-5 w-1/2">
                                <Label
                                    htmlFor="dropzone-file"
                                    className="flex h-full w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                >
                                    <div
                                        className="flex flex-col items-center justify-center pb-6 pt-5">
                                        <svg
                                            className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 20 16"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                            />
                                        </svg>
                                        <p
                                            className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                            <span
                                                className="font-semibold">
                                                Click to upload
                                            </span> or drag and drop
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG</p>
                                    </div>
                                    <FileInput id="dropzone-file"
                                        className="hidden"
                                        onChange={(event) => handleChange("img_url", event.target.files[0])} />
                                </Label>
                            </div>
                            <div
                                className="w-1/2">
                                <div>
                                    <section
                                        className="flex flex-col">
                                        <Label
                                            htmlFor="name"
                                            value="Listing Name" />
                                        <TextInput
                                            value={property.name}
                                            id="name"
                                            onChange={(event) => handleChange("name", event.target.value)}
                                            required
                                        />
                                    </section>

                                    <section
                                        className="flex flex-col">
                                        <Label
                                            htmlFor="address"
                                            value="Address" />
                                        <TextInput
                                            value={property.address}
                                            id="address"
                                            onChange={(event) => handleChange("address", event.target.value)}
                                            required
                                        />
                                    </section>

                                    <section
                                        className="flex flex-col">
                                        <Label
                                            htmlFor="district"
                                            value="District" />
                                        <TextInput
                                            value={property.district}
                                            id="district"
                                            onChange={(event) => handleChange("district", event.target.value)}
                                            required
                                        />
                                    </section>

                                    <section
                                        className="flex flex-col">
                                        <Label
                                            htmlFor="property_type"
                                            value="Property Type" />
                                        <div
                                            className="flex flex-row my-2">
                                            <Button.Group
                                                id="property_type">
                                                <Button
                                                    value="HDB"
                                                    className={(property.property_type === "HDB" ? ("bg-custom_purple1 outline") : ("bg-white text-black outline"))}
                                                    onClick={() => handleChange("property_type", "HDB")}
                                                >
                                                    HDB
                                                </Button>
                                                <Button
                                                    value="Condominium"
                                                    className={(property.property_type === "Condominium" ? ("bg-custom_purple1 outline") : ("bg-white text-black outline"))}
                                                    onClick={() => handleChange("property_type", "Condominium")}
                                                >
                                                    Condominium
                                                </Button>
                                                <Button
                                                    value="Landed"
                                                    className={(property.property_type === "Landed" ? ("bg-custom_purple1 outline") : ("bg-white text-black outline"))}
                                                    onClick={() => handleChange("property_type", "Landed")}
                                                >
                                                    Landed
                                                </Button>

                                            </Button.Group>
                                        </div>

                                    </section>

                                    <section
                                        className="flex flex-col">
                                        <Label
                                            htmlFor="num_bedrooms"
                                            value="Bedrooms" />
                                        <TextInput
                                            id="num_bedrooms"
                                            className="w-full"
                                            color={property.num_bedrooms > 8 || property.num_bedrooms < 1 ? ("failure") : ("success")} type="number"
                                            value={property.num_bedrooms}
                                            onChange={(event) => handleChange("num_bedrooms", event.target.value)}
                                            required />

                                    </section>

                                    <section
                                        className="flex flex-col">
                                        <Label
                                            htmlFor="num_bathrooms"
                                            value="Bathrooms" />
                                        <TextInput
                                            id="num_bathrooms"
                                            className="w-full"
                                            color={property.num_bathrooms > 8 || property.num_bathrooms < 1 ? ("failure") : ("success")} type="number"
                                            value={property.num_bathrooms}
                                            onChange={(event) => handleChange("num_bathrooms", event.target.value)}
                                            required />
                                    </section>

                                    <section
                                        className="flex flex-col">
                                        <Label
                                            htmlFor="area"
                                            value="Floor Size" />
                                        <TextInput
                                            id="area"
                                            className="w-full"
                                            color={property.area < 0 ? ("failure") : ("success")}
                                            type="number"
                                            value={property.area}
                                            onChange={(event) => handleChange("area", event.target.value)}
                                            required />
                                    </section>

                                    <section
                                        className="flex flex-col">
                                        <Label
                                            htmlFor="transaction_price"
                                            value="Price" />
                                        <TextInput
                                            value={property.transaction_price}
                                            id="transaction_price"
                                            onChange={(event) => handleChange("transaction_price", event.target.value)}
                                            required
                                        />
                                    </section>
                                </div>

                            </div>
                        </div>
                        <div
                            className="flex justify-center my-2 pt-5 gap-5">
                            <Button
                                color="failure"
                                className="w-1/2"
                                onClick={() => setState(false)}
                            >Cancel
                            </Button>
                            <Button
                                type="submit"
                                className="bg-custom_purple1 w-1/2"
                            >
                                Submit
                            </Button>
                        </div>


                    </form>

                </Card>
            </Modal>
        </>
    )
}