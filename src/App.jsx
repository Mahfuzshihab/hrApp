import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PersonList from './EmployeeList';
import Header from './Header';
import Footer from './Footer';
import AddEmployee from './AddEmployee';
import About from './About';
import useAxios from './hooks/useAxios';

import './styles/App.css';

const App = () => {
  const [employees, setEmployees] = useState([]);
  const { get } = useAxios();

  useEffect(() => {
    get('/employees')
      .then((data) => {
        console.log('Initial load:', data);
        setEmployees(data);
      })
      .catch(err => console.error("Fetch error:", err));
  }, [get]);

  const handleAddEmployee = (newEmployee) => {
    console.log('Adding new employee to state:', newEmployee);
    setEmployees(prev => [...prev, newEmployee]);
  };

  const handleUpdate = (updatedEmployee) => {
    console.log('Updating employee in state:', updatedEmployee);
    setEmployees(prev =>
      prev.map(emp =>
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      )
    );
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={
            <PersonList
              employees={employees}
              onUpdate={handleUpdate}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/add" element={<AddEmployee onAddEmployee={(newEmp) => setEmployees(prev => [...prev, newEmp])} />} />
        </Routes>
      <Footer />
    </Router>
  );
};

export default App;
