"use client";
import { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";

import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import 'chartjs-plugin-style';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
)

const periods = [{
  "earnings": {
    "year_sum": 0,
    "six_month_sum": 0,
    "last_month_sum": 0
  },
  "graph": {
    "year": {
      "January": 5100,
      "February": 560,
      "March": 5100,
      "April": 560,
      "May": 560,
      "June": 5100,
      "July": 5100,
      "August": 560,
      "September": 560,
      "October": 560,
      "November": 5100,
      "December": 5100
    },
    "half_year": {
      "January": 5100,
      "February": 560,
      "March": 5100,
      "April": 5100,
      "May": 560,
      "June": 5100
    },
    "month": {
      "1": 5100,
      "2": 5100,
      "3": 5100,
      "4": 5100,
      "5": 560,
      "6": 560,
      "7": 5100,
      "8": 5100,
      "9": 560,
      "10": 5100,
      "11": 560,
      "12": 5100,
      "13": 5100,
      "14": 560,
      "15": 5100,
      "16": 5100,
      "17": 5100,
      "18": 560,
      "19": 560,
      "20": 5100,
      "21": 5100,
      "22": 5100,
      "23": 5100,
      "24":  560,
      "25": 560,
      "26": 560,
      "27": 5100,
      "28": 5100,
      "29": 5100,
      "30": 5100,
      "31": 5100
    }
  }
}
]

const dropdownValues = [
  { title: "За последний месяц", value: "month" },
  { title: "За последний год", value: "year" },
  { title: "За последние 6 месяцев", value: "sixMonth" },
];

export default function Dropdown() {
  const [selected, setSelected] = useState(dropdownValues[0]);
  const [value, setValue] = useState("month");


  const [chartData, setChartData] = useState({
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {

    let label;

    if(value === "month") {
      label = Object.keys(periods[0].graph.month);
    } else if (value === "sixMonth") {
      label = Object.keys(periods[0].graph.half_year)
    } else {
      label = Object.keys(periods[0].graph.year);
    }
  
    let values = Object.values(periods[0].graph.year);
    if(value === "month") {
      values = Object.values(periods[0].graph.month);
    } else if (value === "sixMonth") {
      values = Object.values(periods[0].graph.half_year)
    };

    const ticksArray = [0, 100, 200, 500, 1000, 2000, 5000 ];

    setChartData({
      labels: label.map((item) => item),
      datasets: [{
        data: values.map((item) => item),
        backgroundColor: "blue",
        borderRadius: 4,
        width: 15,
        barThickness: 16,
        shadowOffsetX: 3,
        shadowOffsetY: 3,
        shadowBlur: 10,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
      }],
    },
    );
    setChartOptions({
      scales: {
        x: {
          grid: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            // For a category axis, the val is the index so the lookup via getLabelForValue is needed
            callback: function(val, index) {
              // Hide every 2nd tick label
              if (selected.value === "month") {
                if (index === 0) {
                  return `0${this.getLabelForValue(val)}`;
                } else if (index % 5 === 0) {
                  if (val < 10) {
                    return `0${this.getLabelForValue(val - 1)}`;
                  } else {
                    return this.getLabelForValue(val - 1);
                  }
                } else {
                  return "";
                }
              } else {
                return this.getLabelForValue(val);
              }
            },
          }
        },
        y: {
          grid: {
            display: false
          },
        },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
        maintainAspectRatio: false,
        responsive: true
      }
    )
  }, [value])
  
  const onChange = (selected) => {
    setSelected(selected);
    console.log(selected);
    setValue(selected.value);
    console.log(value);
  }


  return (
    <div className="w-[995px] relative h-[476px] mx-0 my-auto">
    <Listbox value={selected} onChange={onChange}>
      <div className="mt-1 absolute top-0 right-0">
        <Listbox.Button className="relative w-[380px] h-12 rounded-[28px] cursor-default bg-white border-2 border-[#000AFF] py-[9px] pl-[20px] pr-10 text-left focus:outline-none ease-[cubic-bezier(0.95,0.05,0.795,0.035)]">
          <span className="block truncate hover:text-[#000AFF]">{selected.title}</span>
          <span className="hover:cursor-pointer absolute inset-y-0 right-0 flex items-center pr-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="12" viewBox="0 0 28 17" fill="none">
                <path d="M26 2L14 14L2 2" stroke="#000AFF" strokeWidth="3" strokeLinecap="round"/>
              </svg>
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-[380px] mt-[-2px] overflow-auto rounded-[28px] bg-white border-2 border-[#000AFF] py-[9px] my-0 text-base focus:outline-none sm:text-sm">
            {dropdownValues.filter((item) => item.title !== selected.title).map((dropdownValue, dropdownValuesIdx) => (
              <Listbox.Option
                key={dropdownValuesIdx}
                className="py-[9px] pl-[20px] pr-10 hover:text-[#000AFF] hover:cursor-pointer bg-white"
                value={dropdownValue}
              >
                <span>
                  {dropdownValue.title}
                </span>
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
      </Listbox>
      <div className="h-[400px] w-[995px] mt-[76px] bg-[#FF00F5] bg-opacity-5 rounded-[27px] p-10">
          <Bar
            data={chartData}
            options={chartOptions}
          />
        </div>
  </div>
  )
}