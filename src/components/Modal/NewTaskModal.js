import React, { useState } from 'react';
import ModalComponent from './ModalComponent';
import ToDoListService from '../../services/ToDoListService'
import { validateTask } from '../../validations/validateTask';

const NewTaskModal = ({ show, handleClose, id, listTasks, setListTasks }) => {

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [taskStatus, setTaskStatus] = useState('NOT_STARTED');
    const [errors, setErrors] = useState({ title: null, content: null });

    const handleSaveTask = async (e) => {
        e.preventDefault();

        const task = {
            title,
            content,
            taskStatus,
            dateInitial: new Date().toISOString()
        };

        const validationResult = await validateTask(task);
        if (validationResult.isValid) {
            ToDoListService.addTaskToList(id, task)
                .then((response) => {
                    setListTasks([...listTasks, response.data]);
                })
                .catch((error) => {
                    console.log(error);
                });

            setTitle('');
            setContent('');
            setTaskStatus('NOT_STARTED');
            handleClose();
        } else {
            setErrors(validationResult.errors);
        }
    };

    const handleTitleChange = (e) => {
        const value = e.target.value;
        setTitle(value);
      
        if (value.length >= 3 && errors.title) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            title: null, 
          }));
        }
      };
      
      const handleContentChange = (e) => {
        const value = e.target.value;
        setContent(value);
      
        if (value.length >= 3 && errors.content) {
          setErrors((prevErrors) => ({
            ...prevErrors,
            content: null, 
          }));
        }
      };

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
                            onChange={handleTitleChange}
                        />
                        {errors.title && <p style={{ color: "red", fontSize: "20px", margin: "0 0 30px 0" }}>{errors.title}</p>}
                    </div>

                    <div>
                        <input
                            type="text"
                            placeholder="Conteúdo"
                            name="content"
                            value={content}
                            onChange={handleContentChange}
                            />
                        {errors.content && <p style={{ color: "red", fontSize: "20px", margin: "0 0 30px 0" }}>{errors.content}</p>}
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
