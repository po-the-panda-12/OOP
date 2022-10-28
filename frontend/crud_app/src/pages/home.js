import React, { useState,useEffect } from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
import axios from "axios";


export default function Home() {
    const [user, setUser] = useState(null);
    const getCurrentUser = () => {
        axios
            .get(`http://localhost:8080/api/v1/login/logged`)
            .then((response) => console.log(response));
    };
    useEffect(()=>{
        getCurrentUser();
    },[])
    return <div>        
        <div className="content">
            <h1 classname = "main-header">Corporate Pass Application</h1>
            <h2>Welcome Home!</h2>
        </div>

        </div>;
}

