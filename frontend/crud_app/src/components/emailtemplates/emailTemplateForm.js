import { useEffect, useState } from "react";
import React from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const backendDomain = process.env.REACT_APP_backendDomain;

function EmailTemplateForm(props) {
    const [emailTemplateBody, setEmailTemplateBody] = useState("");
    const [emailTemplateName, setEmailTemplateName] = useState("");
    const navigate = useNavigate();
    const emailTags = [
        {
            label: "Borrower's Name",
            tag: "#BorrowerName#",
        },
        {
            label: "Attraction's Name",
            tag: "#AttractionName#",
        },
        {
            label: "Corp Pass Number",
            tag: "#CorpPassNo#",
        },
    ];

    useEffect(() => {
        if (props.template) {
            setEmailTemplateBody(props.template.emailTemplateBody);
            setEmailTemplateName(props.template.emailTemplateName);
        }
    }, []);

    const addTag = (selectedTag) => {
        // const cursorPosition = quill.getSelection().index;
        // quill.insertText(cursorPosition, selectedTag);
        // quill.setSelection(cursorPosition + selectedTag.length);
    };

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
                alert("Email template added");
                navigate("/react/emailtemplates");
            })
            .catch((err) => {
                alert("error in creation! staying on this page." + err);
            });
    };

    const updateData = () => {
        axios
            .put(
                `${backendDomain}/api/v1/emailtemplates/${props.template.emailTemplateId}`,
                {
                    emailTemplateName,
                    emailTemplateBody,
                }
            )
            .then(() => {
                alert("Email template edited!");
                navigate("/react/emailtemplates");
            })
            .catch((err) => {
                alert("error in updating! staying on this page." + err);
            });
    };

    // quill modules
    const modules = {
        toolbar: {
            container: "#toolbar",
            handlers: {
                addTag: addTag,
            },
        },
    };

    return (
        <div>
            <label>Email Template Name:</label>
            <input
                onChange={(e) => setEmailTemplateName(e.target.value)}
                value={emailTemplateName}
                className="form-control"
                type="text"
                placeholder="Enter template name"
            />
            <br></br>
            {/* custom 'toolbar */}
            <div className="text-editor" id="emailBodyEditor">
                <div id = "toolbar">
                    {emailTags.map((currTag) => {
                        return (
                            <button
                                className="btn btn-primary"
                                onClick={() => {
                                    addTag(currTag.tag);
                                }}
                            >
                                {currTag.label}
                            </button>
                        );
                    })}
                </div>

                <ReactQuill
                    theme="snow"
                    value={emailTemplateBody}
                    onChange={setEmailTemplateBody}
                    placeholder={"Enter some content"}
                    // modules={modules}
                />
            </div>
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
