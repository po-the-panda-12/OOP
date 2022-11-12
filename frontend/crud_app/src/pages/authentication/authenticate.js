import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form } from "semantic-ui-react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

import "bootstrap/dist/css/bootstrap.min.css";
import jwt_decode from "jwt-decode";

export default function Authenticate() {
  const backendDomain = process.env.REACT_APP_backendDomain;
  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [haveAccount, setHaveAccount] = useState(false);

  const [result, setResult] = useState(0);

  const { setAuth, auth } = useAuth();
  console.log(auth, "NICEEEEEEE");

  const [checkbox, setCheckbox] = useState(false);
  const register = () => {
    axios
      .post(`${backendDomain}/api/v1/user/save`, {
        username,
        email,
        password,
        phoneNumber: phone,
        userRoles: [
          {
            id: 1,
            name: "ROLE_USER",
          },
        ],
      })
      .then((response) => {
        console.log(response);
        setHaveAccount(!haveAccount);
        console.log("have accounttt", haveAccount);

        const postRequest =
          "{username: " +
          username +
          ",\n email: " +
          email +
          ",\n password: " +
          password +
          ",\n phoneNumber: " +
          phone +
          ",\n userRoles: " +
          JSON.stringify([
            {
              id: 1,
              name: "ROLE_USER",
            },
          ]) +
          "}";

        alert(
          "sent a post request:\n" +
            postRequest +
            `\nto ${backendDomain}/api/v1/user/save`
        );
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };
  //   const login = () => {
  //     axios
  //       .post(`http://localhost:8080/api/v1/login`, {
  //         username: name,
  //         password,
  //       })
  //       .then((response) => console.log(response.data));
  //     alert("Logging in!");
  //   };

  const login = async (e) => {
    e.preventDefault();

    try {
      console.log(username, password);
      const params = new URLSearchParams();
      params.append("username", username);
      params.append("password", password);
      console.log(params);
      const response = await axios.post(
        `${backendDomain}/api/v1/login`,
        params
      );
      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      setResult(response.data);
      const accessToken = response?.data?.access_token;
      var decodedHeader = jwt_decode(accessToken, { payload: true });
      console.log(decodedHeader, "DECODED HEADER");
      console.log(decodedHeader?.roles, "DECODED ROLES");
      console.log(accessToken, "accessToken accessToken accessToken");
      const roles = decodedHeader?.roles;
      console.log(auth);

      const response2 = await axios.get(
        `${backendDomain}/api/v1/login/${username}`
      );
      console.log(response2.data.id, "response 2");
      const id = response2.data.id;
      setAuth({ username, phone, accessToken, roles, id });
      // localStorage.setItem("accessToken", auth);

      setEmail("");
      setPassword("");
      //   navigate(from, { replace: true });

      // const accessToken = response?.data?.accessToken;
      // const roles = response?.data?.roles;
      // setAuth({ username, password, roles, accessToken });
      // setUser('');
      // setPwd('');
      // navigate(from, { replace: true });
      alert("logged in as " + decodedHeader.sub + " with role of " + roles);
    } catch (err) {}
  };

  useEffect(() => {
    // Update the document title using the browser API
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);

  const toggle = () => {
    setName("");
    setEmail("");
    setPassword("");
    setPhone("");
    setCheckbox("");
    setHaveAccount(!haveAccount);
  };

  console.log("FINALLL AUTHHHH", auth);
  localStorage.setItem("accessToken", auth.accessToken);

  return (
    <div class="container rounded content">
      <div
        class="card d-flex justify-content-center"
        style={{ width: "30rem", height: "65vh" }}
      >
        {haveAccount ? (
          <h2 className="main-header">Login</h2>
        ) : (
          <h2 className="main-header">Registration</h2>
        )}

        <Form className="create-form" style={{ margin: "auto" }}>
          <Form.Field>
            <label>Name</label>
            <input
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Field>

          {haveAccount ? (
            <></>
          ) : (
            <Form.Field>
              <label>Email</label>
              <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Field>
          )}

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
              Don't have an account? Sign up <a onClick={toggle}>here</a>
            </p>
          ) : (
            <p>
              Already have an account? Login <a onClick={toggle}>here</a>
            </p>
          )}
        </Form>
      </div>
    </div>
  );
}
