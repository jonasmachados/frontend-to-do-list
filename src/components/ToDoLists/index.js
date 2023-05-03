import React, { useState, useEffect } from "react";
import toDoListService from '../../services/ToDoListService'
import { format, parseISO } from "date-fns";
import { BsCalendar2Plus } from "react-icons/bs";
import "./styles.css";
import { useNavigate } from 'react-router-dom';
import ModalComponent from "../Modal/ModalComponent";
import * as yup from 'yup';

const schema = yup.object().shape({
    name: yup
        .string()
        .required("Erro: Necessário preencher o nome do projeto!")
        .min(3, "Erro: O nome do projeto deve ter mais que 3 caracteres!")
        .max(50, "Erro: O nome do projeto deve ter menos que 50 caracteres!")
});

const ToDoLists = () => {

    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [toDoList, setToDoList] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [nameError, setNameError] = useState("");

    const newToDoList = { name, dateInitial: new Date().toISOString() };

    async function validate() {
        try {
            await schema.validate(newToDoList, { abortEarly: false });
            setNameError("");
            return true;
        } catch (err) {
            err.inner.forEach((e) => {
                if (e.path === "name") setNameError(e.message);
            });
            return false;
        }
    }

    const handleNameChange = (event) => {
        setName(event.target.value);
        setNameError("");
    };

    const handleCloseModal = () => setShowModal(false);
    const handleShowModal = () => setShowModal(true);
    const handleSaveModal = async (e) => {

        e.preventDefault();

        if (!(await validate())) return;

        toDoListService.createToDoList(newToDoList).then((response) => {
            window.location.href = `/project/${response.data.id}`;
            getAllToDoLists();
        }).catch(error => {
            console.log(error)
        })

        setName('');
        handleCloseModal();
    };

    useEffect(() => {
        getAllToDoLists();
    }, []);

    const getAllToDoLists = () => {
        toDoListService.getAllToDoLists()
            .then((response) => {
                setToDoList(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleClick = (toDoListID) => {
        navigate('/project/' + toDoListID);
    };

    return (
        <div className="container-to-do-lists">
            <h1>Visualize todas as suas tarefas em um só lugar e adicione novas facilmente com apenas um clique.</h1>

            <ol className="project-list overlay">
                <li className="to-do-list" variant="primary" onClick={handleShowModal}>
                    <span className="name">Novo projeto</span>
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
                                <label>Projeto: </label>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    name="name"
                                    value={name}
                                    onChange={handleNameChange}
                                >
                                </input>
                                {nameError && <p style={{ color: "#ff0000", fontSize: "20px" }}>{nameError}</p>}

                            </div>

                        </div>
                    }
                />

                {toDoList.map((toDoList) => (
                    <li className="to-do-list" key={toDoList.id} onClick={() => handleClick(toDoList.id)} >
                        <span className="name">{toDoList.name}</span>
                        <span className="date">Iniciado em {format(parseISO(toDoList.dateInitial), 'dd/MM/yyyy')}</span>
                    </li>
                ))}</ol>


        </div>
    )
}

export default ToDoLists;