import React, { useState } from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
import axios from "axios";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";

export default function CreateLoanPass() {
  const backendDomain = process.env.REACT_APP_backendDomain;
  const navigate = useNavigate();
  const [attractionId, setAttractionId] = useState("");
  const [passNumber, setPassNumber] = useState("");
  const [description, setDescription] = useState("");

  const [checkbox, setCheckbox] = useState(false);

  const { setAuth, auth } = useAuth();
  console.log(auth.id, "AUTH ID :D");
  const postData = () => {
    const postRequest =
      "{attractioId: " +
      attractionId +
      ",\n passNumber: " +
      passNumber +
      ",\n description: " +
      description +
      "}";
    alert(
      "sent a post request:\n" +
        postRequest +
        `\nto ${backendDomain}/api/v1/loanpass`
    );

    axios
      .post(`${backendDomain}/api/v1/loanpass`, {
        attractionId,
        passNumber,
        description,
      })
      .then(() => {
        alert("success! going to read page");
        navigate("/react/read");
      })
      .catch((err) => {
        alert("error in creation! staying on this page." + err);
      });
  };
  return (
    <div class="container rounded content" style={{width: "85%",height: "70vh",maxWidth: "500px",minWidth: "200px",}}>
      <h2 class="main-header">
        Create Loanpass
      </h2>
      <div class="card" style={{ width: "85%",maxWidth: "250px", minWidth: "100px",}}>
        <Form className="create-form">
          <Form.Field>
            <label>Attraction Id</label>
            <input
              placeholder="attractionId"
              onChange={(e) => setAttractionId(e.target.value)}
            />
          </Form.Field>
          <Form.Field>
            <label>Pass Number</label>
            <input
              placeholder="PassNumber"
              onChange={(e) => setPassNumber(e.target.value)}
            />
          </Form.Field>
          <Button onClick={postData} type="submit">
            Submit
          </Button>
        </Form>
      </div>
      
    </div>
  );
}
