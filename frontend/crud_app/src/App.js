import "./App.css";
// ========================= general components =========================
// ======== routing ========
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import React from "react";
// ======== nav bar ========
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";


import vid_background from './pages/assets/background.mp4';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';

// ========================= pages/entities =========================
// ======== homepage ========
import Home from "./pages/home";
// import HomePage from "./components/general/home";

// ======== authentication ========
import Authenticate from "./pages/authentication/authenticate";


// ======== loanpass ========
import Read from "./components/loanpass/read loanpass";
import Update from "./components/loanpass/update loanpass"
import CreateLoanPass from "./components/loanpass/create loanpass";
import LoanApplication from "./components/loanpass/loan";

// ======== booking ========
import ViewBooking from "./components/booking/viewbooking";

// ======== email template ========
import EmailTemplatePage from "./pages/emailtemplates/emailTemplatePage";
import "bootstrap/dist/css/bootstrap.min.css";
import EditEmailTemplate from "./pages/emailtemplates/editEmailTemplate";
import CreateEmailTemplate from "./pages/emailtemplates/createEmailTemplate";

// ======== successful bookings ========
import MonthlyStatistics from './components/successloan/monthlystatistic';
import EmployeeStatistics from './components/successloan/employeestatistic';


class App extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    {/* NAV BAR */}

                    <Navbar bg="light" expand="lg" fixed="top">
                        <Container>
                            <Navbar.Brand href="#home">
                                Corporate Pass Application
                            </Navbar.Brand>
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav
                                    className="me-auto"
                                    defaultActiveKey="/react"
                                    as="ul"
                                >
                                    <Nav.Item as="li">
                                        <Nav.Link href="">
                                            <Link to="/react">Home</Link>
                                        </Nav.Link>
                                    </Nav.Item>

                                    <Nav.Link href="">
                                        <Link to="/react/auth">
                                            Authenticate
                                        </Link>
                                    </Nav.Link>
                                    <Nav.Link href="">
                                        <Link to="/react/loan">
                                            Loan Application
                                        </Link>
                                    </Nav.Link>
                                    <Nav.Link href="">
                                        <Link to="/react/viewbooking">
                                            View Booking
                                        </Link>
                                    </Nav.Link>
                                    <Nav.Link href="">
                                        <Link to="/react/emailtemplates">
                                            Email Templates
                                        </Link>
                                    </Nav.Link>
                                    {/* <Nav.Link href="">
                                        <Link to="/react/statistic">
                                            Statistics
                                        </Link>
                                    </Nav.Link> */}
                                    <NavDropdown
                                        title="Statistics"
                                        id="basic-nav-dropdown"
                                    >
                                        <NavDropdown.Item href="">
                                            <Link to="/react/monthlystatistic">
                                                Monthly bookings
                                            </Link>
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="">
                                            <Link to="/react/employeestatistic">
                                                Employee bookings
                                            </Link>
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                    <NavDropdown
                                        title="Loan Pass"
                                        id="basic-nav-dropdown"
                                    >
                                        <NavDropdown.Item href="">
                                            <Link to="/react/createloanpass">
                                                Create Loan Pass
                                            </Link>
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="">
                                            <Link to="/react/read">
                                                Read Loanpasses
                                            </Link>
                                        </NavDropdown.Item>
                                        <NavDropdown.Item href="">
                                            Something
                                        </NavDropdown.Item>
                                        <NavDropdown.Divider />
                                        <NavDropdown.Item href="">
                                            Separated link
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </Nav>
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>

                    {/* END OF NAVBAR */}

                    <div className="main">

                        {/* authentication */}

                        <Routes>
                            <Route exact path="/react" element={<Home />} />
                            <Route
                                exact
                                path="/react/auth"
                                element={<Authenticate />}
                            />
                            {/* loanpass */}
                            <Route
                                exact
                                path="/react/createloanpass"
                                element={<CreateLoanPass />}
                            />
                            <Route
                                exact
                                path="/react/read"
                                element={<Read />}
                            />
                            <Route
                                exact
                                path="/react/update"
                                element={<Update />}
                            />
                            <Route
                                exact
                                path="/react/loan"
                                element={<LoanApplication />}
                            />

                            {/* booking */}
                            <Route
                                exact
                                path="/react/viewbooking"
                                element={<ViewBooking />}
                            />

                             {/* email templates */}
                            <Route
                                exact
                                path="/react/emailtemplates"
                                element={<EmailTemplatePage />}
                            />
                            <Route
                                exact
                                path="/react/emailtemplates/create"
                                element={<CreateEmailTemplate />}
                            ></Route>
                            <Route
                                exact
                                path="/react/emailtemplates/edit/:emailTemplateId"
                                element={<EditEmailTemplate />}
                            ></Route>
                            <Route
                                exact
                                path="/react/monthlystatistic"
                                element={<MonthlyStatistics />}
                            ></Route>
                            <Route
                                exact
                                path="/react/employeestatistic"
                                element={<EmployeeStatistics />}
                            ></Route>
                        </Routes>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
