import React, { useState, useEffect } from 'react';
import ModalComponent from './ModalComponent';
import ToDoListService from '../../services/ToDoListService';
import { validateToDoList } from '../../validations/validateToDoList';
import "./styles.css";

const ToDoModal = ({ show, handleClose, id, name, setName }) => {
  const [newName, setNewName] = useState(name || '');
  const [errors, setErrors] = useState({ name: '' })

  const handleNameChange = (event) => {
    setNewName(event.target.value);
    setErrors({ ...errors, name: '' });
  };

  const handleAddOrUpdateToDoList = async () => {
    const toDoList = {
      name: newName,
      dateInitial: new Date().toISOString()
    };

    const validationResult = await validateToDoList(toDoList);

    if (validationResult.isValid) {
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
    } else {
      setErrors(validationResult.errors);
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
      handleSave={handleAddOrUpdateToDoList}
      title={id ? <p>Atualizar Projeto</p> : <p>Novo Projeto</p>}
      body={
        <div className="modal-body">
          <label htmlFor="name">Nome do Projeto:</label>
          <textarea
            type="text"
            placeholder="Digite o nome do projeto ..."
            name="newName"
            value={newName}
            onChange={handleNameChange}
            className="form-field"
          ></textarea>
          {errors.name && <p style={{ color: "red", fontSize: "20px", margin: "0 0 30px 0" }}>{errors.name}</p>}

        </div>
      }
    />
  );
};

export default ToDoModal;
