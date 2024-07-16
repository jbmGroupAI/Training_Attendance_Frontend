import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import "../UI/Add.css";
import config from '../../config.json'

const TrainingForm = ({ show, onHide, data, onSave }) => {
  const [trainingTopic, setTrainingTopic] = useState("");

  useEffect(() => {
    if (data) {
      setTrainingTopic(data.trainingTopic || "");
    }
  }, [data]);

  const handleSave = async (e) => {
    e.preventDefault();

    if (!trainingTopic) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required.",
        showConfirmButton: true,
      });
    }

    const newTraining = {
      trainingTopic
    };

    try {
      let response;
      if (data) {
        response = await axios.put(`${config.url}/topics/${data._id}`, newTraining);
      } else {
        response = await axios.post(`${config.url}/topics`, newTraining);
      }

      if (response.status === 200 || response.status === 201) {
        await Swal.fire({
          icon: "success",
          title: data ? "Updated!" : "Added!",
          text: `${trainingTopic} has been ${data ? "updated" : "added"}.`,
          showConfirmButton: false,
          timer: 1500,
        });
        const updatedData = await axios.get(`${config.url}/topics`);
        onSave(updatedData.data);
      } else {
        throw new Error('Failed to save training');
      }
    } catch (error) {
      console.error("Error saving training:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error?.response.data?.message,
        showConfirmButton: true,
      });
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{data ? "Edit Training Topic" : "Add Training Topic"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSave}>
          <div className="bg-white px-5 py-2 my-4 rounded-4 border">
            <div className="d-flex justify-content-between my-3 p-0 m-0">
              <div className="col-lg-6">
                <label className="label" htmlFor="trainingTopic">
                  Training Topic
                </label>
                <input
                  id="trainingTopic"
                  type="text"
                  name="trainingTopic"
                  value={trainingTopic}
                  onChange={(e) => setTrainingTopic(e.target.value)}
                  className="input-field"
                />
              </div>
            </div>
          </div>

          <div className="d-flex justify-content-between my-2">
            <div className="">
              <Button variant="secondary" onClick={onHide}>
                Cancel
              </Button>
            </div>
            <div className="">
              <Button type="submit" variant="primary">
                {data ? "Update" : "Add"}
              </Button>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default TrainingForm;
