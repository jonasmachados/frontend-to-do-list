import React, { useState, useEffect } from 'react';
import ModalComponent from './ModalComponent';
import TaskService from '../../services/TaskService';
import ToDoListService from '../../services/ToDoListService'

const TaskModal = ({ show, handleClose, task, projectId, updateListTasks, listTasks, setListTasks }) => {
    const [title, setTitle] = useState(task?.title || '');
    const [content, setContent] = useState(task?.content || '');
    const [taskStatus, setTaskStatus] = useState(task?.taskStatus || '');

    useEffect(() => {
        setTitle(task?.title || '');
        setContent(task?.content || '');
        setTaskStatus(task?.taskStatus || 'NOT_STARTED');
    }, [task]);

    const handleAddOrUpdateTask = () => {
        const taskData = {
            title,
            content,
            taskStatus,
            dateInitial: new Date().toISOString()
        };

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
          } else {
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

        setTitle('');
        setContent('');
        setTaskStatus('NOT_STARTED');
        handleClose();
    };

    return (
        <ModalComponent
            show={show}
            handleClose={handleClose}
            handleSave={handleAddOrUpdateTask}
            title={task && task.id ? "Atualizar Tarefa" : "Nova Tarefa"}
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

export default TaskModal;