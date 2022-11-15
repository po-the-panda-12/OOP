import React from "react";
import { Link } from "react-router-dom";
import AttractionForm from "../../components/attractions/AttractionForm";
function CreateAttractions() {
    return (
        <div className="container rounded content">
            <div className="card" style={{ width: "60rem" }}>
                <h2 className="main-header">Create Attraction</h2>
                <AttractionForm attraction={null} />
                <button className="btn btn-secondary btn-sm">
                    <Link to="/react/attractions" style={{ color: "white" }}>
                        Cancel
                    </Link>
                </button>
            </div>
        </div>
    );
}

export default CreateAttractions;
