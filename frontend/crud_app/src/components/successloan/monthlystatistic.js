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
import zoomPlugin from 'chartjs-plugin-zoom';


// monthly statistics (number of loans per month, number of borrowers per month)
// number of loans per employee  (monthly, bi-annual, annual)

// custom autorization
// security config

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  zoomPlugin
);

const backendDomain = process.env.REACT_APP_backendDomain;
const url = backendDomain + "/api/v1/successloan";

export default function MonthlyStatistics() {
  const [chartData,setChartData] = useState({})
  const [loading, setLoading] = useState(false)
  const [options, setOptions] = useState({})
  const [year, setYear] = useState("2022")
  const [labels,setLabels] = useState(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']);
  const [loanBookings,setLoanBookings] = useState()
  const [loanlistconst, setLoanListConst] = useState([])
  

  function handleSubmit(event) {
    setYear(event.target.value)
    setChartData(chartData)
  }
// {2022: [], 2021:[]}
  useEffect (() => { 
    let loanlist = {};
    axios.get(url).then(response => {
      response.data.forEach(successfulloan => {
        if(successfulloan.year in loanlist){
          console.log("reach in the in loop here");
          loanlist[successfulloan.year][parseInt(successfulloan.month)-1] += 1;
        }else{
          loanlist[successfulloan.year] = [0,0,0,0,0,0,0,0,0,0,0,0];
          loanlist[successfulloan.year][parseInt(successfulloan.month)-1] += 1;
        }
      })
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
            data: [2, 3, 4, 6, 5, 5, 6, 3, 4, 7, 8, 3],
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
    <div style={{"height": "750px", "width":"800px"}}>
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

// export default function ViewStatistics() {
//   const [chartData,setChartData] = useState({})
//   const [loading, setLoading] = useState(false)
//   const [options, setOptions] = useState({})
//   const [year, setYear] = useState("2021")
//   const [labels,setLabels] = useState(['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December','dasd','dasda','reg','sad','bxvc','jytnt']);

//   // function handleChange(event) {
//   //   setYear(event.target.value)
//   // }
//   // function handleSubmit() {
//   //   setLoading(true)
//   // }

//   useEffect (() => {
//     let employeePassBooking = {};
//     let monthlist = [1,2,3,5,3,5,7,10,6,3,8,14,1,1,1,1,11,1,1,1,11,1,1,1,1,11,1,1,1,1,1,1,11,1,1,1,1,1,1,1,1,1,11,1,1,1,1,1,1,1,1,1,1,1,1,11,1,1,1,1,1,1,1];
//     axios.get(url).then(response => {
//       response.data.forEach(successfulloan => {
//         // if(successfulloan.year in loanlist){
//         //   loanlist[successfulloan.year][parseInt(successfulloan.month)-1] += 1;
//         // }else{
//         //   loanlist[successfulloan.year] = [0,0,0,0,0,0,0,0,0,0,0,0];
//         //   loanlist[successfulloan.year][parseInt(successfulloan.month)-1] += 1;
//         // }
//         if(!(successfulloan.staffid in employeePassBooking)){
//           employeePassBooking[successfulloan.staffid] = {}
//         }
//         if(successfulloan.year in employeePassBooking[successfulloan.staffid]){
//           employeePassBooking[successfulloan.staffid][successfulloan.year][parseInt(successfulloan.month)-1] += 1;
//         } else{
//           employeePassBooking[successfulloan.staffid][successfulloan.year] = [0,0,0,0,0,0,0,0,0,0,0,0];
//           employeePassBooking[successfulloan.staffid][successfulloan.year][parseInt(successfulloan.month)-1] += 1;
//         }
//         console.log(employeePassBooking)
//         // employeepassbooking = {1: {2022: [0,0,0....]} }
//       })
//       setChartData({
//         labels: labels,
//         datasets:[
//           {
//             label:"No of loans per month in " + year,
//             data: [1,2,3,5,3,5,7,10,6,3,8,14,1,1,1,1,11,1,1,1,11,1,1,1,1,11,1,1,1,1,1,1,11,1,1,1,1,1,1,1,1,1,11,1,1,1,1,1,1,1,1,1,1,1,1,11,1,1,1,1,1,1,1],
//             backgroundColor: [
//               'rgba(255, 99, 132, 0.5)',
//             ],
//             borderColor: [
//               'rgba(255, 99, 132, 1)'
//             ]
//           }
//           // {
//           //   label:"No of borrowers per month in " + year,
//           //   data: [2, 3, 4, 6, 5, 5, 6, 3, 4, 7, 8, 3],
//           //   backgroundColor: [
//           //     'rgba(54, 162, 235, 0.5)',
//           //   ],
//           //   borderColor: [
//           //     'rgba(54, 162, 235, 1)',
//           //   ]
//           // }
//         ]
//       })
//       setOptions({
//         responsive: true,
//         maintainAspectRatio: false,
//         plugins: {
//           legend: {
//             position: 'top',
//           },
//           title: {
//             display: true,
//             text: 'Monthly chart in ' + year,
//           },
//           zoom: {
//             pan:{
//               enabled: true,
//               mode: "x"
//             }
//           }
//         }
//       })
//       setLoading(true)
//   })
//   },[])
  
//   if (loading)
//   return (
//     <div style={{"height": "700px", "width":"700px"}}>
//       {/* <input name="yearinput" value= {year} onChange={handleChange}/>
//       <input type = "submit" onClick={handleSubmit}/> */}
      
//       <Bar data={chartData} options = {options}/>
//     </div>
    
    
    
//   )


// }