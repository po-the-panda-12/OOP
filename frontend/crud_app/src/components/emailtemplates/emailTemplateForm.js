import { useEffect, useState } from "react";
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

const backendDomain = process.env.REACT_APP_backendDomain;

function EmailTemplateForm(props) {
    const [emailTemplateBody, setEmailTemplateBody] = useState("");
    const [emailTemplateName, setEmailTemplateName] = useState("");

    useEffect(() => {
        console.log("template", props);
        if (props.template) {
            setEmailTemplateBody(props.template.emailTemplateBody);
            setEmailTemplateName(props.template.emailTemplateName);
        }
    }, []);

    const postData = () => {
        const postRequest =
            "{emailTemplateName: " +
            emailTemplateName +
            ",\n emailTemplateBody: " +
            emailTemplateBody +
            "}";
        alert(
            "sent a post request:\n" +
                postRequest +
                `\nto ${backendDomain}/api/v1/emailtemplate`
        );

        axios
            .post(`${backendDomain}/api/v1/emailtemplates`, {
                emailTemplateName,
                emailTemplateBody,
            })
            .then(() => {
                alert("success! going to read page");
                // navigate('/react/read');
            })
            .catch((err) => {
                alert("error in creation! staying on this page." + err);
            });
    };

    const updateData = () => {};

    return (
        <div>
            <h3>Email Template Form</h3>
            <label>Email Template Name:</label>
            <input
                onChange={(e) => setEmailTemplateName(e.target.value)}
                class="form-control"
                type="text"
                placeholder="Enter template name"
            />
            <br></br>

            <ReactQuill
                theme="snow"
                value={emailTemplateBody}
                onChange={setEmailTemplateBody}
            />
            {props.template ? (
                <>
                    <button className="btn btn-primary" onClick={updateData}>
                        Update Template
                    </button>
                </>
            ) : (
                <>
                    <button className="btn btn-primary" onClick={postData}>
                        Submit Template
                    </button>
                </>
            )}
        </div>
    );
}

export default EmailTemplateForm;
