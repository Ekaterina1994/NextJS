import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement } from "chart.js";
import { periods, DropdownValues } from "../periods";

type ChartProps = {
  value: string,
  selected: DropdownValues,
}

ChartJS.register(CategoryScale, LinearScale, BarElement);

export default function Chart(props: ChartProps) {
  const [chartData, setChartData] = useState({
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({});

  let label: string[];
  let values: number[];

  if(props.value === "month") {
    label = Object.keys(periods[0].graph.month);
  } else if (props.value === "sixMonth") {
    label = Object.keys(periods[0].graph.half_year)
  } else {
    label = Object.keys(periods[0].graph.year);
  }

  if(props.value === "month") {
    values = Object.values(periods[0].graph.month);
  } else if (props.value === "sixMonth") {
    values = Object.values(periods[0].graph.half_year)
  } else {
    values = Object.values(periods[0].graph.year)
  };

  const setChartValues = (labels: string[], values: number[]) => {
    setChartData({
      labels: labels.map((item) => item),
      datasets: [{
        data: values.map((item) => item),
        backgroundColor: "blue",
        borderRadius: 4,
        barThickness: 16
      }],
    },
    );
  };

  const setChartOptionsValues = () => {
    setChartOptions({
      scales: {
        x: {
          grid: {
            display: false,
            drawBorder: false,
          },
          ticks: {
            callback: function (val: string | number, index: number): string | undefined {
              let currentValue = this.getLabelForValue(val);
              if (props.selected.value === "month") {
                if (index === 0) {
                  return `0${currentValue}`;
                } else if (index % 5 === 0) {
                  if (val < 10) {
                    return `0${+currentValue - 1}`;
                  } else {
                    return `${+currentValue - 1}`;
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
  }

  useEffect(() => {
    setChartValues(label, values);
    setChartOptionsValues();
  }, [props.value])
  
  return (
    <div className="h-[400px] w-[995px] mt-[76px] bg-[#FF00F5] bg-opacity-5 rounded-[27px] p-10">
    <Bar
        data={chartData}
        options={chartOptions}
      />
      </div>
  )
}