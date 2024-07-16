import React, { useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import Button from 'react-bootstrap/Button';
import TrainingTopic from './TrainingTopic';
import axios from 'axios';
import { Delete, Edit } from '../GlobalSVG/GlobalSVG';
import { expandTableCustomStyles, tableCustomStyles } from '../UI/Table';
import './DataTablePage.css';
import config from '../../config.json';

export default function TopicTable() {
    const [data, setData] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [selectedRow, setSelectedRow] = useState(null);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${config.url}/topics`);
          setData(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
      fetchData();
    }, []);
  
    const handleEdit = (row) => {
      setSelectedRow(row);
      setModalShow(true);
    };
  
    const handleDelete = async (id) => {
      try {
        await axios.delete(`${config.url}/topics/${id}`);
        setData(data.filter((item) => item._id !== id));
      } catch (error) {
        console.error('Error deleting record:', error);
      }
    };
  
    const handleAdd = () => {
      setSelectedRow(null);
      setModalShow(true);
    };

    const columns = [
          { name: 'Training Topic', selector: row => row.trainingTopic },
          {
            name: 'Actions',
            cell: row => (
              <div style={{ display: 'flex' }} className="action-buttons">
                <Button variant="warning" onClick={() => handleEdit(row)}><Edit /></Button>
                <Button variant="danger" onClick={() => handleDelete(row._id)}><Delete /></Button>
              </div>
            )
          }
        ]
      
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '30px 30px' }}>
        <Button variant="primary" onClick={handleAdd}>
          Add 
        </Button>
      </div>
      <div className="container-fluid p-0">
        <div className="mx-4 my-2">
          <DataTable
            columns={columns}
            data={data}
            customStyles={expandTableCustomStyles}
          />
        </div>
      </div>
      
      {modalShow && (
        <TrainingTopic
          show={modalShow}
          onHide={() => setModalShow(false)}
          data={selectedRow}
          onSave={(updatedData) => {
            setData(updatedData);
            setModalShow(false);
          }}
        />
      )}
    </div>
  )
}
