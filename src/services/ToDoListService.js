import axios from "axios";

const TODO_LIST_API_BASE_URL = "http://localhost:8080/toDoLists";

class ToDoListService {

    getAllToDoLists() {
        return axios.get(TODO_LIST_API_BASE_URL);
    }

}

export default new ToDoListService()