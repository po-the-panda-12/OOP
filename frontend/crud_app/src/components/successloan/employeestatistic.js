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

// {emp1: {2022: []} }
// 

const backendDomain = process.env.REACT_APP_backendDomain;
const url = backendDomain + "/api/v1/successloan";

export default function EmployeeStatistics() {
    const [chartData,setChartData] = useState({})
    const [loading, setLoading] = useState(false)
    const [options, setOptions] = useState({})

    const [employeeId, setEmployeeId] = useState("1")
    const [chartMode, setChartMode] = useState("Monthly")
    const [chartModeList, setChartModeList]= useState(["Monthly", "Bi-Annually", "Annually"])
    const [labels,setLabels] = useState([]);
    const [data, setData] = useState([])

    function handleCMSubmit(event) {
    setChartMode(event.target.value)
    setChartData(chartData)
    }

    function handleEmpSubmit(event) {
    setEmployeeId(event.target.value)
    setChartData(chartData)
    }

    useEffect (() => {
    let loanlist = {};
    let curlabel = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let month = [];
    let monthlabel = [];
    let annual = [];
    let annuallabel = [];
    let biann = [];
    let biannlabel = [];
    axios.get(url).then(response => {
        response.data.forEach(successfulloan => {
            if(successfulloan.staffId == employeeId){
                if(successfulloan.year in loanlist){
                    loanlist[successfulloan.year][parseInt(successfulloan.month)-1] += 1;
                }else{
                    loanlist[successfulloan.year] = [0,0,0,0,0,0,0,0,0,0,0,0];
                    loanlist[successfulloan.year][parseInt(successfulloan.month)-1] += 1;
                }
            }
        })
        // ASSUME THAT LOANLIST OBJECT WILL BE SORTED FROM 2020 - 2022

        for (var loan in loanlist){
            annuallabel.push(loan);
            annual.push(loanlist[loan].reduce((partialSum, a) => partialSum + a, 0));
            biannlabel.push(loan + " 1st");
            biannlabel.push(loan+ " 2nd");
            biann.push(loanlist[loan].slice(0,6).reduce((partialSum, a) => partialSum + a, 0));
            biann.push(loanlist[loan].slice(6,12).reduce((partialSum, a) => partialSum + a, 0));
            for (let i = 0; i< 12;i++){
                monthlabel.push(curlabel[i] + loan);
            }
            month = loanlist[loan];
        }


        if(chartMode == "Monthly"){
            setData(month)
            setLabels(monthlabel)
        } else if(chartMode == "Bi-Annually"){
            setData(biann)
            setLabels(biannlabel)
        } else if(chartMode == "Annually"){
            setData(annuallabel)
            setLabels(Object.keys(loanlist))

        }

        setChartData({
        labels: labels,
        datasets:[
            {
            label:"employee " + employeeId + "'s pass booking records",
            data: data,
            backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)'
            ]
            }
        ]
        })
        setOptions({
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
            position: 'top',
            },
            title: {
            display: true,
            text: 'Employee bookings ' + chartMode,
            }
        }
        })
        setLoading(true)
    })
    },[employeeId, chartMode])

    if (loading)
    return (
    <div style={{"height": "700px", "width":"700px"}}>
        Employee ID: <input name="EmployeeID" value = {employeeId} onChange={handleEmpSubmit}/>
        Select Chart Type:
        <select onChange={handleCMSubmit}>
        {chartModeList.map(res => (
          <option value={res}>
            {res}
          </option>
        ))}
      </select>
        <Bar data={chartData} options = {options}/>
    </div>



    )


}