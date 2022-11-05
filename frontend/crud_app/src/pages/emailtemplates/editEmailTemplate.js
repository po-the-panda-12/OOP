import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import EmailTemplateForm from "../../components/emailtemplates/emailTemplateForm";
import axios from "axios";
function EditEmailTemplate() {
    const backendDomain = process.env.REACT_APP_backendDomain;
    const { emailTemplateId } = useParams();
    const [emailTemplate, setEmailTemplate] = useState(null);
    const getCurrentEmailTemplate = async () => {
        await axios
            .get(
                `${backendDomain}/api/v1/emailtemplates/get/${emailTemplateId}`
            )
            .then((res) => {
                console.log(res.data);
                setEmailTemplate(res.data);
            });
    };
    useEffect(() => {
        const callAsyncFunctions = async () => {
            await getCurrentEmailTemplate();
        };
        callAsyncFunctions().catch(console.error);
    }, []);
    return (
        <div class="container rounded content">
            <div class="card" style={{ width: "60rem" }}>
                <h2>Edit template</h2>
                {emailTemplate ? (
                    <>
                        <EmailTemplateForm template={emailTemplate} />
                        <button className="btn btn-secondary">
                            <Link
                                to="/react/emailtemplates"
                                style={{ color: "white" }}
                            >
                                Cancel
                            </Link>
                        </button>
                    </>
                ) : (
                    <>
                        <h4>Loading template</h4>
                    </>
                )}
            </div>
        </div>
    );
}

export default EditEmailTemplate;
