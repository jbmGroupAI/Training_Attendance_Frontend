import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import Select from "react-select";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { customDropdownStyles } from "../UI/Select";
import "../UI/Add.css";
import config from "../../config.json";

const AdminForm = ({ show, onHide, data, onSave }) => {
  const [venue, setVenue] = useState(null);
  const [venueId, setVenueId] = useState(null);
  const [venueIdOptions, setVenueIdOptions] = useState([]);
  const [plantOptions, setPlantOptions] = useState([]);
  const [legalCode, setLegalCode] = useState("");

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await axios.get('http://fr.thirdeye-ai.com/face/groups/getinfo?groupType=frAttendance&companyId=JBMGroup');
        setPlantOptions(response.data || []);
      } catch (error) {
        console.error("Error fetching plant data:", error);
      }
    };

    fetchPlants();
  }, []);

  useEffect(() => {
    if (data) {
      // setTrainingTopic(data.trainingTopic);
      setVenue({ value: data.venue, label: data.venue });
      setVenueId({ value: data.venueId, label: data.venueId });
      setLegalCode(data.legalCode);
      const selectedVenueIds = plantOptions
        .find((plant) => plant.groupName === data.venue)?.groupMembers.filter(id => id !== "") || [];
      setVenueIdOptions(selectedVenueIds.map((id) => ({ value: id, label: id })));
    }
  }, [data, plantOptions]);

  const handleVenueChange = (selectedOption) => {
    setVenue(selectedOption);
    if (selectedOption) {
      const selectedVenueIds = plantOptions
        .find((plant) => plant.groupName === selectedOption.value)?.groupMembers.filter(id => id !== "") || [];
      setVenueIdOptions(selectedVenueIds.map((id) => ({ value: id, label: id })));
    } else {
      setVenueIdOptions([]);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();

    if ( !venue || !venueId || !legalCode) {
      return Swal.fire({
        icon: "error",
        title: "Error!",
        text: "All fields are required.",
        showConfirmButton: true,
      });
    }

    const newTraining = {
      venue: venue.value,
      venueId: venueId.value,
      legalCode,
    };

    try {
      let response;
      if (data) {
        response = await axios.put(`${config.url}/update/${data._id}`, newTraining);
      } else {
        response = await axios.post(`${config.url}/create`, newTraining);
      }

      if (response.status === 200 || response.status === 201) {
        await Swal.fire({
          icon: "success",
          title: data ? "Updated!" : "Added!",
          text: `${legalCode} has been ${data ? "updated" : "added"}.`,
          showConfirmButton: false,
          timer: 1500,
        });
        const updatedData = await axios.get(`${config.url}/post`);
        onSave(updatedData.data);
      } else {
        throw new Error('Failed to save training');
      }
    } catch (error) {
      console.error("Error saving training:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: error?.response.data?.error,
        showConfirmButton: true,
      });
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{data ? "Edit Legal Code" : "Add Legal Code"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSave}>
          <div className="bg-white px-5 py-2 my-4 rounded-4 border">
            

            <div className="d-flex flex-wrap justify-content-between my-4 gap-1">
              <div className="col-lg-5">
                <label className="label" htmlFor="venue">
                  Venue
                </label>
                <Select
                  id="venue"
                  value={venue}
                  onChange={handleVenueChange}
                  options={plantOptions.map((plant) => ({
                    value: plant.groupName,
                    label: plant.groupName,
                  }))}
                  styles={customDropdownStyles}
                />
              </div>
              <div className="col-lg-5">
                <label className="label" htmlFor="venueId">
                  Venue ID
                </label>
                <Select
                  id="venueId"
                  value={venueId}
                  onChange={setVenueId}
                  options={venueIdOptions}
                  styles={customDropdownStyles}
                />
              </div>
            </div>
            <div className="d-flex flex-wrap justify-content-between my-4">
              <div className="col-lg-12">
                <label className="label" htmlFor="legalCode">
                  Legal Code
                </label>
                <input
                  id="legalCode"
                  type="text"
                  name="legalCode"
                  value={legalCode}
                  onChange={(e) => setLegalCode(e.target.value)}
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

export default AdminForm;
