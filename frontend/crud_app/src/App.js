import './App.css';
import Create from './components/create';
import Read from './components/read';
import Update from './components/update';
import CreateLoanPass from './components/create copy';
import {BrowserRouter, Route, Routes, Link } from 'react-router-dom'


function App() {
  return (
      <div className="main">
      <h2 className="main-header">React Crud Operations</h2>
      <a href='/createloanpass'>Create Loan Pass</a>
      <a href='/read'>Read</a>
      

      <BrowserRouter>
      <Routes>
          <Route exact path='/createloanpass' element={<CreateLoanPass />} />
          <Route exact path='/read' element={<Read />} />
          <Route exact path='/update' element={<Update />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;