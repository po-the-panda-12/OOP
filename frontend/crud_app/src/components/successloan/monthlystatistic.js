import React, { useState , useEffect} from 'react';
import axios from 'axios';
import {Bar} from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

const backendDomain = process.env.REACT_APP_backendDomain;
const url = backendDomain + "/api/v1/successloan";

export default function MonthlyStatistics() {
  const [chartData,setChartData] = useState({})
  const [loading, setLoading] = useState(false)
  const [options, setOptions] = useState({})
  const [year, setYear] = useState("2022")
  const [labels,setLabels] = useState(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
  const [loanlistconst, setLoanListConst] = useState([])
  

  function handleSubmit(event) {
    setYear(event.target.value)
    setChartData(chartData)
  }

  useEffect (() => { 
    let loanlist = {};
    let borrowlist = {"1": new Set(), "2": new Set(), "3": new Set(), "4": new Set(), "5": new Set(), "6": new Set(), "7": new Set(), "8": new Set(), "9": new Set(), "10": new Set(), "11": new Set(), "12": new Set()};
    let borrowcount = [];
    axios.get(url).then(response => {
      response.data.forEach(successfulloan => {
        if(successfulloan.year in loanlist){
          loanlist[successfulloan.year][parseInt(successfulloan.month)-1] += 1;
        }else{
          loanlist[successfulloan.year] = [0,0,0,0,0,0,0,0,0,0,0,0];
          loanlist[successfulloan.year][parseInt(successfulloan.month)-1] += 1;
        }
        if(successfulloan.year == year){
          borrowlist[successfulloan.month].add(successfulloan.staffId)
        }

      })
      for(var i of Object.keys(borrowlist)){
        console.log(borrowlist[i])
        borrowcount.push(borrowlist[i].size)
      }

      setYear(year)
      setChartData({
        labels: labels,
        datasets:[
          {
            label:"No of loans per month in " + year,
            data: loanlist[year],
            backgroundColor: [
              'rgba(255, 99, 132, 0.5)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)'
            ]
          },
          {
            label:"No of borrowers per month in " + year,
            data: borrowcount,
            backgroundColor: [
              'rgba(54, 162, 235, 0.5)',
            ],
            borderColor: [
              'rgba(54, 162, 235, 1)',
            ]
          }
        ]
      })

      // console.log(loanlist);
      setLoanListConst(Object.keys(loanlist));

      setOptions({
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Monthly chart in ' + year,
          }
        }
      })
      setLoading(true)
  })
  },[year])
  
  if (loading)
  return (
    <div style={{"height": "750px", "width":"850px"}}>
      {/* Select Year: <input name="yearinput" value = {year} onChange={handleSubmit}/> */}
      Select Year:
      <select value={year} onChange={handleSubmit}>
        {loanlistconst.map(res => (
          <option value={res}>
            {res}
          </option>
        ))}
      </select>
      <Bar data={chartData} options = {options}/>
    </div>
    
    
    
  )


}

