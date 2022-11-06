import React, { useState, useEffect } from "react";
import EmailTemplateForm from "../../components/emailtemplates/emailTemplateForm";
import axios from "axios";
import { Link } from "react-router-dom";
import EmailTemplateRow from "./emailTemplateRow";
import Table from "@mui/material/Table";
import { TableHeader } from "semantic-ui-react";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router";

import IconButton from "@mui/material/IconButton";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";

const backendDomain = process.env.REACT_APP_backendDomain;
function EmailTemplatePage() {
    useEffect(() => {
        getEmailTemplates();
    }, []);
    
    const navigate = useNavigate();

    const [emailTemplates, setEmailTemplates] = useState([]);
    const getEmailTemplates = () => {
        axios.get(`${backendDomain}/api/v1/emailtemplates`).then((res) => {
            console.log(res.data);
            setEmailTemplates(res.data);
        });
    };

    const deleteEmailTemplate = (emailTemplateId) => {
        axios
            .delete(`${backendDomain}/api/v1/emailtemplates/${emailTemplateId}`)
            .then((res) => {
                alert("Email template successfully deleted");
                getEmailTemplates();
            });
    };

    return (
        <div class="container rounded content">
            <div class="card" style={{ width: "60vw" }}>
                <h1 class="main-header">Email templates</h1>
                <button
                    className="btn btn-primary btn-sm"
                    style={{
                        margin: "10px auto",
                        width: "max-content",
                        padding: "10px",
                    }}
                >
                    <Link
                        to="/react/emailtemplates/create"
                        style={{ color: "white" }}
                    >
                        <h6>Create new template</h6>
                    </Link>
                </button>
                <TableContainer component={Paper} elavation={3}>
                    <Table
                        sx={{ minWidth: 640, "& td": { border: 0 } }}
                        aria-label="simple table"
                    >
                        <TableHead>
                            <TableCell>
                                <TableHeader align="left">
                                    Email Template Name
                                </TableHeader>
                            </TableCell>
                            <TableCell align="center"></TableCell>
                            <TableCell align="center"></TableCell>
                        </TableHead>
                        <TableBody>
                            {emailTemplates.length > 0 ? (
                                emailTemplates.map((template) => {
                                    return (
                                        <TableRow>
                                            <TableCell align="left">
                                                {template.emailTemplateName}
                                            </TableCell>
                                            <TableCell>
                                                <IconButton
                                                    aria-label="edit"
                                                    style={{ color: "#5289B5" }}
                                                    onClick={() => {
                                                        navigate("/react/emailtemplates/edit/" +
                                                        template.emailTemplateId)
                                                    }}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell align="center">
                                                <IconButton
                                                    aria-label="delete"
                                                    style={{ color: "#5289B5" }}
                                                    onClick={() =>
                                                        deleteEmailTemplate(
                                                            template.emailTemplateId
                                                        )
                                                    }
                                                >
                                                    <DeleteOutlinedIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })
                            ) : (
                                <h2>No templates found</h2>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
}

export default EmailTemplatePage;
