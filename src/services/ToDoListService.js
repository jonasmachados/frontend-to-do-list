import axios from "axios";

const TODO_LIST_API_BASE_URL = "http://localhost:8080/toDoLists";

class ToDoListService {

    getAllToDoLists() {
        return axios.get(TODO_LIST_API_BASE_URL);
    }

    getToDoListsById(toDoListId){
        return axios.get(TODO_LIST_API_BASE_URL + '/' + toDoListId);
    }

}

const toDoListService = new ToDoListService();

export default toDoListService;