import React, { useState, useEffect} from 'react';
import ModalComponent from './ModalComponent';
import ToDoListService from '../../services/ToDoListService';
import "./styles.css";

const ToDoModal = ({ show, handleClose, id, name, setName }) => {
  const [newName, setNewName] = useState(name || '');

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleAddOrUpdate = () => {
    const toDoList = { name: newName, dateInitial: new Date().toISOString() };

    if (id) {
      ToDoListService.updateToDoList(id, { name: newName })
        .then((response) => {
          setName(response.data.name);
          handleClose();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      ToDoListService.createToDoList(toDoList)
        .then((response) => {
          window.location.href = `/project/${response.data.id}`;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    if (typeof name !== 'undefined') {
      setNewName(name);
    }
  }, [name]);

  return (
    <ModalComponent
      show={show}
      handleClose={handleClose}
      handleSave={handleAddOrUpdate}
      title={id ? <p>Atualizar Projeto</p> : <p>Novo Projeto</p>}
      body={
        <div>
          <input
            type="text"
            placeholder="Name"
            name="newName"
            value={newName}
            onChange={handleNameChange}
          />
        </div>
      }
    />
  );
};

export default ToDoModal;
