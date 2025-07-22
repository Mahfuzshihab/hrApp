import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAxios from './hooks/useAxios';
import './styles/AddEmployee.css';

const AddEmployee = ({ onAddEmployee }) => {
  const { post } = useAxios();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '', title: '', salary: '', phone: '', email: '',
    animal: '', startDate: '', location: '', department: '', skills: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const skillsArray = formData.skills.split(',').map(s => s.trim());
    const newEmployee = {
      ...formData,
      skills: skillsArray,
      salary: parseFloat(formData.salary),
    };

    try {
      const created = await post('/employees', newEmployee);
      console.log('Created from server:', created);
      onAddEmployee(created);
      setFormData({
        name: '', title: '', salary: '', phone: '', email: '',
        animal: '', startDate: '', location: '', department: '', skills: '',
      });
      navigate('/');
    } catch (error) {
      console.error('Error adding employee:', error);
      alert('There was an error adding the employee.');
    }
  };

  return (
    <div className="form-wrapper">
      <h2 className="form-title">Add New Employee</h2>
      <form className="employee-form" onSubmit={handleSubmit}>
        {[
          { id: 'name', label: 'Name' },
          { id: 'title', label: 'Title' },
          { id: 'salary', label: 'Salary', type: 'number' },
          { id: 'phone', label: 'Phone' },
          { id: 'email', label: 'Email', type: 'email' },
          { id: 'animal', label: 'Animal' },
          { id: 'startDate', label: 'Start Date', type: 'date' },
          { id: 'location', label: 'Location' },
          { id: 'department', label: 'Department' },
          { id: 'skills', label: 'Skills (comma-separated)' },
        ].map(({ id, label, type = 'text' }) => (
          <div className="form-group" key={id}>
            <label htmlFor={id}>{label}:</label>
            <input
              type={type}
              id={id}
              name={id}
              value={formData[id]}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit" className="submit-btn">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;
