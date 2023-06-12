import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./styles.css";
import ToDoListService from '../../services/ToDoListService';
import moment from 'moment';
import { BsCalendar2Plus } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import ToDoModal from '../Modal/ToDoModal';
import TaskModal from '../Modal/TaskModal';

const Project = () => {

    const { id } = useParams();

    const [name, setName] = useState('');
    const [dateInitial, setDateInitial] = useState('');
    const [listTasks, setListTasks] = useState([]);
    const [showTaskModal, setShowTaskModal] = useState(false);
    const [showToDoModal, setShowToDoModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const formattedDate = moment(dateInitial).format('DD/MM/YYYY');

    const handleCloseTaskModal = () => setShowTaskModal(false);
    const handleShowTaskModal = (task) => {
        setSelectedTask(task);
        setShowTaskModal(true);
    };
    const handleCloseToDoModal = () => setShowToDoModal(false);
    const handleShowToDoModal = () => setShowToDoModal(true);

    const updateListTasks = (tasks) => {
        return tasks.sort((a, b) =>
            b.taskStatus.localeCompare(a.taskStatus, undefined, {
                order: ["COMPLETED", "IN_PROGRESS", "NOT_STARTED"],
            })
        );
    };

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
            <h1>Mantenha o controle da sua rotina de maneira
                <span style={{ color: "var(--primary-button)", }}> simples </span> e
                <span style={{ color: "var(--primary-button)", }}> organizada </span>!!
            </h1>

            <h2>{name} : {formattedDate}
                <button
                    className="button-edit-name"
                    onClick={handleShowToDoModal}>
                    <AiFillEdit
                        color="var(--primary-color)"
                        fontSize="1.5em" />
                </button>
                <ToDoModal
                    show={showToDoModal}
                    handleClose={handleCloseToDoModal}
                    id={id}
                    name={name}
                    setName={setName}
                />
            </h2>

            <ul className='menu-task'>
                <li className='NOT_STARTED'>Not Started</li>
                <li className='IN_PROGRESS'>In Progress</li>
                <li className='COMPLETED'>Completed</li>
            </ul>

            <ol className="task-list overlay">

                <li className="box-list main"
                    variant="primary"
                    onClick={handleShowTaskModal}>
                    <span className="name">Nova tarefa</span>
                    <span className="icon"><BsCalendar2Plus /></span>
                </li>

                {listTasks && listTasks.map((index) => (
                    <li className={`box-list ${index.taskStatus}`}
                        key={index.id}
                        onClick={() => handleShowTaskModal(index)}>
                        <span className="title">{index.title}</span>
                        <span className="dateInitial">Iniciado em: {moment(index.dateInitial)
                            .format('DD/MM/YYYY')}
                        </span>
                        <span className="content">Comentatios: {index.content}</span>
                    </li>
                ))}

                {selectedTask && (
                    <TaskModal
                        show={showTaskModal}
                        handleClose={handleCloseTaskModal}
                        task={selectedTask}
                        projectId={id}
                        updateListTasks={updateListTasks}
                        listTasks={listTasks}
                        setListTasks={setListTasks}
                    />)}

            </ol>

        </div>
    )
}

export default Project;