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

export default function EmployeeStatistics() {
    const [chartData,setChartData] = useState({})
    const [loading, setLoading] = useState(false)
    const [options, setOptions] = useState({})

    const [employeeId, setEmployeeId] = useState("1")
    const [chartMode, setChartMode] = useState("Monthly")
    const [labels,setLabels] = useState(['Jan 22', 'Feb 22', 'Mar 22', 'Apr 22', 'May 22', 'Jun 22', 'Jul 22', 'Aug 22', 'Sep 22', 'Oct 22', 'Nov 22', 'Dec 22']);
    const [data, setData] = useState([])
    const [year, setYear] = useState("2022");
    const [yearlist, setYearList] = useState([])

    function handleYearSubmit(event){
        setYear(event.target.value)
        setChartMode("Monthly")
        setChartData(chartData)
    }

    function handleCMSubmit(event) {
    setChartMode(event.target.value)
    setChartData(chartData)
    }

    function handleEmpSubmit(event) {
    setEmployeeId(event.target.value)
    setChartData(chartData)
    }

    useEffect (() => {
    let loanlist = {}; //this is for month
    let yearlist = {};
    let biannlist = {};
    let halfmonths = ["1","2","3","4","5","6"];
    axios.get(url).then(response => {
        response.data.forEach(successfulloan => {
            if(successfulloan.staffId == employeeId){
                // GETTING MONTHLIST 
                if(successfulloan.year in loanlist){
                    loanlist[successfulloan.year][parseInt(successfulloan.month)-1] += 1;
                }else{
                    loanlist[successfulloan.year] = [0,0,0,0,0,0,0,0,0,0,0,0];
                    loanlist[successfulloan.year][parseInt(successfulloan.month)-1] += 1;
                }
                // GETTING YEARLIST
                if(successfulloan.year in yearlist){
                    yearlist[successfulloan.year] += 1;
                } else{
                    yearlist[successfulloan.year] = 1;
                }
                // GETTING BIANNUAL
                if(successfulloan.year in biannlist){
                    if(halfmonths.includes(successfulloan.month)){
                        biannlist[successfulloan.year][0] += 1
                    }else{
                        biannlist[successfulloan.year][1] += 1
                    }
                }else{
                    biannlist[successfulloan.year] = [0,0]
                    if(halfmonths.includes(successfulloan.month)){
                        biannlist[successfulloan.year][0] += 1
                    }else{
                        biannlist[successfulloan.year][1] += 1
                    }
                }
                
            }
        })
        let templist = Object.keys(yearlist)
        templist.sort()
        setYearList(templist)
        if(chartMode == "Monthly"){
            setData(loanlist[year])
            let i = year.slice(2,4)
            setLabels(['Jan ' + i, 'Feb ' + i, 'Mar ' + i, 'Apr ' + i, 'May ' + i, 'Jun ' + i, 'Jul ' + i, 'Aug ' + i, 'Sep ' + i, 'Oct ' + i, 'Nov ' + i, 'Dec ' + i])
        } else if(chartMode == "Bi-Annually"){
            let i = Object.keys(biannlist);
            i.sort()
            let j = []
            let k = []
            for(var keys of i){
                j.push(keys + " 1st")
                j.push(keys + " 2nd")
                k.push(biannlist[keys][0])
                k.push(biannlist[keys][1])
            }
            setData(k)
            setLabels(j)
        } else if(chartMode == "Annually"){
            let i = Object.keys(yearlist);
            i.sort()
            let j = []
            let k = []
            for(var keys of i){
                j.push(keys)
                k.push(yearlist[keys])
            }
            setData(k)
            setLabels(j)
        }
    })
},[employeeId, chartMode, year])
        

useEffect (() => {
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
    },[data,labels])

    if (loading)
    return (
    <div style={{"height": "750px", "width":"850px"}}>
        Employee ID: <input name="EmployeeID" value = {employeeId} onChange={handleEmpSubmit}/>
        <br /><br />
        <button value = "Monthly" onClick={handleCMSubmit}>Monthly</button>{' :'}
        <select onChange={handleYearSubmit}>
        {yearlist.map(res => (
          <option value={res}>
            {res}
          </option>
        ))}
        </select>{' '}
        <button value = "Bi-Annually" onClick={handleCMSubmit}>Bi-Annually</button>{' '}
        <button value = "Annually" onClick={handleCMSubmit}>Annually</button>
        <Bar data={chartData} options = {options}/>
    </div>
    )


}