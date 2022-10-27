import React, { useState, useEffect } from "react";
import EmailTemplateForm from "../../components/emailtemplates/emailTemplateForm";
import axios from "axios";
import { Link } from "react-router-dom";

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
                templates.push(template.emailTemplateName);
            });

            console.log("templates",templates);
            setEmailTemplates(templates);
        });
    };


    return (
        <div>
            <h1>Email templates</h1>
            {emailTemplates.map(
                template =>{
                    return <h1>{template}</h1>
                }
            )}
            <button className="btn btn-primary">
                <Link to = "/react/emailtemplates/create" style = {{color:"white"}}>
                    Create new template
                </Link>
            </button>
            {/* {emailTemplates} */}
        </div>
    );
}

export default EmailTemplatePage;
