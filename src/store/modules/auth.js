import axios from 'axios';

export default {
    state: {
        token: localStorage.getItem('token') || ''
    },
    getters: {
        isLoggedIn: state => !!state.token
    },
    mutations: {
        login_success(state, token){
            state.status = 'success';
            state.token = token;
        },
        login_error(state){
            state.status = 'error';
        },
        signup_success(state){
            state.status = 'success';
        },
        signup_error(state){
            state.status = 'error';
        }
    },
    actions: {
        LOGIN: ({commit}, payload) => {
            return new Promise((resolve, reject) => {
                axios.post(`account/login`, payload)
                .then(({data, status}) => {
                    if (status === 200) {
                        const token = data.data.token;
                        localStorage.setItem('token', token);
                        commit('login_success', token);
                        resolve(true);
                    }
                })
                .catch(error => {
                    commit('login_error');
                    localStorage.removeItem('token');
                    reject(error.response);
                });
            });
        },
        LOGIN_FACEBOOK: ({commit}, payload) => {
            console.log(payload);
            return new Promise((resolve, reject) => {
                axios.post(`account/login`, payload)
                .then(({data, status}) => {
                    if (status === 200) {
                        const token = data.data.token;
                        localStorage.setItem('token', token);
                        commit('login_success', token);
                        resolve(true);
                    }
                })
                .catch(error => {
                    commit('login_error');
                    localStorage.removeItem('token');
                    reject(error.response);
                });
            });
        },
        SIGNUP: ({commit}, payload) => {
            return new Promise((resolve, reject) => {
                axios.post(`account/register`, payload)
                .then(({data, status}) => {
                    if (status === 201) {
                        commit('signup_success', data);
                        resolve(data);
                    }
                })
                .catch(error => {
                    commit('signup_error');
                    reject(error.response);
                });
            });
        },
        SIGNUP_FACEBOOK: ({commit}, payload) => {
            console.log(payload);
            return new Promise((resolve, reject) => {
                axios.post(`account/register`, payload)
                .then(({data, status}) => {
                    if (status === 201) {
                        commit('signup_success', data);
                        resolve(data);
                    }
                })
                .catch(error => {
                    commit('signup_error');
                    reject(error.response);
                });
            });
        }
    }
}