import axios from 'axios';
import { API_URL } from '../../constants';

const state = {
    tasks: []
};

const getters = {
    allTasks: state => state.tasks
};

const actions = {
    async fetchTasks({commit}) {
        const response = await axios.get(`${API_URL}?_limit=10`);
        commit('setTasks', response.data);
    },
    async deleteTask({commit}, id) {
        await axios.delete(`${API_URL}${id}`);
        commit('removeTask', id);
    },
    async updateTask({commit}, updTask) {
        const response = await axios.put(`${API_URL}${updTask.id}`, updTask);
        commit('updateTask', response.data);
    }
};

const mutations = {
    setTasks: (state, tasks) => (state.tasks = tasks),
    removeTask: (state, id) => state.tasks = state.tasks.filter(task => task.id !== id),
    updateTask: (state, updTask) => {
        const index = state.tasks.findIndex(task => task.id === updTask.id);
        if (index !== -1) {
            state.tasks.splice(index, 1, updTask);
        }
    }
};

export default {
    state,
    getters,
    actions,
    mutations
}