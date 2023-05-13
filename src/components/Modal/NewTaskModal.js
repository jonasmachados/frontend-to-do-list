import React, { useState } from 'react';
import ModalComponent from './ModalComponent';
import ToDoListService from '../../services/ToDoListService'

const NewTaskModal = ({ show, handleClose, id, listTasks, setListTasks }) => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [taskStatus, setTaskStatus] = useState('NOT_STARTED');

    const handleSaveTask = async (e) => {
        e.preventDefault();

        const newTask = { title, 
            content, 
            taskStatus, 
            dateInitial: new Date().toISOString() 
        };

        try {
            const response = await ToDoListService.addTaskToList(id, newTask);
            setListTasks([...listTasks, response.data]);
        } catch (error) {
            console.log(error);
        }

        setTitle('');
        setContent('');
        setTaskStatus('NOT_STARTED');
        handleClose();
    }

    return (
        <ModalComponent
            show={show}
            handleClose={handleClose}
            handleSave={handleSaveTask}
            title="Nova tarefa"
            body={
                <div>
                    <div>
                        <input
                            type="text"
                            placeholder="Titlo"
                            name="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}                              >
                        </input>
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


export default NewTaskModal;
