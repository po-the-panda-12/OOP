import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import axios from "axios";

import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import useAuth from "../../hooks/useAuth";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Form } from "semantic-ui-react";

const UsersList = () => {
  const backendDomain = process.env.REACT_APP_backendDomain;
  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();
  const { setAuth, auth } = useAuth();

  const [username, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  console.log(auth, "AUTHHH userpage");

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/api/v1/users", {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setUsers(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    getUsers();

    console.log(users);

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const register = () => {
    axios
      .post(`${backendDomain}/api/v1/user/save`, {
        username,
        email,
        password,
        phoneNumber: phone,
        userRoles: [
          {
            id: 2,
            name: "ROLE_ADMIN",
          },
        ],
      })
      .then((response) => {
        console.log(response);

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
              id: 2,
              name: "ROLE_ADMIN",
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

  const upgradeToAdmin = async (username) => {
    try {
      const response = await axiosPrivate.post("/api/v1/role/addtouser", {
        username,
        roleName: "ROLE_ADMIN",
      });
      console.log(response.data);
      alert(username + " is now an Admin");
    } catch (err) {
      console.error(err);
    }
  };

  const deleteUser = (id) => {
    axios
      .delete(`${backendDomain}/api/v1/users/delete/${id}`)
      .then((response) => {
        alert(`User ${id} deleted`);
      });
  };

  console.log(users, "USERSS");

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  var state = {
    file: null,
  };
  const handleFile = (e) => {
    let file = e.target.files[0];
    //console.log(e.target.files, "$$$")
    state = {
      file: file,
    };
  };
  const helpUpload = (e) => {
    console.log(state, "The state ****");
    let file = state.file;
    var formdata = new FormData();
    formdata.append("file", file);
    axios({
      method: "post",
      url: `${backendDomain}/api/v1/upload`,
      data: formdata,
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then(function (response) {
        //handle success
        console.log(response);
        alert("Users added successfully!");
      })
      .catch(function (response) {
        //handle error
        console.log(response);
      });
  };

  return (
    <div class="container rounded content">
      <div class="card" style={{ width: "60rem", height: "80vh" }}>
        {auth?.roles?.includes("ROLE_ADMIN") && (
          <form>
            <div>
              <h2>Import Employees From CSV</h2>
              <input
                type="file"
                name="file"
                onChange={(e) => handleFile(e)}
              ></input>
              <Button
                variant="contained"
                type="button"
                onClick={(e) => helpUpload(e)}
              >
                Upload
              </Button>
              <hr></hr>
            </div>
          </form>
        )}
        <div>
          {auth?.roles?.includes("ROLE_ADMIN") && (
            <Button variant="outlined" onClick={handleClickOpen}>
              Add new Admin
            </Button>
          )}

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              {"Add new adminstrator"}
            </DialogTitle>
            <DialogContent>
              <Form className="create-form" style={{ margin: "auto" }}>
                <Form.Field>
                  <label>Name</label>
                  <input
                    placeholder="Name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Field>
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
                <Form.Field>
                  <label>Phone</label>
                  <input
                    placeholder="Phone"
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </Form.Field>
                <Button onClick={register} type="submit">
                  Register
                </Button>
              </Form>
            </DialogContent>

            <DialogActions>
              <Button onClick={handleClose} autoFocus>
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </div>

        <h2>Users List</h2>
        {users?.length ? (
          <TableContainer component={Paper} elevation={3}>
            <Table
              sx={{ minWidth: 640, "& td": { border: 0 } }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell>User ID</TableCell>
                  <TableCell>User Name</TableCell>
                  <TableCell align="left">User Email</TableCell>
                  <TableCell align="left">Phone Number</TableCell>
                  <TableCell align="left">Role/s</TableCell>
                  <TableCell align="center">Delete</TableCell>
                  <TableCell align="center">Upgrade to Admin</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users?.map((user) => (
                  <TableRow
                    key={user.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">{user.id}</TableCell>
                    <TableCell align="left">{user.username}</TableCell>
                    <TableCell align="left">{user.email}</TableCell>
                    <TableCell align="left">{user.phoneNumber}</TableCell>

                    <TableCell align="left">
                      {user.userRoles.length > 1
                        ? user.userRoles?.map((role) => `${role.name}, `)
                        : user.userRoles?.map((role) => `${role.name}`)}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        aria-label="delete"
                        style={{ color: "#5289B5" }}
                        onClick={() => deleteUser(user.id)}
                      >
                        <DeleteOutlinedIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      {user.userRoles[0]?.name !== "ROLE_ADMIN" &&
                        user.userRoles[1]?.name !== "ROLE_ADMIN" &&
                        user.userRoles[2]?.name !== "ROLE_ADMIN" && (
                          <Button
                            variant="contained"
                            onClick={() => upgradeToAdmin(user.username)}
                          >
                            Become Admin
                          </Button>
                        )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <p>You do not have the access rights</p>
        )}
      </div>
    </div>
  );
};

export default UsersList;
