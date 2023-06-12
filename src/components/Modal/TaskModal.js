import React, { useState, useEffect } from 'react';
import ModalComponent from './ModalComponent';
import TaskService from '../../services/TaskService';
import ToDoListService from '../../services/ToDoListService'
import { validateTask } from '../../validations/validateTask'

const TaskModal = ({ show, handleClose, task, projectId, updateListTasks, listTasks, setListTasks }) => {

    const [title, setTitle] = useState(task?.title || '');
    const [content, setContent] = useState(task?.content || '');
    const [taskStatus, setTaskStatus] = useState(task?.taskStatus || '');
    const [titleError, setTitleError] = useState({ title: '' })
    const [contentError, setContentError] = useState({ content: '' })

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
        setTitleError({ ...titleError, title: '' });
    };

    const handleContentChange = (event) => {
        setContent(event.target.value);
        setContentError({ ...contentError, content: '' });
    };

    const handleAddOrUpdateTask = async () => {
        const taskData = {
            title,
            content,
            taskStatus,
            dateInitial: new Date().toISOString()
        };

        const validationResult = await validateTask(taskData);

        if (validationResult.isValid) {
            if (task && task.id) {
                TaskService.updateTask(task.id, taskData)
                    .then((response) => {
                        const updatedTasks = listTasks.map((t) => (t.id === response.data.id ? response.data : t));
                        const sortedTasks = updateListTasks(updatedTasks);
                        setListTasks(sortedTasks);
                        handleClose();
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }else {
                ToDoListService.addTaskToList(projectId, taskData)
                    .then((response) => {
                        const updatedTasks = [...listTasks, response.data];
                        const sortedTasks = updateListTasks(updatedTasks);
                        setListTasks(sortedTasks);
                        handleClose();
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        } else {
            setTitleError({ ...titleError, title: validationResult.errors });
            setContentError({ ...contentError, content: validationResult.errors });
        }

    };

    useEffect(() => {
        setTitle(task?.title || '');
        setContent(task?.content || '');
        setTaskStatus(task?.taskStatus || 'NOT_STARTED');
    }, [task]);


    return (
        <ModalComponent
            show={show}
            handleClose={handleClose}
            handleSave={handleAddOrUpdateTask}
            title={task && task.id ? "Atualizar Tarefa" : "Nova Tarefa"}
            body={
                <div className="modal-body">

                    {/* Task title input field */}
                    <label htmlFor="title">Título:</label>
                    <textarea
                        type="text"
                        placeholder="Digite o título..."
                        name="title"
                        value={title}
                        onChange={handleTitleChange}
                        className="form-field"
                    ></textarea>
                    {titleError.title && <p style={{ color: "red", fontSize: "20px", margin: "0 0 30px 0" }}>{titleError.title.title}</p>}

                    {/* Task content input field */}
                    <label htmlFor="content">Conteúdo:</label>
                    <textarea
                        type="text"
                        placeholder="Digite o comentario..."
                        name="content"
                        value={content}
                        onChange={handleContentChange}
                        className="form-field"
                    ></textarea>
                    {contentError.content && <p style={{ color: "red", fontSize: "20px", margin: "0 0 30px 0" }}>{contentError.content.content}</p>}

                    {/* Task status select menu */}
                    <label htmlFor="taskStatus">Task Status:</label>
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

            }
        />
    );
};

export default TaskModal;