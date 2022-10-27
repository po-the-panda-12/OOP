import React, { useState, useEffect } from "react";
import EmailTemplateForm from "../components/emailTemplateForm";
import axios from "axios";

const backendDomain = process.env.REACT_APP_backendDomain;
function EmailTemplatePage() {
    useEffect(() => {
        getEmailTemplates();
    }, []);
    const [emailTemplates, setEmailTemplates] = useState([]);
    const getEmailTemplates = () => {
        axios.get(`${backendDomain}/api/v1/emailtemplates`).then((res) => {
            let templates = [];

            console.log(res.data);
            res.data.forEach((template) => {
                templates.push(template);
            });

            console.log("templates",templates);
            setEmailTemplates(templates);
        });
    };


    return (
        <div>
            <h1>Email templates</h1>
            <EmailTemplateForm />
            {/* {emailTemplates} */}
        </div>
    );
}

export default EmailTemplatePage;
