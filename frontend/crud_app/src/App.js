import './App.css';
import Create from './components/create';
import Read from './components/read';
import Update from './components/update';
import CreateLoanPass from './components/create copy';
import {BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import { Table, Button } from 'semantic-ui-react';
import { useNavigate } from 'react-router';
import React from 'react';
import { render } from '@testing-library/react';


class App extends React.Component {
  
  render() {


    return (
      <BrowserRouter>
        <div className="App">
            <div className="main">
            <h2 className="main-header">React Crud Operations</h2>

            <ul>
              <li><Link to="/react/createloanpass">Create Loan Pass</Link></li>
              <li><Link to="/react/read">Read Loanpasses</Link></li>
            </ul>
            
          

            
            <Routes>
                <Route exact path='/react/createloanpass' element={<CreateLoanPass />} />
                <Route exact path='/react/read' element={<Read />} />
                <Route exact path='/react/update' element={<Update />} />
            </Routes>
          
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;