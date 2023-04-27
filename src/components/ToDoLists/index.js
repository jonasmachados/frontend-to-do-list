import React, { useState, useEffect } from "react";
import toDoListService from '../../services/ToDoListService'
import { format, parseISO } from "date-fns";
import { BsCalendar2Plus } from "react-icons/bs";
import "./styles.css";
import { useNavigate } from 'react-router-dom';
import ModalComponent from "../Modal/ModalComponent";

const ToDoLists = () => {

    const [name, setName] = useState('');

    const [toDoList, setToDoList] = useState([]);
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);
    const handleSaveModal = async (e) => {

        e.preventDefault();
        
        const dateInitial = new Date().toISOString();
        const newToDoList = { name, dateInitial };

        toDoListService.createToDoList(newToDoList).then((response) => {
            window.location.href = `/project/${response.data.id}`;
            getAllToDoLists();
        }).catch(error => {
            console.log(error)
        })

        handleCloseModal();
    };

    useEffect(() => {
        getAllToDoLists();
    }, []);

    const getAllToDoLists = () => {
        toDoListService.getAllToDoLists()
            .then((response) => {
                setToDoList(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleClick = (toDoListID) => {
        navigate('/project/' + toDoListID);
    };

    return (
        <div className="container-to-do-lists">
            <h1>Visualize todas as suas tarefas em um só lugar e adicione novas facilmente com apenas um clique.</h1>

            <ol className="project-list overlay">
                <li className="to-do-list" variant="primary" onClick={handleShowModal}>
                    <span className="name">Novo projeto</span>
                    <span className="icon"><BsCalendar2Plus /></span>
                </li>
                <ModalComponent
                    show={showModal}
                    handleClose={handleCloseModal}
                    handleSave={handleSaveModal}
                    title="Novo Projeto"
                    backdropClassName="custom-backdrop"
                    body={
                        <div>
                            <div>
                                <label>Projeto: </label>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    name="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                >
                                </input>
                            </div>

                        </div>
                    }
                />

                {toDoList.map((toDoList) => (
                    <li className="to-do-list" key={toDoList.id} onClick={() => handleClick(toDoList.id)} >
                        <span className="name">{toDoList.name}</span>
                        <span className="date">Iniciado em {format(parseISO(toDoList.dateInitial), 'dd/MM/yyyy')}</span>
                    </li>
                ))}</ol>


        </div>
    )
}

export default ToDoLists;