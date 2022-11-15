import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import AttractionForm from "../../components/attractions/AttractionForm";
import axios from "../../api/axios";
function UpdateAttraction() {
    const backendDomain = process.env.REACT_APP_backendDomain;
    const { attractionId } = useParams();
    const [attraction, setAttraction] = useState(null);
    const getCurrentEmailTemplate = async () => {
        await axios
            .get(`${backendDomain}/api/v1/attractions/${attractionId}`)
            .then((res) => {
                console.log(res.data);
                setAttraction(res.data);
            });
    };
    useEffect(() => {
        const callAsyncFunctions = async () => {
            await getCurrentEmailTemplate();
        };
        callAsyncFunctions().catch(console.error);
    }, []);
    return (
        <div className="container rounded content">
            <div className="card" style={{ width: "60rem" }}>
                <h2 className="main-header">Update Attraction</h2>
                {attraction ? (
                    <>
                        <AttractionForm attraction={attraction} />
                        <button className="btn btn-secondary btn-sm">
                            <Link
                                to="/react/attractions"
                                style={{ color: "white" }}
                            >
                                Cancel
                            </Link>
                        </button>
                    </>
                ) : (
                    <>
                        <h4>Loading attraction</h4>
                    </>
                )}
            </div>
        </div>
    );
}

export default UpdateAttraction;
