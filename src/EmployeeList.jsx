import React, { useEffect, useState } from "react";
import useAxios from "./hooks/useAxios";
import EmployeeCard from "./EmployeeCard"; 

const EmployeeList = () => {
  const { get } = useAxios();
  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const data = await get("/employees");
        setEmployeeData(data);
      } catch (error) {
        console.error("Failed to load employee data:", error);
      }
    };

    fetchEmployees();
  }, [get]);

  const handleUpdateEmployee = (updatedEmployee) => {
    setEmployeeData((prev) =>
      prev.map((emp) =>
        emp.id === updatedEmployee.id ? updatedEmployee : emp
      )
    );
  };

  return (
    
    <div className="container">
      {employeeData.map((employee) => (
        <EmployeeCard
          key={employee.id}
          employee={employee}
          onUpdate={handleUpdateEmployee}
        />
      ))}
    </div>
  );
};

export default EmployeeList;
