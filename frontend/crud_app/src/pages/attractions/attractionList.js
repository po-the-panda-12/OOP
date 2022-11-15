import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";

import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
const backendDomain = process.env.REACT_APP_backendDomain;
function AttractionList() {
    useEffect(() => {
        getAttractions();
        getEmailTemplates();
    }, []);
    const [attractions, setAttractions] = useState([]);
    const [emailTemplates, setEmailTemplates] = useState([]);

    const getEmailTemplates = async () => {
        await axios.get(`${backendDomain}/api/v1/emailtemplates`).then((res) => {
            setEmailTemplates(res.data);
        });
    };

    const getAttractions = async () => {
        await axios.get(`${backendDomain}/api/v1/attractions`).then((res) => {
            setAttractions(res.data);
        });
    };
    const deleteAttraction = (attractionId) => {
        axios
            .delete(`${backendDomain}/api/v1/attractions/${attractionId}`)
            .then((res) => {
                alert("Attraction successfully deleted");
                getAttractions();
            });
    };
    return (
        <div class="container rounded content">
            <div class="card" style={{ width: "60rem", height: "70vh" }}>
                <div>
                    <h1 class="main-header">Attraction List</h1>
                    <button className="btn btn-primary btn-sm">
                        <Link
                            to="/react/attractions/create"
                            style={{ color: "white" }}
                        >
                            Create new attraction
                        </Link>
                    </button>
                    <TableContainer component={Paper} elevation={3}>
                        <Table
                            sx={{ minWidth: 640, "& td": { border: 0 } }}
                            aria-label="simple table"
                        >
                            <TableHead>
                                <TableRow>
                                    <TableCell>Attraction ID</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Description</TableCell>
                                    <TableCell>PassType</TableCell>
                                    <TableCell>Replacement Fee</TableCell>
                                    <TableCell>Email Template</TableCell>
                                    <TableCell>Total Passes</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell align="center"></TableCell>
                                    <TableCell align="center"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { attractions.length > 0?attractions.map((attraction) => {
                                    return (
                                        <TableRow
                                            key={attraction.attractionID}
                                            sx={{
                                                "&:last-child td, &:last-child th":
                                                    { border: 0 },
                                            }}
                                        >
                                            <TableCell>
                                                {attraction.attractionID}
                                            </TableCell>
                                            <TableCell>
                                                {attraction.name}
                                            </TableCell>
                                            <TableCell>
                                                {attraction.description}
                                            </TableCell>
                                            <TableCell>
                                                {attraction.passType}{" "}
                                            </TableCell>
                                            <TableCell>
                                                ${attraction.replacementFee}
                                            </TableCell>
                                            <TableCell>
                                                {attraction.emailTemplateID}
                                                {/* {
                                                    emailTemplates.length > 0
                                                        ? 
                                                        emailTemplates.filter(
                                                              (template) =>
                                                                  template.emailTemplateId ==
                                                                  attraction.emailTemplateID
                                                          )[0].emailTemplateName
                                                        : "No templates"
                                                } */}
                                            </TableCell>
                                            <TableCell>
                                                {attraction.totalPasses}
                                            </TableCell>
                                            <TableCell>
                                                {attraction.status}
                                            </TableCell>
                                            <TableCell align="center">
                                                <IconButton
                                                    aria-label="delete"
                                                    style={{ color: "#5289B5" }}
                                                    onClick={() =>
                                                        deleteAttraction(
                                                            attraction.attractionID
                                                        )
                                                    }
                                                >
                                                    <DeleteOutlinedIcon />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell align="center">
                                                <IconButton
                                                    aria-label="edit"
                                                    style={{ color: "#5289B5" }}
                                                    href={`/react/attractions/${attraction.attractionID}`}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                }): <>None</>
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </div>
    );
}

export default AttractionList;
