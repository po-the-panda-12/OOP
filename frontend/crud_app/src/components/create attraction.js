import React, { useState } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function CreateAttraction() {
    const backendDomain = process.env.REACT_APP_backendDomain;
    const navigate = useNavigate();
    const [attractionId, setAttractionId] = useState('');
    const [checkbox, setCheckbox] = useState(false);
    const postData = () => {
        const postRequest = "{attractioId: " + attractionId +"}";
        alert("sent a post request:\n" + postRequest + `\nto ${backendDomain}/api/v1/loanpass`);
        
        axios.post(`${backendDomain}/api/v1/attraction`, {
            attractionId,
        }).then(() => {
            alert("success! going to read page");
            navigate('/react/read');
        }).catch((err) => {
            alert("error in creation! staying on this page." + err);
        });

        
        

    }
    return (
        <div>
            <Form className="create-form">
                <Form.Field>
                    <label>attractionId</label>
                    <input placeholder='attractionId' onChange={(e) => setAttractionId(e.target.value)}/>
                </Form.Field>
                <Button onClick={postData} type='submit'>Submit</Button>
            </Form>
        </div>
    )
}