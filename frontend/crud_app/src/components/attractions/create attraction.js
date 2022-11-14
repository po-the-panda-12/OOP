import React, { useState, useEffect } from "react";
import { Button, Checkbox, Dropdown, Form } from "semantic-ui-react";
import axios from "axios";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";

export default function CreateAttractions() {
  const backendDomain = process.env.REACT_APP_backendDomain;
  const navigate = useNavigate();
  // const [attractionId, setAttractionId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [passType, setPassType] = useState("");
  const [replacementFee, setReplacementFee] = useState("");
  const [emailTemplate, setEmailTemplate] = useState("");
  const [totalPasses, setTotalPasses] = useState("");
  const [status, setStatus] = useState("");
  

  const [emailTemplates, setEmailTemplates] = useState([]);

  const [checkbox, setCheckbox] = useState(false);

  const { setAuth, auth } = useAuth();
  console.log(auth.id, "AUTH ID :D");
  const retrieveEmailTemplates = () => {
    axios.get(`${backendDomain}/api/v1/emailtemplates`).then((res) => {
        setEmailTemplates(res.data);
    });
};

useEffect(() => {
  retrieveEmailTemplates();
  console.log(emailTemplates)
}
, []);
  const postData = () => {
    const postRequest =
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
      ",\n status: " +
      status +
      "}";
    alert(
      "sent a post request:\n" +
        postRequest +
        `\nto ${backendDomain}/api/v1/attractions/save`
    );

    axios
      .post(`${backendDomain}/api/v1/attractions/save`, {
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
        alert("success! going to read page");
        navigate("/react/read");
      })
      .catch((err) => {
        alert("error in creation! staying on this page." + err);
      });
  };
  return (
    <div
      class="content"
      style={{
        width: "85%",
        height: "70vh",
        maxWidth: "500px",
        minWidth: "200px",
      }}
    >

      <br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br><br></br>
      
      <Form className="create-form">
        {/* <Form.Field>
          <label>attractionId</label>
          <input
            placeholder="attractionId"
            onChange={(e) => setAttractionId(e.target.value)}
          />
        </Form.Field> */}
        <Form.Field>
          <label>Name</label>
          <input
            placeholder="name"
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>description</label>
          <input
            placeholder="description"
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>passType</label>
          <input
            placeholder="Pass Type"
            onChange={(e) => setPassType(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>replacementFee</label>
          <input
            placeholder="replacementFee"
            onChange={(e) => setReplacementFee(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
            <label>Email Template:</label>
            <select
                value={emailTemplate}
                onChange={(e) => setEmailTemplate(e.target.value)}
            >
                {emailTemplates.map((emailTemplate) => {
                console.log(emailTemplate)
                    return <option value={emailTemplate.emailTemplateId}>{emailTemplate.emailTemplateName}</option>;
                })}

            </select>
        </Form.Field>
        <Form.Field>
          <label>totalPasses</label>
          <input
            placeholder="totalPasses"
            onChange={(e) => setTotalPasses(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>status</label>
          <input
            placeholder="status"
            onChange={(e) => setStatus(e.target.value)}
          />
        </Form.Field>
        <Button onClick={postData} type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}
