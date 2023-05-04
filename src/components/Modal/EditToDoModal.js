import React, { useState, useEffect } from 'react';
import ModalComponent from './ModalComponent';
import ToDoListService from '../../services/ToDoListService';
import "./styles.css";

const EditToDoModal = ({ show, handleClose, id, name, setName }) => {
  const [newName, setNewName] = useState(name);

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleSave = () => {
    ToDoListService.updateToDoList(id, { name: newName })
      .then((response) => {
        setName(response.data.name);
        handleClose();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    setNewName(name);
  }, [name]);

  return (
    <ModalComponent
      show={show}
      handleClose={handleClose}
      handleSave={handleSave}
      title="Edite Nome do Projeto"
      body={
        <div>
          <input
            type="text"
            placeholder="New name"
            name="newName"
            value={newName}
            onChange={handleNameChange}
          />
        </div>
      }
    />
  );
};

export default EditToDoModal;
