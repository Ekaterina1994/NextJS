"use client";
import { Fragment, useState, useEffect } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from "chart.js";
import { periods, dropdownValues, DropdownValues } from "../periods";

ChartJS.register(CategoryScale, LinearScale, BarElement);


export default function Dropdown() {
  const [selected, setSelected] = useState(dropdownValues[0]);
  const [value, setValue] = useState(dropdownValues[0].value);


  const [chartData, setChartData] = useState({
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {

    let label;
    let values;

    if(value === "month") {
      label = Object.keys(periods[0].graph.month);
    } else if (value === "sixMonth") {
      label = Object.keys(periods[0].graph.half_year)
    } else {
      label = Object.keys(periods[0].graph.year);
    }
  
    if(value === "month") {
      values = Object.values(periods[0].graph.month);
    } else if (value === "sixMonth") {
      values = Object.values(periods[0].graph.half_year)
    } else {
      values = Object.values(periods[0].graph.year)
    };

    setChartData({
      labels: label.map((item) => item),
      datasets: [{
        data: values.map((item) => item),
        backgroundColor: "blue",
        borderRadius: 4,
        barThickness: 16
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
            callback: function (val: number, index: number): string | undefined {
              let currentValue = this.getLabelForValue(val);
              if (selected.value === "month") {
                if (index === 0) {
                  return `0${currentValue}`;
                } else if (index % 5 === 0) {
                  if (val < 10) {
                    return `0${currentValue - 1}`;
                  } else {
                    return `${currentValue - 1}`;
                  }
                } else if (index % 5 !== 0) {return ""}
              } else {
                return currentValue;
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
  
  const onChange = (selected: DropdownValues) => {
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