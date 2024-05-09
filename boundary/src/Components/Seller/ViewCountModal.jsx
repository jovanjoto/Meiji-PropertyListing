import { React, useContext, useEffect } from "react";
import { Modal, Label, Spinner } from "flowbite-react";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";

import axios from "axios";

import Chart from "chart.js/auto";

import { CategoryScale } from "chart.js";

import MonthPicker from "../DateMonthPicker/MonthPicker";
import MonthInput from "../DateMonthPicker/MonthInput";
import ViewCountBarChart from "./ViewCountBarChart";

import { Dropdown } from "flowbite-react";
import { getMonth, getYear, endOfMonth } from "date-fns";
import ViewCountLineChart from "./ViewCountLineChart";
import { AuthContext } from "../Authentication/AuthContext";

Chart.register(CategoryScale);

function ViewCountModal({ state, setState, id }) {
	// MAKE SURE TO PUT DATASET AS A PROP WITH THE SAME LENGTH
	const { token } = useContext(AuthContext);
	const [selectedChart, setSelectedChart] = useState("Bar");
	const [isLoading, setIsLoading] = useState(false);
	const [chartData, setChartData] = useState({
		labels: [],
		data: [],
	});

	// * Date Picker Stuff * //
	const defaultStartDate = new Date();
	defaultStartDate.setMonth(defaultStartDate.getMonth());
	const [selectedStartMonthData, setSelectedStartMonthData] = useState({
		month: getMonth(defaultStartDate) + 1,
		year: getYear(defaultStartDate) - 1,
	});

	const [isStartPickerOpen, setIsStartPickerOpen] = useState(false);

	const today = new Date();
	const [selectedEndMonthData, setSelectedEndMonthData] = useState({
		month: getMonth(today) + 1,
		year: getYear(today),
	});

	const [isEndPickerOpen, setIsEndPickerOpen] = useState(false);

	const maxDate = endOfMonth(new Date());

	useEffect(() => {
		setIsLoading(true);
		axios
			.get("/api/views/find_property_views", {
				params: { propertyId: id },
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((res) => {
				if (res.status === 200) {
					const processed_data = process_data(res.data.view);
					setChartData((prev) => ({
						...prev,
						labels: processed_data.labels,
						data: processed_data.data,
					}));
				} else {
					console.log(res.status);
				}
			})
			.catch((error) => {
				console.log(error);
			})
			.then(() => setIsLoading(false));
	}, []);

	const process_data = (views) => {
		const aggregatedData = {};
		views.forEach((view) => {
			const monthYear = `${view.month}/${view.year}`;
			aggregatedData[monthYear] = view.views;
		});
		const months = Object.keys(aggregatedData).sort();
		const viewsData = months.map((month) => aggregatedData[month]);

		return {
			labels: months,
			data: viewsData,
		};
	};

	const filter_date = () => {
		const data = {
			labels: [],
			datasets: [
				{
					label: "Views",
					data: [],
				},
			],
		};
		const start_date = new Date(
			selectedStartMonthData.year,
			selectedStartMonthData.month - 1
		);
		const end_date = new Date(
			selectedEndMonthData.year,
			selectedEndMonthData.month - 1
		);

		for (let index = 0; index < chartData.data.length; index++) {
			const labels = chartData.labels[index].split("/");
			const dates = new Date(labels[1], labels[0] - 1);
			if (start_date <= dates && dates <= end_date) {
				console.log(dates);
				data.labels.push(chartData.labels[index]);
				data.datasets[0].data.push(chartData.data[index]);
			}
		}
		return data;
	};

	// * Date Picker Stuff * //
	function onCloseModal() {
		setState(false);
	}

	const displayLoading = () => {
		return (
			<div className="text-center text-8xl">
				<Spinner aria-label="Extra large spinner example" size="xl" />
			</div>
		);
	};

	if (isLoading) {
		return displayLoading();
	}

	return (
		<>
			<Modal className="" show={state} onClose={onCloseModal} popup>
				<FaTimes
					className="absolute top-0 left-0 m-2 rounded-md w-5 h-5 cursor-pointer mb-5" // Added absolute positioning
					onClick={onCloseModal}
				/>
				{/* <img className="rounded-full h-20 w-2" src="https://i.pinimg.com/564x/0b/0c/3a/0b0c3a9fa3c7998613b0eaacf4a51e06.jpg"/> */}
				<Modal.Body>
					<div className="flex flex-col justify-center">
						<section className="my-5">
							<h1
								className="text-center text-2xl font-bold"
								id="view-count-modal"
							>
								View Count Of Listing
							</h1>
						</section>
						<section className="flex flex-row justify-center gap-20">
							<div className="flex flex-col">
								<Label>Start Date</Label>
								<MonthInput
									selected={selectedStartMonthData}
									setShowMonthPicker={setIsStartPickerOpen}
									showMonthPicker={isStartPickerOpen}
									size="small"
								/>
								{isStartPickerOpen ? (
									<MonthPicker
										setIsOpen={setIsStartPickerOpen}
										selected={selectedStartMonthData}
										onChange={setSelectedStartMonthData}
										borderRadiusMonth="9px"
										bgColorMonthActive="#F7AEF8"
										size="small"
										maxDate={maxDate}
									/>
								) : null}
							</div>
							<div className="flex flex-col">
								<Label>End Date</Label>
								<MonthInput
									selected={selectedEndMonthData}
									setShowMonthPicker={setIsEndPickerOpen}
									showMonthPicker={isEndPickerOpen}
									size="small"
								/>
								{isEndPickerOpen ? (
									<MonthPicker
										setIsOpen={setIsEndPickerOpen}
										selected={selectedEndMonthData}
										onChange={setSelectedEndMonthData}
										borderRadiusMonth="9px"
										bgColorMonthActive="#F7AEF8"
										size="small"
										maxDate={maxDate}
									/>
								) : null}
							</div>
						</section>
						<Dropdown
							label={selectedChart}
							color="black"
							className=" border divide-y divide-gray-200"
						>
							<Dropdown.Item onClick={() => setSelectedChart("Bar")}>
								Bar
							</Dropdown.Item>
							<Dropdown.Item onClick={() => setSelectedChart("Line")}>
								Line
							</Dropdown.Item>
						</Dropdown>
						<section className="flex justify-center">
							{selectedChart === "Bar" ? (
								<ViewCountBarChart chartData={filter_date()} />
							) : (
								<ViewCountLineChart chartData={filter_date()} />
							)}
						</section>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
}

export default ViewCountModal;
