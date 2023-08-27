export const periods = [{
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

export type DropdownValues = {
  title: string,
  value: string,
}

export const dropdownValues = [
  { title: "За последний месяц", value: "month" },
  { title: "За последний год", value: "year" },
  { title: "За последние 6 месяцев", value: "sixMonth" },
];