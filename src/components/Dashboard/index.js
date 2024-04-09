// import React, { useState, useEffect } from 'react';
// import Swal from 'sweetalert2';
// import config from '../../config.json'
// import Header from './Header';
// import Table from './Table';
// import Add from './Add';
// import Edit from './Edit';
// import axios from 'axios';
// import { employeesData } from '../../data';


// const Dashboard = () => {
//   const [employees, setEmployees] = useState(employeesData);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [isAdding, setIsAdding] = useState(false);
//   const [isEditing, setIsEditing] = useState(false);

//   async function handleChangeDateRange(data) {
//     const res = await axios.get(`${config.url}/training?startDate=${data.startDate}&endDate=${data.endDate}`)
//     setEmployees(res.data)

//   }

//   const handleEdit = id => {
//     const [employee] = employees.filter(employee => employee.id === id);

//     setSelectedEmployee(employee);
//     setIsEditing(true);
//   };

//   const handleDelete = id => {
//     Swal.fire({
//       icon: 'warning',
//       title: 'Are you sure?',
//       text: "You won't be able to revert this!",
//       showCancelButton: true,
//       confirmButtonText: 'Yes, delete it!',
//       cancelButtonText: 'No, cancel!',
//     }).then(result => {
//       if (result.value) {
//         const [employee] = employees.filter(employee => employee.id === id);

//         Swal.fire({
//           icon: 'success',
//           title: 'Deleted!',
//           text: `${employee.firstName} ${employee.lastName}'s data has been deleted.`,
//           showConfirmButton: false,
//           timer: 1500,
//         });

//         const employeesCopy = employees.filter(employee => employee.id !== id);
//         localStorage.setItem('employees_data', JSON.stringify(employeesCopy));
//         setEmployees(employeesCopy);
//       }
//     });
//   };




//   return (
//     <div className="container-fluid m-0 p-0">
//       {!isAdding && !isEditing && (
//         <>
//           <Header
//             handleChangeDateRange={handleChangeDateRange}
//             setIsAdding={setIsAdding}
//           />
//           <div className='container'>
//             <Table
//               trainings={employees}
//               handleEdit={handleEdit}
//               handleDelete={handleDelete}
//             />
//           </div>
//         </>
//       )}
//       {isAdding && (
//         <Add
//           employees={employees}
//           setEmployees={setEmployees}
//           setIsAdding={setIsAdding}
//         />
//       )}
//       {isEditing && (
//         <Edit
//           employees={employees}
//           selectedEmployee={selectedEmployee}
//           setEmployees={setEmployees}
//           setIsEditing={setIsEditing}
//         />
//       )}

//     </div>
//   );
// };

// export default Dashboard;


import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import config from '../../config.json';
import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';
import axios from 'axios';
import { employeesData } from '../../data';

const Dashboard = () => {
  const [employees, setEmployees] = useState(employeesData);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  async function handleChangeDateRange(data) {
    const res = await axios.get(`${config.url}/training?startDate=${data.startDate}&endDate=${data.endDate}`);
    setEmployees(res.data);
  }

  const handleEdit = id => {
    const employee = employees.find(employee => employee.id === id);
    setSelectedEmployee(employee);
    setIsEditing(true);
  };

  const handleDelete = async id => {
    try {
      await axios.delete(`${config.url}/training/${id}`);
      setEmployees(employees.filter(employee => employee.id !== id));
      Swal.fire({
        icon: 'success',
        title: 'Deleted!',
        text: 'Employee data has been deleted.',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        window.location.reload(); // Reload the page
        // or navigate to dashboard
        // history.push('/dashboard');
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
  

  return (
    <div className="container-fluid m-0 p-0">
      {!isAdding && !isEditing && (
        <>
          <Header
            handleChangeDateRange={handleChangeDateRange}
            setIsAdding={setIsAdding}
          />
          <div className='container'>
            <Table
              trainings={employees}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
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
          employees={employees}
          selectedEmployee={selectedEmployee}
          setEmployees={setEmployees}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};
export default Dashboard;
