import './App.css';
import Read from './components/read loanpass';
import Update from './components/update loanpass';
import CreateLoanPass from './components/create loanpass';
import {BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import { Table, Button } from 'semantic-ui-react';
import { useNavigate } from 'react-router';
import React, { useState } from 'react';
import { render } from '@testing-library/react';
import DatePicker from 'react-date-picker'
import ViewBooking from './components/viewbooking';

import LoanApplication from './components/loan';

import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import HomePage from './components/home';
import EmailTemplatePage from "./pages/emailTemplatePage"
import Authenticate from './pages/authenticate';
import Home from './pages/home';


class App extends React.Component {
  
  render() {

    

    return (
      
      <BrowserRouter>
        <div className="App">
          {/* NAV BAR */}

          <Navbar bg="light" expand="lg" fixed="top" >
            <Container>
              <Navbar.Brand href="#home">Corporate Pass Application</Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto" defaultActiveKey="/react" as="ul">
                  <Nav.Item as="li">
                    <Nav.Link href="">
                      <Link to="/react">Home</Link>
                    </Nav.Link>
                  </Nav.Item>
                  
                  <Nav.Link href="">
                    <Link to="/react/auth">Authenticate</Link>
                  </Nav.Link>
                    <Nav.Link href="">
                      <Link to="/react/loan">Loan Application</Link>
                    </Nav.Link>
                  <Nav.Link href="">
                    <Link to="/react/viewbooking">View Booking</Link>
                  </Nav.Link>
                  <NavDropdown title="Loan Pass" id="basic-nav-dropdown">
                    <NavDropdown.Item href="">
                      <Link to="/react/createloanpass">Create Loan Pass</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item href="">
                    <Link to="/react/read">Read Loanpasses</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item href="">Something</NavDropdown.Item>
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
            <h2 className="main-header">Corporate Pass Application</h2>

            
            <Routes>
              <Route exact path='/react' element={<Home />} />
              <Route exact path="/react/auth" element={<Authenticate />} />

                <Route exact path='/react/createloanpass' element={<CreateLoanPass />} />
                <Route exact path='/react/read' element={<Read />} />
                <Route exact path='/react/update' element={<Update />} />
                <Route exact path='/react/loan' element={<LoanApplication />} />
                <Route exact path='/react/viewbooking' element={<ViewBooking />} />
                <Route exact path='/react/emailtemplates' element={<EmailTemplatePage />} />
            </Routes>
          
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
