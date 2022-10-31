import React, { useState, useEffect } from "react";
import EmailTemplateForm from "../../components/emailtemplates/emailTemplateForm";
import axios from "axios";
import { Link } from "react-router-dom";
import EmailTemplateRow from "./emailTemplateRow";

const backendDomain = process.env.REACT_APP_backendDomain;
function EmailTemplatePage() {
    useEffect(() => {
        getEmailTemplates();
    }, []);

    const [emailTemplates, setEmailTemplates] = useState([]);
    const getEmailTemplates = () => {
        axios.get(`${backendDomain}/api/v1/emailtemplates`).then((res) => {
            setEmailTemplates(res.data);
        });
    };

    const deleteEmailTemplate = (emailTemplateId) => {
        axios.delete(`${backendDomain}/api/v1/emailtemplates/${emailTemplateId}`).then((res)=>{
            alert("Email template successfully deleted");
            getEmailTemplates();
        }) 

    }


    return (
        <div class="container rounded content">
            <div class ="card"style={{ width: '25rem', height: '50vh'}}>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <h1 class ="main-header">Email templates</h1>
                {emailTemplates.map(
                    template =>{
                        return <EmailTemplateRow template = {template} key = {template.emailTemplateId} deleteFunction={deleteEmailTemplate}/>
                    }
                )}
                <button className="btn btn-primary btn-sm">
                    <Link to = "/react/emailtemplates/create" style = {{color:"white"}}>
                        Create new template
                    </Link>
                </button>
            </div>
                
        </div>
    );
}

export default EmailTemplatePage;
