import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmployeeComponent from './components/EmployeeComponent';
import DepartmentComponent from "./components/DepartmentComponent";
import Employees_Homepage from "./components/Employees_Homepage";

import EmployeeListComponent from "./components/EmployeeListComponent";
import EmailComponent from "./components/EmailComponent";
import BackupPage from './components/BackupPage';
import LogComponent from './components/LogComponent';
import LoginComponent from './components/LoginComponent';
import ProtectedComponent from './components/ProtectedComponent';
function App() {
    return (
        <Router>
            <div>
                <Routes>
                <Route path='/Protected' element={<ProtectedComponent />} />
                <Route path='/log' element={<LogComponent />} />
                <Route path='/login' element={<LoginComponent />} />
                <Route path='/backup' element={<BackupPage />} />
                    <Route path='/email' element={<EmailComponent />} />
                    <Route path='/employees_list' element={<EmployeeListComponent />} />
                    
                    <Route path='/employees_homepage' element={<Employees_Homepage />} />
    
                    <Route path="/employees" element={<EmployeeComponent />} />
                    <Route path='/departments' element={<DepartmentComponent />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;

