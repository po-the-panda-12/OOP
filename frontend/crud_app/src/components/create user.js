import React, { useState } from 'react';
import { Button, Checkbox, Form } from 'semantic-ui-react'
import axios from 'axios';
import { useNavigate } from 'react-router';

export default function CreateUser() {
    const backendDomain = process.env.REACT_APP_backendDomain;
    const navigate = useNavigate();



    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    // id to be auto generated - ideally 
    const [id, setId] = useState('');
    

    const [checkbox, setCheckbox] = useState(false);
    
    
    const postData = () => {
        
        const postRequest = "{userId: " + id + ",\n name: " + name + ",\n email: " + email + ",\n phone: " + phone + ",\n role: " + role + ",\n password: " + password + "}";
        alert("sent a post request:\n" + postRequest + `\nto ${backendDomain}/api/v1/users`);
        
        axios.post(`${backendDomain}/api/v1/loanpass`, {
            id, name, email, phone, role, password
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
                    <label>userId</label>
                    <input placeholder='userId' onChange={(e) => setId(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <label>name</label>
                    <input placeholder='Name' onChange={(e) => setName(e.target.value)}/>
                </Form.Field>
                <Form.Field>
                    <Checkbox label='I agree to the Terms and Conditions' onChange={(e) => setCheckbox(!checkbox)}/>
                </Form.Field>
                <Button onClick={postData} type='submit'>Submit</Button>
            </Form>
        </div>
    )
}