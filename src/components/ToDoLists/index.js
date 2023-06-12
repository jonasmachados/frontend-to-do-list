import React, { useState, useEffect } from "react";
import toDoListService from '../../services/ToDoListService'
import { format, parseISO } from "date-fns";
import { BsCalendar2Plus } from "react-icons/bs";
import "./styles.css";
import { useNavigate } from 'react-router-dom';
import ToDoModal from "../Modal/ToDoModal";

const ToDoLists = () => {

    const navigate = useNavigate();

    const [toDoList, setToDoList] = useState([]);
    const [showToDoModal, setShowToDoModal] = useState(false);

    const handleCloseToDoModal = () => setShowToDoModal(false);
    const handleShowToDoModal = () => setShowToDoModal(true);

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
            <h1>Visualize todas as suas
                <span style={{ color: "var(--primary-button)", }}> tarefas </span>
                em um só lugar e adicione novas facilmente com apenas um clique.
            </h1>

            <ol className="project-list overlay">
                <li className="to-do-list primary" variant="primary" onClick={handleShowToDoModal}>
                    <span className="name">Novo projeto</span>
                    <span className="icon"><BsCalendar2Plus /></span>
                </li>
                <ToDoModal
                    show={showToDoModal}
                    handleClose={handleCloseToDoModal}
                />

                {toDoList.map((toDoList) => (
                    <li className="to-do-list secondary" key={toDoList.id} onClick={() => handleClick(toDoList.id)} >
                        <span className="name">{toDoList.name}</span>
                        <span className="date">Iniciado em {format(parseISO(toDoList.dateInitial), 'dd/MM/yyyy')}</span>
                    </li>
                ))}</ol>

        </div>
    )
}

export default ToDoLists;