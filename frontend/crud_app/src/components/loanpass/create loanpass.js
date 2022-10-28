import React, { useState } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function CreateLoanPass() {
    const backendDomain = process.env.REACT_APP_backendDomain;
    const navigate = useNavigate();
    const [attractionId, setAttractionId] = useState('');
    const [passNumber, setPassNumber] = useState('');
    const [description, setDescription] = useState('');

    const [checkbox, setCheckbox] = useState(false);
    const postData = () => {
        const postRequest = "{attractioId: " + attractionId + ",\n passNumber: " + passNumber + ",\n description: " + description + "}";
        alert("sent a post request:\n" + postRequest + `\nto ${backendDomain}/api/v1/loanpass`);
        
        axios.post(`${backendDomain}/api/v1/loanpass`, {
            attractionId,
            passNumber,
            description,
        }).then(() => {
            alert("success! going to read page");
            navigate('/react/read');
        }).catch((err) => {
            alert("error in creation! staying on this page." + err);
        });

        
        

    }
    return (
        <div class="content">
            <Form className="create-form">
                <Form.Field>
                    <label>attractionId</label>
                    <input placeholder='attractionId' onChange={(e) => setAttractionId(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>PassNumber</label>
                    <input placeholder='PassNumber' onChange={(e) => setPassNumber(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <Checkbox label='I agree to the Terms and Conditions' onChange={(e) => setCheckbox(!checkbox)}/>
                </Form.Field>
                <Button onClick={postData} type='submit'>Submit</Button>
            </Form>
        </div>
    )
}