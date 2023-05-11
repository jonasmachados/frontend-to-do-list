import React, { useState, useEffect } from 'react';
import ModalComponent from './ModalComponent';
import TaskService from '../../services/TaskService';

const EditTaskModal = ({ show, handleClose, task, updateListTasks }) => {
    
    const [title, setTitle] = useState(task?.title || '');
    const [content, setContent] = useState(task?.content || '');
    const [taskStatus, setTaskStatus] = useState(task?.taskStatus || '');
    const [dateInitial, setDateInitial] = useState(task?.dateInitial || '');

    useEffect(() => {
        setTitle(task?.title || '');
        setContent(task?.content || '');
        setTaskStatus(task?.taskStatus || '');
        setDateInitial(task?.dateInitial || '');
    }, [task]);

    const handleSave = () => {
        TaskService.updateTask(task.id, { title, content, taskStatus, dateInitial })
            .then(() => {
                handleClose();
                updateListTasks({ id: task.id, title, content, taskStatus, dateInitial });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <ModalComponent
            show={show}
            handleClose={handleClose}
            handleSave={handleSave}
            title="Edite Nome do Projeto"
            body={
                <div>
                    <div>
                        <input
                            type="text"
                            placeholder="Título"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Conteúdo"
                            name="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                        >
                        </input>
                    </div>

                    <div>
                        <select
                            name="taskStatus"
                            value={taskStatus}
                            onChange={(e) => setTaskStatus(e.target.value)}
                            className="menu-select"
                        >
                            <option value="NOT_STARTED">Not Started</option>
                            <option value="IN_PROGRESS">In Progress</option>
                            <option value="COMPLETED">Completed</option>
                        </select>
                    </div>
                </div>
            }
        />
    );
};


export default EditTaskModal;
