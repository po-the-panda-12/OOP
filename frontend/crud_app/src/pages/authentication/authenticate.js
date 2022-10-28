import React, { useState } from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
import axios from "axios";

import 'bootstrap/dist/css/bootstrap.min.css';

export default function Authenticate() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [haveAccount, setHaveAccount] = useState(false);

    const [checkbox, setCheckbox] = useState(false);
    const register = () => {
        axios.post(`http://localhost:8080/api/v1/registration`, {
            name,
            email,
            password,
            phone,
        });

        const postRequest =
            "{name: " +
            name +
            ",\n email: " +
            email +
            ",\n password: " +
            password +
            ",\n phone: " +
            phone +
            "}";

        alert(
            "sent a post request:\n" +
                postRequest +
                "\nto http://localhost:8080/api/v1/registration"
        );
    };
    const login = () => {
        axios.post(`http://localhost:8080/api/v1/login`, {
            email,
            password,
        }).then(response => console.log(response.data))
        alert("Logging in!");
    };

    const toggle = () => {
        setName("");
        setEmail("");
        setPassword("");
        setPhone("");
        setCheckbox("");
        setHaveAccount(!haveAccount);
    };

    return (
        <div class = "container rounded content">
            <div class="card"style={{ width: '30rem', height: '50vh'}}>
                {haveAccount ? (
                    <h2 className="main-header">Login</h2>
                ) : (
                    <h2 className="main-header">Registration</h2>
                )}

                <Form className="create-form" style={{ margin: "auto" }}>
                    {haveAccount ? (
                        <></>
                    ) : (
                        <Form.Field>
                            <label>Name</label>
                            <input
                                placeholder="Name"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </Form.Field>
                    )}

                    <Form.Field>
                        <label>Email</label>
                        <input
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Password</label>
                        <input
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Field>
                    {haveAccount ? (
                        <></>
                    ) : (
                        <>
                            <Form.Field>
                                <label>Phone</label>
                                <input
                                    placeholder="Phone"
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Checkbox
                                    label="I agree to the Terms and Conditions"
                                    onChange={(e) => setCheckbox(!checkbox)}
                                />
                            </Form.Field>
                        </>
                    )}

                    {haveAccount ? (
                        <Button onClick={login} type="submit">
                            Login
                        </Button>
                    ) : (
                        <Button onClick={register} type="submit">
                            Register
                        </Button>
                    )}
                    <hr></hr>
                    {haveAccount ? (
                        <p>
                            Don't have an account? Sign up{" "}
                            <a onClick={toggle}>here</a>
                        </p>
                    ) : (
                        <p>
                            Already have an account? Login{" "}
                            <a onClick={toggle}>here</a>
                        </p>
                    )}
                </Form>
            </div>
        </div>
    );
}
