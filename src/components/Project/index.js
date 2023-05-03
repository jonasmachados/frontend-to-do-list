import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import "./styles.css"
import ToDoListService from '../../services/ToDoListService'
import moment from 'moment';
import { BsCalendar2Plus } from "react-icons/bs";
import ModalComponent from "../Modal/ModalComponent";
import toDoListService from '../../services/ToDoListService';
import * as yup from 'yup';

const schema = yup.object().shape({
    title: yup
        .string()
        .required("Erro: Necessário preencher o titulo!")
        .min(3, "Erro: O titulo deve ter mais que 3 caracteres!")
        .max(50, "Erro: O titulo deve ter menos que 50 caracteres!"),
    content: yup
        .string()
        .required("Erro: Necessário preencher o conteúdo!")
        .min(3, "Erro: O conteúdo do projeto deve ter mais que 3 caracteres!")
        .max(500, "Erro: O conteúdo do projeto deve ter menos que 50 caracteres!")
});

const Project = () => {

    const { id } = useParams();

    const [name, setName] = useState('')
    const [dateInitial, setDateInitial] = useState('')
    const [listTasks, setListTasks] = useState('')
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [taskStatus, setTaskStatus] = useState('NOT_STARTED')
    const [showModal, setShowModal] = useState(false);
    const [titleError, setTitleError] = useState("");
    const [contentError, setContentError] = useState("");

    const formattedDate = moment(dateInitial).format('DD/MM/YYYY');
   
    const newTask = { title, content, taskStatus, dateInitial: new Date().toISOString() };

    async function validate() {
        try {
            await schema.validate(newTask, { abortEarly: false });
            setTitleError("");
            setContentError("");
            return true;
        } catch (err) {
            err.inner.forEach((e) => {
                if (e.path === "title") setTitleError(e.message);
                if (e.path === "content") setContentError(e.message);
            });
            return false;
        }
    }

    const handleTitleChange = (event) => {
        setTitle(event.target.value);
        setTitleError("");
    };

    const handleContentChange = (event) => {
        setContent(event.target.value);
        setContentError("");
    };


    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);
    const handleSaveModal = async (e) => {

        e.preventDefault();

        if (!(await validate())) return;

        toDoListService.addTaskToList(id, newTask).then((response) => {
            setListTasks([...listTasks, response.data]);
        }).catch(error => {
            console.log(error)
        })

        setTitle('');
        setContent('');
        handleCloseModal();
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

            <h2>{name} : {formattedDate}</h2>

            <ul className='menu-task'>
                <li className='NOT_STARTED'>Not Started</li>
                <li className='IN_PROGRESS'>In Progress</li>
                <li className='COMPLETED'>Completed</li>
            </ul>

            <ol className="task-list overlay">

                <li className="box-list main" variant="primary" onClick={handleShowModal}>
                    <span className="name">Nova tarefa</span>
                    <span className="icon"><BsCalendar2Plus /></span>
                </li>
                <ModalComponent
                    show={showModal}
                    handleClose={handleCloseModal}
                    handleSave={handleSaveModal}
                    title="Novo Projeto"
                    backdropClassName="custom-backdrop"
                    body={
                        <div>
                            <div>
                                <input
                                    type="text"
                                    placeholder="Titlo"
                                    name="title"
                                    value={title}
                                    onChange={handleTitleChange}                                >
                                </input>
                                {titleError && <p style={{ color: "red", fontSize: "20px", margin: "0 0 30px 0"}}>{titleError}</p>}

                            </div>

                            <div>
                                <input
                                    type="text"
                                    placeholder="Conteúdo"
                                    name="content"
                                    value={content}
                                    onChange={handleContentChange}
                                >
                                </input>
                                {contentError && <p style={{ color: "#ff0000", fontSize: "20px", margin: "0 0 30px 0" }}>{contentError}</p>}

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

                {listTasks && listTasks.map((index) => (
                    <li className={`box-list ${index.taskStatus}`} key={index.id}>
                        <span className="title">{index.title}</span>
                        <span className="dateInitial"><span style={{ color: '#fff' }}>Iniciado em: </span> {moment(index.dateInitial).format('DD/MM/YYYY')}</span>
                        <span className="taskStatus"><span style={{ color: '#fff' }}>Status:  </span>{index.taskStatus}</span>
                        <span className="content"><span style={{ color: '#fff' }}>Comentatios: </span> {index.content}</span>
                    </li>
                ))}</ol>

        </div>
    )
}

export default Project;