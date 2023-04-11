import React, { useState, useEffect } from "react";
import ToDoListService from "../../services/ToDoListService";
import { format, parseISO } from "date-fns";
import { BsCalendar2Plus } from "react-icons/bs";
import "./styles.css";
import { useNavigate } from 'react-router-dom';

const ToDoLists = () => {
    const [toDoList, setToDoList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAllToDoLists();
    }, []);

    const getAllToDoLists = () => {
        ToDoListService.getAllToDoLists()
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

            <ol className="project-list">
                <li className="to-do-list" >
                    <span className="name">Novo projeto</span>
                    <span className="icon"><BsCalendar2Plus /></span>
                </li>

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