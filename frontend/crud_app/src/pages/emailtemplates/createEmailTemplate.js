import React from "react";
import EmailTemplateForm from "../../components/emailtemplates/emailTemplateForm";
import { Link } from "react-router-dom";
function CreateEmailTemplate() {
    return (
        <div className="container rounded content">
            <div className="card" style={{ width: "60rem" }}>
                <h2 className="main-header">Create template</h2>
                <EmailTemplateForm template={null} />
                <button className="btn btn-secondary btn-sm">
                    <Link to="/react/emailtemplates" style={{ color: "white" }}>
                        Cancel
                    </Link>
                </button>
            </div>
        </div>
    );
}

export default CreateEmailTemplate;
