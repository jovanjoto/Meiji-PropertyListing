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


	// * Date Picker Stuff * //
	function onCloseModal() {
		setState(false);
	}

	useEffect(() => {
		axios
			.get("/api/views/find_property_views", {
				params: { propertyId: id },
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((res) => {
				if (res.status === 200) {
					const aggregatedData = {};
					res.data.view.forEach((view) => {
						const monthYear = new Date(view.year, view.month - 1);
						aggregatedData[monthYear] = view.views;
					});
					const months = Object.keys(aggregatedData).sort(
						(b, a) => new Date(b.date) - new Date(a.date)
					);
					const viewsData = months.map((month) => aggregatedData[month]);
					const viewsLabel = months.map(
						(month) => `${getMonth(month) + 1}/${getYear(month)}`
					);
					setChartData((prev) => ({
						...prev,
						labels: viewsLabel,
						data: viewsData,
					}));
				} else {
					console.log(res.status);
				}
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	const displayViewsModal = (viewData) => {
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

		for (let index = 0; index < viewData.data.length; index++) {
			const labels = viewData.labels[index].split("/");
			const dates = new Date(labels[1], labels[0] - 1);
			if (start_date <= dates && dates <= end_date) {
				console.log(dates);
				data.labels.push(viewData.labels[index]);
				data.datasets[0].data.push(viewData.data[index]);
			}
		}
		console.log(chartData, data);
		return (
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
								<ViewCountBarChart chartData={data} />
							) : (
								<ViewCountLineChart chartData={data} />
							)}
						</section>
					</div>
				</Modal.Body>
			</Modal>
		);
	};

	return displayViewsModal(chartData);
}

export default ViewCountModal;
