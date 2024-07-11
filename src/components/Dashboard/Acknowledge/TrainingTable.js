import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TrainingTable.css';
import config from "../../../config.json";
import { useParams } from 'react-router-dom';

const TrainingTable = () => {
    const [trainingData, setTrainingData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    let { id } = useParams()
    useEffect(() => {
        const fetchTrainingData = async () => {
            try {

                const response = await axios.get(`${config.url}/training/final/${id}`);
                setTrainingData(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching training data:', error);
                setIsLoading(false);
            }
        };

        fetchTrainingData();
    }, []);


    const handleAcknowledgeChange = (employeeId, value) => {
        setTrainingData(prevData => ({
            ...prevData,
            allEmployees: prevData.allEmployees.map(employee => {
                if (employee._id === employeeId) {
                    return { ...employee, acknowledgement: value };
                }
                return employee;
            })
        }));
    };

    const handlePunchInOutChange = (employeeId, field, value) => {
        setTrainingData(prevData => ({
            ...prevData,
            allEmployees: prevData.allEmployees.map(employee => {
                if (employee._id === employeeId) {
                    return { ...employee, [field]: value };
                }
                return employee;
            })
        }));
    };

    const handleSubmit = async () => {
        try {
            await axios.post(`${config.url}/training/acknowledge/` + id, trainingData);
            alert('Acknowledgement submitted successfully!');
        } catch (error) {
            console.error('This meeting has already been acknowledged:', error);
            alert('This meeting has already been acknowledged.');
        }
    };

    if (isLoading) {
        return <div className="container">Loading...</div>;
    }

    if (!trainingData || !trainingData.allEmployees || trainingData.allEmployees.length === 0) {
        return <div className="container">No training data available</div>;
    }

    function formatTime(date) {
        const dateTime = new Date(date);
        dateTime.setHours(dateTime.getHours() - 5);
        dateTime.setMinutes(dateTime.getMinutes() - 30);

        // Format the time as desired (e.g., HH:mm)
        const formattedTime = `${dateTime.getHours()}:${String(dateTime.getMinutes()).padStart(2, '0')}`;

        return formattedTime;
    }

    return (
        <div className="container">
            <div className="section">
                <h2 className="heading">Training Session Details</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Project Name</th>
                            <th>Trainer Name</th>
                            <th>Venue</th>
                            <th>Plant Names</th>
                            <th>Plant IDs</th>
                            <th>Date</th>
                            <th>From Time</th>
                            <th>To Time</th>
                            <th>Faculty Mail</th>
                            <th>Meeting Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{trainingData.projectName}</td>
                            <td>{trainingData.trainerName}</td>
                            <td>{trainingData.venue}</td>
                            <td>{trainingData.plantNames?.join(', ')}</td>
                            <td>{trainingData.plantIds?.join(', ')}</td>
                            <td>{new Date(trainingData.date).toLocaleDateString()}</td>
                            <td>{trainingData.fromTime}</td>
                            <td>{trainingData.toTime}</td>
                            <td>{trainingData.facultyMail}</td>
                            <td>{trainingData.meetingDescription}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="section">
                <h2 className="heading">Participant List</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Employee Name</th>
                            <th>Employee ID</th>
                            <th>Category</th>
                            <th>Department</th>
                            <th>Plant ID</th>
                            <th>Punch In</th>
                            {/* <th>Punch Out</th> */}
                            <th>Acknowledge</th>
                        </tr>
                    </thead>
                    <tbody>
                        {trainingData.allEmployees.map(employee => (
                            <tr key={employee._id}>
                                <td>{employee.empFName[0]}</td>
                                <td>{employee.empOnlyId}</td>
                                <td>{employee.planned ? 'Planned' : 'Unplanned'}</td>
                                <td>{employee.department.join(', ')}</td>
                                <td>{employee.empPlantId.join(', ')}</td>
                                <td>{employee.timeInfo.length > 0 ? formatTime(employee.timeInfo[0].time) : '-'}</td>
                                {/* <td>{employee.timeInfo.length > 1 ? formatTime(employee.timeInfo[1].time) : '-'}</td> */}
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={employee.acknowledgement} 
                                        onChange={() => handleAcknowledgeChange(employee._id, !employee.acknowledgement)}
                                        className="input-checkbox"
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <button onClick={handleSubmit} className="submit-btn">Acknowledgement</button>
        </div>
    );
};

export default TrainingTable;
