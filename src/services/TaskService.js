import axios from "axios";

const TASK_API_BASE_URL = process.env.REACT_APP_TASK_API_BASE_URL ?? "http://localhost:8080/task";

class TaskService {

    updateTask(taskId, task) {
        return axios.put(TASK_API_BASE_URL + '/' + taskId, task);
    }

}

const taskService = new TaskService();

export default taskService;