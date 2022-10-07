import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import { useNavigate } from 'react-router';

import axios from 'axios';

export default function Update() {
    const navigate = useNavigate();
    const [passId, setPassId] = useState('');
    const [attractionId, setAttractionId] = useState('');
    const [passNumber, setPassNumber] = useState('');
    const [previousLoanBy, setPreviousLoanBy] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        setPassId(localStorage.getItem('passId'));
        setAttractionId(localStorage.getItem('attractionId'));
        setPassNumber(localStorage.getItem('passNumber'));
        setPreviousLoanBy(localStorage.getItem('previousLoanBy'));
        setDescription(localStorage.getItem('description'));
    }, []);

    const updateAPIData = () => {
        axios.put(`http://localhost:8080/api/v1/loanpass/${passId}?attractionId=${attractionId}&passNumber=${passNumber}&previousLoanBy=${previousLoanBy}&description=${description})`, 
            null,   
        ).then(() => {
            navigate('/read');
        }).catch((err) => {
            alert("error in update! staying on this page." + err);
        });

    }

    return (
        <div>
            <Form className="create-form">
                <Form.Field>
                    <label>attractionId</label>
                    <input placeholder='attractionId' value={attractionId} onChange={(e) => setAttractionId(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>passNumber</label>
                    <input placeholder='passNumber' value={passNumber} onChange={(e) => setPassNumber(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>previousLoanBy</label>
                    <input placeholder='previousLoanBy' value={previousLoanBy} onChange={(e) => setPreviousLoanBy(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>description</label>
                    <input placeholder='description' value={description} onChange={(e) => setDescription(e.target.value)}/>
                </Form.Field>
                <Button type='submit' onClick={updateAPIData}>Update</Button>
            </Form>
        </div>
    )
}