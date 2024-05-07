import { React, useEffect } from "react";
import { Modal, Label } from "flowbite-react";
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

Chart.register(CategoryScale);

function ShortlistCountModal({ state, setState, dataset }) { // MAKE SURE TO PUT DATASET AS A PROP WITH THE SAME LENGTH 
  const [selectedChart, setSelectedChart] = useState("Bar");

  // * Chart Stuff * //
  dataset = { // Example dataset
    labels: [
      "Mar 2021",
      "Apr 2021",
      "May 2021",
      "Jun 2021",
      "Jul 2021",
      "Aug 2021",
    ],
    data: [100, 200, 300, 400, 500, 600],
  };

  let bool =
    dataset.labels.length === dataset.data.length && dataset.labels.length > 0;
  const [isValidData, setValidData] = useState(bool);

  const [chartData, setChartData] = useState({
    labels: dataset.labels,
    datasets: [
      {
        label: "Views",
        data: dataset.data,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
        ],
      },
    ],
  });
  // * Chart Stuff * //

  // * Date Picker Stuff * //

  const defaultStartDate = new Date();
  defaultStartDate.setMonth(defaultStartDate.getMonth());
  const [selectedStartMonthData, setSelectedStartMonthData] = useState({
    month: getMonth(defaultStartDate) + 1,
    year: getYear(defaultStartDate),
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

  return (
    <>
      <Modal className="" show={state} onClose={onCloseModal} size="l" popup>
        <FaTimes
          className="absolute top-0 left-0 m-2 rounded-md w-5 h-5 cursor-pointer mb-5" // Added absolute positioning
          onClick={onCloseModal}
        />
        {/* <img className="rounded-full h-20 w-2" src="https://i.pinimg.com/564x/0b/0c/3a/0b0c3a9fa3c7998613b0eaacf4a51e06.jpg"/> */}
        <Modal.Body>
          <section className="my-5">
            <h1
              className="text-center text-2xl font-bold"
              id="view-count-modal"
            >
              Shortlist Count Of Listing
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
          <Dropdown label={selectedChart} color="black" className=" border divide-y divide-gray-200">
            <Dropdown.Item onClick={() => setSelectedChart("Bar")}>
              Bar
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setSelectedChart("Line")}>
              Line
            </Dropdown.Item>
          </Dropdown>
          <section className="flex justify-center">
            {isValidData &&
             (selectedChart === "Bar" ? <ViewCountBarChart chartData={chartData} /> : <ViewCountLineChart chartData={chartData} />)
             }
          </section>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ShortlistCountModal;
