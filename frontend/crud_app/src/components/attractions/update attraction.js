import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";

import axios from "axios";
import useAuth from "../../hooks/useAuth";

export default function Update() {
  const { setAuth, auth } = useAuth();
  console.log(auth.id, "AUTH ID :D");
  const backendDomain = process.env.REACT_APP_backendDomain;
  const navigate = useNavigate();

  const [attractionId, setAttractionId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [passType, setPassType] = useState("");
  const [replacementFee, setReplacementFee] = useState("");
  const [emailTemplate, setEmailTemplate] = useState("");
  const [totalPasses, setTotalPasses] = useState("");
  const [status, setStatus] = useState("");


  useEffect(() => {
    setAttractionId(localStorage.getItem("attractionId"));
    setName(localStorage.getItem("name"));
    setDescription(localStorage.getItem("description"));
    setPassType(localStorage.getItem("passType"));
    setReplacementFee(localStorage.getItem("replacementFee"));
    setEmailTemplate(localStorage.getItem("emailTemplate"));
    setTotalPasses(localStorage.getItem("totalPasses"));
    setStatus(localStorage.getItem("status"));
    
  }, []);

  const updateAPIData = () => {
    const putRequest =
      "{name: " +
      name +
      ",\n description: " +
      description +
      ",\n passType: " +
      passType +
      ",\n replacementFee: " +
      replacementFee +
      ",\n emailTemplate: " +
      emailTemplate +
      ",\n totalPasses: " +
      totalPasses +
      ",\n status: Active" +
      status +
      "}";

      alert(
        "sent a post request:\n" +
          putRequest +
          `\nto ${backendDomain}/api/v1/attractions/save`
      );
  
      axios
        .put(`${backendDomain}/api/v1/attractions/save`, {
          // attractionId,
          name,
          description,
          passType,
          replacementFee,
          emailTemplate,
          totalPasses,
          status
        })
        .then(() => {
          alert("success! going to edjt page");
          navigate("/react/read");
        })
        .catch((err) => {
          alert("error in updating! staying on this page." + err);
        });
    };


  return (
    <div
      style={{
        width: "85%",
        height: "70vh",
        maxWidth: "500px",
        minWidth: "200px",
      }}
    >
      <h1>Update attraction</h1>
      <Form className="create-form">
      <Form.Field>
          <label>Name:</label>
          <input
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Description:</label>
          <input
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
        <label>Pass Type:</label>
            <select
                value={passType}
                onChange={(e) => setPassType(e.target.value)}
            >
                <option value="Physical">Physical</option>
                <option value="E-Pass">E-Pass</option>
                <option value="E-Pass">Both</option>
            </select>
        </Form.Field>
        
        <Form.Field>
          <label>Replacement Fee:</label>
          <input
            placeholder="Replacement Fee"
            onChange={(e) => setReplacementFee(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
            <label>Email Template:</label>
            <select
                value={emailTemplate}
                onChange={(e) => setEmailTemplate(e.target.value)}
            >
                {/* {emailTemplates.map((emailTemplate) => {
                console.log(emailTemplate)
                    return <option value={emailTemplate.emailTemplateName}>{emailTemplate.emailTemplateName}</option>;
                })} */}

            </select>
        </Form.Field>
        <Form.Field>
          <label>Total Passes:</label>
          <input
            placeholder="Total Passes"
            onChange={(e) => setTotalPasses(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
        <label>Status:</label>
            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            >
                <option value="Active">Active</option>
                <option value="Non-active">Non-active</option>
            </select>
        </Form.Field>
        <Button type="submit" onClick={updateAPIData}>
          Update
        </Button>
      </Form>
    </div>
  );
}
