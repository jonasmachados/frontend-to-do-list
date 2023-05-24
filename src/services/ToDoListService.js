import axios from "axios";

const TODO_LIST_API_BASE_URL = process.env.TODO_LIST_API_BASE_URL ?? "http://localhost:8080/toDoLists";

class ToDoListService {

    getAllToDoLists() {
        return axios.get(TODO_LIST_API_BASE_URL);
    }

    getToDoListsById(toDoListId){
        return axios.get(TODO_LIST_API_BASE_URL + '/' + toDoListId);
    }

    createToDoList(toDoList){
        return axios.post(TODO_LIST_API_BASE_URL, toDoList);
    }

    updateToDoList(toDoListId, toDoList){ 
        return axios.patch(TODO_LIST_API_BASE_URL + '/' + toDoListId, toDoList);
    }
 
    addTaskToList(toDoListId, taskData){
        return axios.post(TODO_LIST_API_BASE_URL + '/' + toDoListId + '/tasks', taskData);
    }
}

const toDoListService = new ToDoListService();

export default toDoListService;