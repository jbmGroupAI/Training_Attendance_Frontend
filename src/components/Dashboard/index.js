import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import config from '../../config.json';
import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';
import axios from 'axios';
import { employeesData } from '../../data';
import Index from './ParticipantTable';

const Dashboard = () => {
  const [employees, setEmployees] = useState(employeesData);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [filteredDates, setFilteredDates] = useState({
    startDate: new Date().setHours(0, 0, 0),
    endDate: new Date().setHours(23, 59, 59)
  });
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [refresh, setRefresh] = useState(false)
  const [showReport,setShowReport]=useState(false);

  async function handleChangeDateRange(data) {
    console.log(data)
    const res = await axios.get(`${config.url}/training?startDate=${data.startDate}&endDate=${data.endDate}`);
    setRefresh(false)
    setEmployees(res.data);
  }

  const handleEdit = row => {
    console.log("ertyui", row)
    const employee = employees.find(employee => employee.id === row.id);
    setSelectedEmployee(employee); // Set the selected employee data
    setIsEditing(true);
  };

  useEffect(()=>{
    if(refresh)  handleChangeDateRange(filteredDates)
  },[refresh])

  
  const handleDelete = async id => {
    try {
      const [employee] = employees.filter(employee => employee.id === id);
  
      await Swal.fire({
        icon: 'warning',
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, cancel!',
      }).then(result => {
        if (result.value) {
          axios.delete(`${config.url}/training/${id}`).then(() => {
            setEmployees(employees.filter(employee => employee.id !== id));
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: `${employee?.firstName} ${employee?.lastName}'s data has been deleted.`,
              showConfirmButton: false,
              timer: 1500,
            }).then(() => {
              setRefresh(true)
            });
          });
        }
      });
    } catch (error) {
      console.error('Error deleting employee:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: `An error occurred while deleting employee data. Please try again. ${error.message}`,
      });
    }
  };
  
  console.log("sssss",employees)
  return (
    <div className="container-fluid m-0 p-0">
      {!isAdding && !isEditing && !showReport && (
        <>
          <Header
            handleChangeDateRange={handleChangeDateRange}
            setIsAdding={setIsAdding}
            setShowReport={setShowReport}
          />
          <div className='container'>
            {/* <Table
              trainings={employees}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            /> */}
            <Table
            filteredDates ={filteredDates}
           setFilteredDates = {setFilteredDates}
             trainings={employees}
              handleEdit={handleEdit}
               handleDelete={handleDelete
               } handleChangeDateRange={handleChangeDateRange} />
          </div>
        </>
      )}
      {isAdding && (
        <Add
          employees={employees}
          setEmployees={setEmployees}
          setIsAdding={setIsAdding}
        />
      )}
      {isEditing && (
    <Edit
      selectedEmployee={selectedEmployee} // Pass the selected employee data to Edit component
      setEmployees={setEmployees}
      setIsEditing={setIsEditing}
    />
  )}
  {showReport && (
    <Index
    setShowReport={setShowReport}
    />
  )}
    </div>
  );
};
export default Dashboard;
