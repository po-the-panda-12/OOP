import React, { useState, useEffect } from "react";
import { Button, Checkbox, Dropdown, Form } from "semantic-ui-react";
import axios from "axios";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";

const AttractionForm = (props) => {
    const backendDomain = process.env.REACT_APP_backendDomain;
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [passType, setPassType] = useState("Physical");
    const [replacementFee, setReplacementFee] = useState(1);
    const [emailTemplateID, setEmailTemplateID] = useState(1);
    const [totalPasses, setTotalPasses] = useState(1);
    const [status, setStatus] = useState("Active");

    const [emailTemplates, setEmailTemplates] = useState([]);

    const retrieveEmailTemplates = () => {
        axios.get(`${backendDomain}/api/v1/emailtemplates`).then((res) => {
            setEmailTemplates(res.data);
        });
    };

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
            emailTemplateID +
            ",\n totalPasses: " +
            totalPasses +
            ",\n status: Active" +
            status +
            "}";
        alert(
            "sent a post request:\n" +
                postRequest +
                `\nto ${backendDomain}/api/v1/attractions`
        );

        axios
            .post(`${backendDomain}/api/v1/attractions`, {
                // attractionId,
                name,
                description,
                passType,
                replacementFee,
                emailTemplateID,
                totalPasses,
                status,
            })
            .then(() => {
                alert("success! going to read page");
                navigate("/react/attractions");
            })
            .catch((err) => {
                alert("error in creation! staying on this page." + err);
            });
    };

    const updateData = () => {
        axios
            .put(
                `${backendDomain}/api/v1/attractions/${props.attraction.attractionID}`,
                {
                    name,
                    description,
                    passType,
                    replacementFee,
                    emailTemplateID,
                    totalPasses,
                    status,
                }
            )
            .then(() => {
                alert("Attraction edited!");
                navigate("/react/attractions");
            })
            .catch((err) => {
                alert("error in updating! staying on this page." + err);
            });
    };

    useEffect(() => {
        console.log(props.attraction)
        retrieveEmailTemplates();
        if(props.attraction){
            setName(props.attraction.name)
        }
    }, []);
    return (
        <div style={{ margin: "10px", padding: "10px" }}>
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
                    <select onChange={(e) => setPassType(e.target.value)}>
                        <option value="Physical">Physical</option>
                        <option value="E-Pass">E-Pass</option>
                        <option value="E-Pass">Both</option>
                    </select>
                </Form.Field>

                <Form.Field>
                    <label>Replacement Fee:</label>
                    <input
                        placeholder="Replacement Fee"
                        type="number"
                        onChange={(e) => setReplacementFee(e.target.value)}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Email Template:</label>
                    <select
                        onChange={(e) => setEmailTemplateID(e.target.value)}
                    >
                        {emailTemplates.map((emailTemplate) => {
                            return (
                                <option value={emailTemplate.emailTemplateId}>
                                    {emailTemplate.emailTemplateName}
                                </option>
                            );
                        })}
                    </select>
                </Form.Field>
                <Form.Field>
                    <label>Total Passes:</label>
                    <input
                        placeholder="Total Passes"
                        type="number"
                        min="0"
                        step="1"
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

                {props.attraction ? (
                    <>
                        <button
                            className="btn btn-primary"
                            onClick={updateData}
                        >
                            Update Attraction
                        </button>
                    </>
                ) : (
                    <>
                        <button className="btn btn-primary" onClick={postData}>
                            Submit Attraction
                        </button>
                    </>
                )}
            </Form>
        </div>
    );
};

export default AttractionForm;
