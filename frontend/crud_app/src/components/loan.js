import React, { useState } from 'react';
import Select from 'react-select'
import DatePicker from 'react-date-picker';
import { addDays } from 'date-fns';
import axios from 'axios';

const backendDomain = process.env.REACT_APP_backendDomain;

const options = [
    { value: 'Zoo', label: 'Zoo' },
    { value: 'Gardens by the Bay', label: 'Gardens by the Bay' },
    { value: 'Duck Tours', label: 'Duck Tours' }
]

const options1 = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
]

const customStyles = {
    option: provided => ({
      ...provided,
      color: 'black'
    }),
    control: provided => ({
      ...provided,
      color: 'black'
    }),
    singleValue: provided => ({
      ...provided,
      color: 'black'
    })
}




  

export default function LoanApplication() {
    // state for datepicker
    const [value, onChange] = useState(addDays(new Date(), 1));

    // state for attraction
    const [attraction, setAttraction] = useState(options[0]);
    // state for number of passes

    const [passes, setPasses] = useState(options1[0]);

    const SelectAttractionComponent = () => (
    <Select styles={customStyles} options={options} defaultValue={options[0]} value={attraction} onChange={setAttraction} />
  )

  const SelectNoPassesComponent = () => (
    <Select styles={customStyles} options={options1} defaultValue={options1[0]} value={passes} onChange={setPasses} />
  )

  const createLoanApplication = () => {
    const day = value.getDate();
    const month = value.getMonth() + 1;
    const year = value.getFullYear();

    alert("Sent request to: " + `${backendDomain}/api/v1/loanpass/\n` + "Attraction: " + attraction.value + " Passes: " + passes.value + " Date: " + day + "/" + month + "/" + year);
    axios.put(`${backendDomain}/api/v1/loanpass/`, 
        null,   
    ).then(() => {
        alert("Successfully created loan application!");
    }).catch((err) => {
        alert("error in update! staying on this page." + err);
    });

}

  return (
    <div>
        <h1>Place:</h1>
        <SelectAttractionComponent />
        {attraction.value}
        <h1>No. of Passes:</h1>
        <SelectNoPassesComponent />
        {passes.value}
        <h1>Date:</h1>
        
        {/* datepicker */}
        <div>
            {value.getDate()}
            {value.getMonth() + 1}
            {value.getFullYear()}
            <DatePicker 
            onChange={onChange} 
            value={value} 
            minDate={addDays(new Date(), 1)} 
            maxDate={addDays(new Date(), 8*7)}
            clearIcon={null}
            format="dd/MM/yyyy"
            />
            
        </div>
        {/* end of datepicker */}

        <button id="submitbtn" onClick={createLoanApplication}>Submit</button>
        

    </div>

    
  );
}