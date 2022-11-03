import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "../../api/axios";

const backendDomain = process.env.REACT_APP_backendDomain;
function AttractionList() {
    useEffect(() => {
        getAttractions();
    }, []);
    const [attractions, setAttractions] = useState([]);
    const getAttractions = () => {
        axios.get(`${backendDomain}/api/v1/attractions`).then((res) => {
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
        <div>
            <div class="container rounded content">
                <div class="card" style={{ width: "25rem", height: "50vh" }}>
                    <br></br>
                    <br></br>
                    <br></br>
                    <br></br>
                    <h1 class="main-header">Attraction List</h1>
                    {attractions.map((attraction) => {
                        return (
                            <div>
                                {attraction.name}
    
                                <button
                                    className="btn btn-danger"
                                    onClick={() => {
                                        deleteAttraction(
                                            attraction.attractionID
                                        );
                                    }}
                                >
                                    Delete
                                </button>
                            </div>
                        );
                    })}
                    <button className="btn btn-primary btn-sm">
                        <Link
                            to="/react/attractions/create"
                            style={{ color: "white" }}
                        >
                            Create new attraction
                        </Link>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default AttractionList;
