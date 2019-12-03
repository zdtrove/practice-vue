import axios from 'axios';

export default {
    state: {
        token: localStorage.getItem('token') || ''
    },
    getters: {
        isLoggedIn: state => !!state.token
    },
    mutations: {
        auth_success(state, token) {
            state.status = 'success';
            state.token = token;
        },
        auth_error(state) {
            state.status = 'error';
        },
        logout_success(state) {
            state.token = '';
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
                        commit('auth_success', token);
                        resolve(true);
                    }
                })
                .catch(error => {
                    commit('auth_error');
                    localStorage.removeItem('token');
                    reject(error.response);
                });
            });
        },
        LOGIN_FACEBOOK: ({commit}, payload) => {
            return new Promise((resolve, reject) => {
                axios.post(`account/login`, payload)
                .then(({data, status}) => {
                    if (status === 200) {
                        const token = data.data.token;
                        localStorage.setItem('token', token);
                        commit('auth_success', token);
                        resolve(true);
                    }
                })
                .catch(error => {
                    commit('auth_error');
                    localStorage.removeItem('token');
                    reject(error.response);
                });
            });
        },
        LOGIN_GOOGLE: ({commit}, payload) => {
            return new Promise((resolve, reject) => {
                axios.post(`account/login`, payload)
                .then(({data, status}) => {
                    if (status === 200) {
                        const token = data.data.token;
                        localStorage.setItem('token', token);
                        commit('auth_success', token);
                        resolve(true);
                    }
                })
                .catch(error => {
                    commit('auth_error');
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
                        commit('auth_success', data);
                        resolve(data);
                    }
                })
                .catch(error => {
                    commit('auth_error');
                    reject(error.response);
                });
            });
        },
        SIGNUP_FACEBOOK: ({commit}, payload) => {
            return new Promise((resolve, reject) => {
                axios.post(`account/register`, payload)
                .then(({data, status}) => {
                    if (status === 201) {
                        const token = data.data.token;
                        localStorage.setItem('token', token);
                        commit('auth_success', token);
                        resolve(data);
                    }
                })
                .catch(error => {
                    commit('auth_error');
                    reject(error.response);
                });
            });
        },
        SIGNUP_GOOGLE: ({commit}, payload) => {
            return new Promise((resolve, reject) => {
                axios.post(`account/register`, payload)
                .then(({data, status}) => {
                    if (status === 201) {
                        const token = data.data.token;
                        localStorage.setItem('token', token);
                        commit('auth_success', token);
                        resolve(data);
                    }
                })
                .catch(error => {
                    commit('auth_error');
                    reject(error.response);
                });
            });
        },
        LOGOUT: ({commit}, payload) => {
            return new Promise((resolve, reject) => {
                axios.get(`account/logout`, payload)
                .then(({data, status}) => {
                    if (status === 200) {
                        commit('logout_success');
                        localStorage.removeItem('token');
                        resolve(data);
                    }
                })
                .catch(error => {
                    reject(error.response);
                });
            });
        },
        LOGOUT_EXPIRED: ({commit}) => {
            return new Promise((resolve) => {
                commit('logout_success');
                localStorage.removeItem('token');
                resolve(true);
            });
        },
    }
}