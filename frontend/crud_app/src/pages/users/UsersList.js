import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

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

const UsersList = () => {
  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();
  const { setAuth, auth } = useAuth();

  console.log(auth, "AUTHHH");

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

  console.log(users, "USERSS");

  return (
    <div class="container rounded content">
      <div class="card" style={{ width: "60rem", height: "50vh" }}>
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
                  <TableCell align="left">User Email</TableCell>
                  <TableCell align="left">Phone Number</TableCell>
                  <TableCell align="left">Role/s</TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users?.map((user) => (
                  <TableRow
                    key={user.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="left">{user.username}</TableCell>
                    <TableCell align="left">{user.email}</TableCell>
                    <TableCell align="left">{user.phoneNumber}</TableCell>

                    <TableCell align="left">
                      {user.userRoles?.map((role) => role.name)}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        aria-label="delete"
                        style={{ color: "#5289B5" }}
                        // onClick={() => toDelete(role.role_id)}
                      >
                        <DeleteOutlinedIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell align="center">
                      <IconButton
                        aria-label="edit"
                        style={{ color: "#5289B5" }}
                        href={`/${user.id}`}
                      >
                        <EditIcon />
                      </IconButton>
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
