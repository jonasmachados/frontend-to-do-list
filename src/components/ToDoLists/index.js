import React, { useState, useEffect } from "react";
import ToDoListService from "../../services/ToDoListService";
import { format, parseISO } from "date-fns";
import { BsCalendar2Plus } from "react-icons/bs";
import "./styles.css";

const ToDoLists = () => {
    const [toDoList, setToDoList] = useState([]);

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

    return (
        <div className="container-to-do-lists">
            <h1>Começe a organizar suas tarefas agora mesmo!</h1>

            <ol className="project-list">
                <li className="to-do-list" key={toDoList.id}>
                    <span className="name">Novo projeto</span>
                    <span className="name"><BsCalendar2Plus /></span>
                </li>

                {toDoList.map((toDoList) => (
                    <li className="to-do-list" key={toDoList.id}>
                        <span className="name">{toDoList.name}</span>
                        <span className="date">{format(parseISO(toDoList.dateInitial), 'dd/MM/yyyy')}</span>
                    </li>
                ))}</ol>


        </div>
    )
}

export default ToDoLists;