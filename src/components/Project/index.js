import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import "./styles.css";
import ToDoListService from '../../services/ToDoListService';
import moment from 'moment';
import { BsCalendar2Plus } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import EditToDoModal from '../Modal/EditToDoModal';
import EditTaskModal from '../Modal/EditTaskModal';
import NewTaskModal from '../Modal/NewTaskModal';

const Project = () => {

    const { id } = useParams();

    const [name, setName] = useState('');
    const [dateInitial, setDateInitial] = useState('');
    const [listTasks, setListTasks] = useState([]);
    const [showNewTaskModal, setShowNewTaskModal] = useState(false);
    const [showEditToDoModal, setShowEditToDoModal] = useState(false);
    const [showEditTaskModal, setShowEditTaskModal] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);

    const formattedDate = moment(dateInitial).format('DD/MM/YYYY');

    const handleCloseNewTaskModal = () => setShowNewTaskModal(false);
    const handleShowNewTaskModal = () => setShowNewTaskModal(true);

    const handleCloseEditModal = () => setShowEditToDoModal(false);
    const handleShowEditToDoModal = () => setShowEditToDoModal(true);

    const handleCloseEditTaskModal = () => setShowEditTaskModal(false);
    const handleShowEditTaskModal = (task) => {
        setSelectedTask(task);
        setShowEditTaskModal(true);
    }

    const updateListTasks = (updatedTask) => {
        const updatedTasks = listTasks
            .map((task) => task.id === updatedTask.id ? updatedTask : task)
            .sort((a, b) => b.taskStatus.localeCompare(a.taskStatus, undefined, { order: ['COMPLETED', 'IN_PROGRESS', 'NOT_STARTED'] }));
            setListTasks(updatedTasks);
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
            <h1>Mantenha o controle da sua rotina de maneira simples e organizada!!</h1>

            <h2>{name} : {formattedDate}
                <button
                    style={{ backgroundColor: "var(--primary-color)", marginLeft: "10px", borderRadius: "5px" }}
                    onClick={handleShowEditToDoModal}
                >
                    <AiFillEdit color="var(--secondary-color)" fontSize="1.5em" />
                </button>
                <EditToDoModal
                    show={showEditToDoModal}
                    handleClose={handleCloseEditModal}
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

                <li className="box-list main" variant="primary" onClick={handleShowNewTaskModal}>
                    <span className="name">Nova tarefa</span>
                    <span className="icon"><BsCalendar2Plus /></span>
                </li>
                <NewTaskModal
                    show={showNewTaskModal}
                    handleClose={handleCloseNewTaskModal}
                    id={id}
                    listTasks={listTasks}
                    setListTasks={setListTasks}
                />

                {listTasks && listTasks.map((index) => (
                    <li className={`box-list ${index.taskStatus}`} key={index.id} onClick={() => handleShowEditTaskModal(index)}>
                        <span className="title">{index.title}</span>
                        <span className="dateInitial"><span style={{ color: '#fff' }}>Iniciado em: </span> {moment(index.dateInitial).format('DD/MM/YYYY')}</span>
                        <span className="taskStatus"><span style={{ color: '#fff' }}>Status:  </span>{index.taskStatus}</span>
                        <span className="content"><span style={{ color: '#fff' }}>Comentatios: </span> {index.content}</span>
                    </li>
                ))}
                {selectedTask && (
                    <EditTaskModal
                        show={showEditTaskModal}
                        handleClose={handleCloseEditTaskModal}
                        task={selectedTask}
                        updateListTasks={updateListTasks}
                    />)}

            </ol>

        </div>
    )
}

export default Project;