import React, { useState } from 'react';
import Select from 'react-select'
import DatePicker from 'react-date-picker';
import { addDays } from 'date-fns';
import axios from 'axios';
import Calendar from 'moedim';
const backendDomain = process.env.REACT_APP_backendDomain;





  

export default function ViewBooking() {
    const [value, setValue] = useState(addDays(new Date(), 1));

    const [waitList, setWaitList] = useState("click on a date to view waitlist");

    const onDateChange = (date) => {
        setValue(date);
        setWaitList("loading...");
        console.log(date);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const myDate = `1,${day},${month},${year}`;

        axios.get(`${backendDomain}/api/v1/bookingdate/${myDate}`)
        .then((response) => {
            console.log(response.data);
            setWaitList(response.data.waitingList);
        }
        )
        .catch((error) => {
            setWaitList("no bookings");
        })
    }

    return (
        <div>
        <Calendar value={value} onChange={(d) => onDateChange(d)} />
        <h1>Waiting list:</h1>
        {waitList}
        </div>
    )
  
    
}