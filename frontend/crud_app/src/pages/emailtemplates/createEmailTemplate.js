import React from "react";
import EmailTemplateForm from "../../components/emailtemplates/emailTemplateForm";
import { Link } from "react-router-dom";
function CreateEmailTemplate() {
    return (
        <div>
            <h2>Create template</h2>
            <EmailTemplateForm template={null} />
            <button class="btn btn-secondary">
                <Link to="/react/emailtemplates" style={{ color: "white" }}>
                    Cancel
                </Link>
            </button>
        </div>
    );
}

export default CreateEmailTemplate;
