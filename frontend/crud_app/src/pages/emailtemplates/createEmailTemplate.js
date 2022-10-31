import React from "react";
import EmailTemplateForm from "../../components/emailtemplates/emailTemplateForm";
import { Link } from "react-router-dom";
function CreateEmailTemplate() {
    return (
        <div class="container rounded content">
            <div class="card"style={{ width: '25rem', height: '50vh'}}>
                <h2 class="main-header">Create template</h2>
                <EmailTemplateForm template={null} />
                <button class="btn btn-secondary btn-sm">
                    <Link to="/react/emailtemplates" style={{ color: "white" }}>
                        Cancel
                    </Link>
                </button>
            </div>
            
        </div>
    );
}

export default CreateEmailTemplate;
