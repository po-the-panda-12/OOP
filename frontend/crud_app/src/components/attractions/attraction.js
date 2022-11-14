import React, { useState, useEffect } from "react";
import Select from "react-select";
import DatePicker from "react-date-picker";
import { addDays } from "date-fns";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";

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

const options1 = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
];

// should be based on user
let userOptions = [];

const customStyles = {
  option: (provided) => ({
    ...provided,
    color: "black",
  }),
  control: (provided) => ({
    ...provided,
    color: "black",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "black",
  }),
};

export default function Attraction() {
  const navigate = useNavigate();
  const { setAuth, auth } = useAuth();
  console.log(auth.id, "AUTH ID :D");

  useEffect(() => {
    Swal.fire({
      title: "Loading information from database...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    // get options from backend axios call
    axios.get(`${backendDomain}/api/v1/attractions`).then((res) => {
      options = [];

      console.log(res.data);
      res.data.forEach((attraction) => {
        options.push({
          value: attraction.attractionID,
          label: attraction.name,
        });
      });

      console.log(options);
      setPasses(1);
      Swal.close();
    });

    // Update the document title using the browser API
    console.log("useEffect only once!");
    console.log(localStorage.getItem("auth"));

    let userlogin = "2"; // JSON.parse(localStorage.getItem("auth"))["username"]
    userOptions = [{ value: userlogin, label: userlogin }];

    console.log(userOptions);
    onPassesChange();
    setPasses(1);
    setUser({ value: userlogin, label: userlogin });
  }, [""]);
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
  };

  const onPassesChange = (e) => {
    setPasses(e);
  };

  const SelectUserComponent = () => (
    <Select
      styles={customStyles}
      options={userOptions}
      defaultValue={[userOptions[0]]}
      value={user}
      onChange={(d) => setUser(d)}
    />
  );

  const SelectAttractionComponent = () => (
    <Select
      placeholder=""
      styles={customStyles}
      options={options}
      defaultValue={[]}
      value={attraction}
      onChange={(d) => onAttractionChange(d)}
    />
  );

  const SelectNoPassesComponent = () => (
    <Select
      styles={customStyles}
      options={options1}
      defaultValue={options1[0]}
      value={passes}
      onChange={(d) => onPassesChange(d)}
    />
  );

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

    // get successloan by userid, month and year
    axios
      .get(
        `${backendDomain}/api/v1/successloan/staff/${userId}/month/${month}/year/${year}`
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.length > 2) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "You have already applied for 2 loans this month!",
          });
        } else {
          let newwaitingList = `${userId}`;

          if (passes.value == 2) {
            newwaitingList += `,${userId}`;
          }

          alert(
            "User " +
              userId +
              " sent request to: " +
              `${backendDomain}/api/v1/loanpass/\n` +
              "Attraction: " +
              attraction.value +
              " Passes: " +
              passes.value +
              " Date: " +
              day +
              "/" +
              month +
              "/" +
              year
          );

          Swal.fire({
            title: "Loading information from database...",
            allowOutsideClick: false,
            didOpen: () => {
              Swal.showLoading();
            },
          });

          axios
            .post(`${backendDomain}/api/v1/bookingdate/save`, {
              date: date,
              waitingList: newwaitingList,
            })
            .then(() => {
              axios
                .post(`${backendDomain}/api/v1/successloan`, {
                  staffId: userId,
                  attractionId: attraction.value,
                  month: month,
                  year: year,
                  day: day,
                })
                .then((res) => {
                  Swal.close();
                  alert("Successfully created loan application!");
                  navigate("/react/viewbooking");
                });
            })
            .catch((err) => {
              Swal.close();
              console.log(err);
              if (err.response.status === 500) {
                Swal.fire({
                  title: "Loading information from database...",
                  allowOutsideClick: false,
                  didOpen: () => {
                    Swal.showLoading();
                  },
                });
                axios
                  .get(`${backendDomain}/api/v1/bookingdate/${date}`)
                  .then((res) => {
                    Swal.close();
                    const waitingList = res.data.waitingList;
                    // alert(`already booked! waiting list: ${waitingList}`);

                    const waitingListsplitted = waitingList.split(",");

                    if (waitingListsplitted.includes(userId)) {
                      alert("You are already in the waiting list!");
                      return;
                    }

                    Swal.fire({
                      title: "Loading information from database...",
                      allowOutsideClick: false,
                      didOpen: () => {
                        Swal.showLoading();
                      },
                    });

                    // get all loanpasses
                    axios
                      .get(
                        `${backendDomain}/api/v1/loanpass/getbyattraction/${attractionId}`
                      )
                      .then((res) => {
                        Swal.close();
                        var loanPasses = 0;
                        res.data.forEach((loanPass) => {
                          loanPasses++;
                        });
                        console.log(loanPasses);

                        if (
                          waitingListsplitted.length + parseInt(passes.value) >
                          loanPasses
                        ) {
                          let confirmMessage =
                            "You are not in the waiting list, but there are not enough loan passes available. Do you want to be added to the waiting list?";
                          console.log("too little passes!");
                          if (
                            passes.value == 2 &&
                            waitingListsplitted.length == loanPasses - 1
                          ) {
                            confirmMessage =
                              "There is only 1 loan pass to be booked, do you want to book it and be put on the waiting list for the next one?";
                          }

                          const yesWaiting = window.confirm(confirmMessage);
                          if (yesWaiting) {
                            Swal.fire({
                              title: "Loading information from database...",
                              allowOutsideClick: false,
                              didOpen: () => {
                                Swal.showLoading();
                              },
                            });

                            axios
                              .put(
                                `${backendDomain}/api/v1/bookingdate/${date}?waitingList=${
                                  waitingList + "," + newwaitingList
                                }`,
                                null
                              )
                              .then(() => {
                                Swal.close();
                                if (
                                  confirmMessage.includes(
                                    "There is only 1 loan pass to be booked"
                                  )
                                ) {
                                  axios
                                    .post(
                                      `${backendDomain}/api/v1/successloan`,
                                      {
                                        staffId: userId,
                                        attractionId: attraction.value,
                                        month: month,
                                        year: year,
                                        day: day,
                                      }
                                    )
                                    .then((res) => {
                                      Swal.close();
                                      alert(
                                        "Successfully created loan application!"
                                      );
                                      navigate("/react/viewbooking");
                                    });
                                }
                                alert(waitingList + "," + newwaitingList);
                              })
                              .catch((err) => {
                                Swal.close();
                                alert(
                                  "error in update! staying on this page." + err
                                );
                                console.log(err);
                              });
                          }
                        } else {
                          Swal.fire({
                            title: "Loading information from database...",
                            allowOutsideClick: false,
                            didOpen: () => {
                              Swal.showLoading();
                            },
                          });

                          axios
                            .put(
                              `${backendDomain}/api/v1/bookingdate/${date}?waitingList=${
                                waitingList + "," + newwaitingList
                              }`,
                              null
                            )
                            .then(() => {
                              Swal.close();
                              alert("Successfully added to waiting list!");
                              alert(waitingList + "," + newwaitingList);
                              navigate("/react/viewbooking");
                            })
                            .catch((err) => {
                              Swal.close();
                              alert(
                                "error in update! staying on this page." + err
                              );
                              console.log(err);
                            });
                        }
                      });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              } else {
                alert("error:" + err);
              }
            });
        }
      });
  };

  return (
    <div
      class="container rounded content"
      style={{ height: "100%", width: "80%" }}
    >
      <div
        class="card"
        style={{
          width: "85%",
          height: "70vh",
          maxWidth: "500px",
          minWidth: "200px",
        }}
      >
        <h2 className="main-header">Loan Application</h2>

        <h4 className="sub-header">UserId:</h4>
        <SelectUserComponent />

        <h4 className="sub-header">No. of Passes:</h4>
        <SelectNoPassesComponent />

        <h4 className="sub-header">Place:</h4>
        <SelectAttractionComponent />

        <h4 className="sub-header">Date:</h4>

        {/* datepicker */}
        <div>
          {value.getDate()}
          {value.getMonth() + 1}
          {value.getFullYear()}
          <DatePicker
            onChange={onChange}
            value={value}
            minDate={addDays(new Date(), 1)}
            maxDate={addDays(new Date(), 8 * 7)}
            clearIcon={null}
            format="dd/MM/yyyy"
          />
        </div>
        {/* end of datepicker */}

        <Button id="submitbtn" style={{}} onClick={createLoanApplication}>
          Submit
        </Button>
      </div>
    </div>
  );
}
