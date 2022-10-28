import React, { useState , useEffect } from 'react';
import Select from 'react-select'
import DatePicker from 'react-date-picker';
import { addDays } from 'date-fns';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import styled from 'styled-components';

const backendDomain = process.env.REACT_APP_backendDomain;

const Button = styled.button`
  background-color: black;
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 10px;
  margin: 10px 0px;
  cursor: pointer;
`;
let options = [];

// get options from backend axios call
axios.get(`${backendDomain}/api/v1/attractions`)
    .then(res => {
        options = [];

        console.log(res.data);
        res.data.forEach(attraction => {
            options.push({ value: attraction.attractionID, label: attraction.name });
        }
        )

        console.log(options);
    });

const options1 = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
]

const userOptions = [
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

    // state for user
    const [user, setUser] = useState();

    // state for datepicker
    const [value, onChange] = useState(addDays(new Date(), 1));

    // state for attraction
    const [attraction, setAttraction] = useState();
    // state for number of passes

    const [passes, setPasses] = useState();

    const onAttractionChange = (e) => {
      setAttraction(e);
  }

  const onPassesChange = (e) => {
    setPasses(e);
}

    const SelectUserComponent = () => (
        <Select styles={customStyles} options={userOptions} defaultValue={[userOptions[0]]} value={user} onChange={(d) => setUser(d)} />
      )

    const SelectAttractionComponent = () => (
    <Select placeholder="" styles={customStyles} options={options} defaultValue={[]} value={attraction} onChange={(d) => onAttractionChange(d)} />
  )

  const SelectNoPassesComponent = () => (
    <Select styles={customStyles} options={options1} defaultValue={[]} value={passes} onChange={(d) => onPassesChange(d)} />
  )

  const createLoanApplication = () => {
    const day = value.getDate();
    const month = value.getMonth() + 1;
    const year = value.getFullYear();
    let attractionId = 1;
    

    let userId = "1";
    try {
        userId = user.value;
    } catch (error) {
        console.log(error);
    }

    try {
        attractionId = attraction.value;
    } catch (error) {
        console.log(error);
    }

    const date = `${attractionId},${day},${month},${year}`;

    let newwaitingList = `${userId}`

    if (passes.value == 2) {
        newwaitingList += `,${userId}`
    }

    alert("User "+ userId + " sent request to: " + `${backendDomain}/api/v1/loanpass/\n` + "Attraction: " + attraction.value + " Passes: " + passes.value + " Date: " + day + "/" + month + "/" + year);
    axios.post(`${backendDomain}/api/v1/bookingdate`, 
        {
          "date" : date,
          "waitingList" : newwaitingList
        }   
    ).then(() => {
        alert("Successfully created loan application!");
    }).catch((err) => {
        console.log(err);
        if (err.response.status === 500) {

          axios.get(`${backendDomain}/api/v1/bookingdate/${date}`)
                .then((res) => {
                  
                    const waitingList = res.data.waitingList;
                    // alert(`already booked! waiting list: ${waitingList}`);

                    const waitingListsplitted = waitingList.split(",");

                    if (waitingListsplitted.includes(userId)) {
                      alert("You are already in the waiting list!");
                      return;
                  }

                    // get all loanpasses
                    axios.get(`${backendDomain}/api/v1/loanpass/getbyattraction/${attractionId}`)
                        .then((res) => {
                            var loanPasses = 0;
                            res.data.forEach(loanPass => {
                              loanPasses++;
                            });
                            console.log(loanPasses);
                            

                            if (waitingListsplitted.length + parseInt(passes.value) > loanPasses) {
                              let confirmMessage = "You are not in the waiting list, but there are not enough loan passes available. Do you want to be added to the waiting list?";
                              console.log("too little passes!")
                              if (passes.value == 2 && waitingListsplitted.length == loanPasses - 1) {
                                confirmMessage = "There is only 1 loan pass to be booked, do you want to book it and be put on the waiting list for the next one?";
                              }

                              const yesWaiting = window.confirm(confirmMessage);
                              if (yesWaiting) {
                                axios.put(`${backendDomain}/api/v1/bookingdate/${date}?waitingList=${waitingList + "," + newwaitingList}`,
                                          null,
                                      ).then(() => {
                                          alert("Successfully added to waiting list!");
                                          alert(waitingList + "," + newwaitingList);
                                      }).catch((err) => {
                                          alert("error in update! staying on this page." + err);
                                          console.log(err);
                                      });
                              }

                            } else {
                              axios.put(`${backendDomain}/api/v1/bookingdate/${date}?waitingList=${waitingList + "," + newwaitingList}`,
                                          null,
                                      ).then(() => {
                                          alert("Successfully added to waiting list!");
                                          alert(waitingList + "," + newwaitingList);
                                      }).catch((err) => {
                                          alert("error in update! staying on this page." + err);
                                          console.log(err);
                                      });
                            }

                        })
                            

                    
                    
                      
                    

                    
                  }).catch((err) => {
                    console.log(err);
                  });
                
            
    }
     else {
        alert("error:" + err);
    }
  });

  }

  useEffect(() => {
    // Update the document title using the browser API
    console.log("useEffect only once!");
    
  }, [""]);

  return (
    <div class="container rounded content">
      <div class="card"style={{ width: '30rem', height: '50vh'}}>
        <h1 className="main-header">Loan Application</h1>

          <h2 className="main-header">UserId:</h2>
          <SelectUserComponent />

          <h2 className="main-header">No. of Passes:</h2>
          <SelectNoPassesComponent />

          <h2 className="main-header">Place:</h2>
          <SelectAttractionComponent />

          <h2 className="main-header">Date:</h2>
          
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

          <Button id="submitbtn" style= {{}}onClick={createLoanApplication}>Submit</Button>
      </div>
    
    </div>

    
  );
}