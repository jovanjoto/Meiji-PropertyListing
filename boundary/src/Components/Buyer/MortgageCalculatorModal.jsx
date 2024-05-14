import { Button, Modal, Label, TextInput } from "flowbite-react";
import { FaTimes } from "react-icons/fa";
import { useState, useRef, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../Authentication/AuthContext";

function MortgageCalculatorModal({ state, setState, propertyID }) {
	const [showResult, setShowResult] = useState(false);
	const [result, setResult] = useState({});

	const loanTenureRef = useRef();
	const downPaymentRef = useRef();
	const interestRateRef = useRef();

	const { token } = useContext(AuthContext);

	function onCloseModal() {
		setState(false);
		loanTenureRef.current.value = "";
		downPaymentRef.current.value = "";
		interestRateRef.current.value = "";
		setShowResult(false);
	}

	const handleCalculateButton = async (event) => {
		event.preventDefault();
		const details = {
			loan_tenure: loanTenureRef.current.value,
			dp_percentage: downPaymentRef.current.value,
			interest_rate: interestRateRef.current.value,
		};
		try {
			const res = await axios.post(
				"/api/property_listing/calculate_mortgage",
				{
					propId: propertyID,
					details: details,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			setShowResult(true);
			setResult(res.data.data);
		} catch (err) {
			console.log(err);
		}
	};

	const SGDollar = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "SGD",
	});

	return (
		<>
			<Modal
				className=""
				show={state}
				onClose={onCloseModal}
				size="4xl"
				popup
			>
				<FaTimes
					className="absolute top-0 left-0 m-2 rounded-md w-5 h-5 cursor-pointer" // Added absolute positioning
					onClick={onCloseModal}
				/>
				<Modal.Body className="">
					<h1
						className="text-center text-2xl font-bold mt-10 mb-5"
						id="mortgage-calculator-modal"
					>
						Mortgage Calculator
					</h1>
					<div className="flex flex-row justify-between gap-16 ">
						{/* left */}
						<form
							className="flex flex-col gap-5 w-1/2 "
							onSubmit={handleCalculateButton}
						>
							<div className="flex flex-col">
								<Label>Loan Tenure (years) : </Label>
								<TextInput
									placeholder="Enter loan tenure"
									type="number"
									ref={loanTenureRef}
									min={1}
									required
								/>
							</div>
							<div className="flex flex-col">
								<Label>Down Payment (%) :</Label>
								<TextInput
									placeholder="Enter loan amount"
									type="number"
									ref={downPaymentRef}
									min={0}
									max={100}
									step={0.5}
									required
								/>
							</div>
							<div className="flex flex-col">
								<Label>Interest Rate (%) : </Label>
								<TextInput
									placeholder="Enter interest rate"
									type="number"
									ref={interestRateRef}
									min={0}
									max={100}
									step={0.01}
									required
								/>
							</div>
							<section className="flex flex-col gap-5  items-center">
								<Button
									type="submit"
									color="purple"
									className="bg-custom_purple1 w-full flex justify-center mt-5"
								>
									Calculate
								</Button>
							</section>
						</form>

						{/* right */}
						<section className="flex flex-col  w-1/2 gap-6">
							{showResult ? (
								<>
									<div className="flex flex-col gap-2 border mt-4 px-4 py-1">
										<Label className="text-">Monthly Payment :</Label>
										<div className="flex flex-row items-center">
											<span className="text-xl text-custom_purple1">
												{SGDollar.format(result.monthly_payment)}
											</span>
											<span className="text-custom_purple2 ml-1">
												/ month
											</span>
											<span className="text-custom_purple1 ml-2 text-xs">
												for {loanTenureRef.current.value} years
											</span>
										</div>
									</div>
									<div className="flex flex-col border px-4 text-center py-6 gap-4">
										<div className="flex flex-row justify-between">
											<span className="text-sm">Mortgage Size </span>
											<span className="font-bold">
												{SGDollar.format(result.mortgage_size)}
											</span>
										</div>
										<div className="flex flex-row justify-between">
											<span className="text-sm">
												Mortgage Interest{" "}
											</span>
											<span className="font-bold">
												{SGDollar.format(result.mortgage_interest)}
											</span>
										</div>
										<div className="border-t " />
										<div className="flex flex-row justify-between font-bol ">
											<span className="text-sm">
												Total Mortgage Paid{" "}
											</span>
											<span className="font-bold">
												{SGDollar.format(result.total_mortgage)}
											</span>
										</div>
									</div>
								</>
							) : (
								<div style={{ height: "7.5rem" }} />
							)}
						</section>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
}

export default MortgageCalculatorModal;
