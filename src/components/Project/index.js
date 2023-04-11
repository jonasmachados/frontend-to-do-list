import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import "./styles.css"
import ToDoListService from '../../services/ToDoListService'
import moment from 'moment';
import { BsCalendar2Plus } from "react-icons/bs";

const Project = () => {

    const { id } = useParams();
    const [name, setName] = useState('')
    const [dateInitial, setDateInitial] = useState('')
    const [listTasks, setListTasks] = useState('')

    const formattedDate = moment(dateInitial).format('DD/MM/YYYY');

    useEffect(() => {
        ToDoListService.getToDoListsById(id).then((response) => {
            setName(response.data.name)
            setDateInitial(response.data.dateInitial)
            setListTasks(response.data.listTasks)
            console.log((response.data.listTasks))
        }).catch(error => {
            console.log(error)
        })
    }, [id])

    return (
        <div className='container-project'>
            <h1>Mantenha o controle da sua rotina de maneira simples e organizada!!</h1>

            <h2>{name} : {formattedDate}</h2>

            <ul className='menu-task'>
                <li className='NOT_STARTED'>Not Started</li>
                <li className='IN_PROGRESS'>In Progress</li>
                <li className='COMPLETED'>Completed</li>
            </ul>

            <ol className="task-list">

                <li className="box-list main">
                    <span className="name">Nova tarefa</span>
                    <span className="icon"><BsCalendar2Plus /></span>
                </li>

                {listTasks && listTasks.map((index) => (
                    <li className={`box-list ${index.taskStatus}`} key={index.id}>
                        <span className="title">{index.title}</span>
                        <span className="dateInitial"><span style={{color: '#fff'}}>Iniciado em: </span> {moment(index.dateInitial).format('DD/MM/YYYY')}</span>
                        <span className="taskStatus"><span style={{color: '#fff'}}>Status:  </span>{index.taskStatus}</span>
                        <span className="content"><span style={{color: '#fff'}}>Comentatios: </span> {index.content}</span>
                    </li>
                ))}</ol>

        </div>
    )
}

export default Project;