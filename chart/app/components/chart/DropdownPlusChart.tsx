"use client";
import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import Chart from "./Chart";
import { dropdownValues, DropdownValues } from "../periods";

export default function DropdownPlusChart() {
  const [selected, setSelected] = useState(dropdownValues[0]);
  const [value, setValue] = useState(dropdownValues[0].value);
  
  const onChange = (selected: DropdownValues) => {
    setSelected(selected);
    setValue(selected.value);
  }

  return (
    <div className="h-[476px] w-[995px] relative h-[476px] mx-0 my-auto">
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
      <Chart value={value} selected={selected} />
  </div>
  )
}