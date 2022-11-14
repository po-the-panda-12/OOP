import React from 'react';
import { Link } from "react-router-dom";


function CreateAttractions(props) {
    return (
        <div class="container rounded content">
            <div class="card" style={{ width: "25rem", height: "50vh" }}>
                <h2 class="main-header">Create Attraction</h2>
                <button class="btn btn-secondary btn-sm">
                    <Link to="/react/attractions" style={{ color: "white" }}>
                        Cancel
                    </Link>
                </button>
            </div>
        </div>
    );
}

export default CreateAttractions;