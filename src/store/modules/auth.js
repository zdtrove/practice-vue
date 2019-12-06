import axios from 'axios';

export default {
    state: {
        token: localStorage.getItem('token') || '',
        status: false,
        forget_password: {
            status: false
        },
        create_new_password: {
            status: false
        },
        active: {
            status: false,
            message: ''
        }
    },
    getters: {
        isLoggedIn: state => !!state.token,
        isActive: state => state.active
    },
    mutations: {
        auth_success(state, status) {
            state.status = status;
        },
        auth_success_social(state, params) {
            state.status = params.status;
            state.token = params.token;
        },
        auth_error(state, status) {
            state.status = status;
        },
        logout_success(state) {
            state.token = '';
        },
        forget_password(state, status) {
            state.forget_password.status = status;
        },
        create_new_password(state, status) {
            state.create_new_password = status;
        },
        active_account(state, params) {
            state.active.status = params.status;
            state.active.message = params.message;
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
                        commit('auth_success_social', { token: token, status: true });
                        resolve(true);
                    }
                })
                .catch(error => {
                    commit('auth_error', false);
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
                        commit('auth_success', true);
                        resolve(data);
                    }
                })
                .catch(error => {
                    commit('auth_error', false);
                    reject(error.response);
                });
            });
        },
        SIGNUP_SOCIAL: ({commit}, payload) => {
            return new Promise((resolve, reject) => {
                axios.post(`account/register`, payload)
                .then(({data, status}) => {
                    if (status === 201) {
                        const token = data.data.token;
                        localStorage.setItem('token', token);
                        commit('auth_success_social', { token: token, status: true });
                        resolve(data);
                    }
                })
                .catch(error => {
                    commit('auth_error', false);
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
        FORGET_PASSWORD: ({commit}, payload) => {
            return new Promise((resolve, reject) => {
                axios.post(`account/forget-password`, payload)
                .then(({data, status}) => {
                    if (status === 201) {
                        commit('forget_password', true);
                        resolve(data);
                    }
                })
                .catch(error => {
                    commit('forget_password', false);
                    reject(error.response);
                });
            });
        },
        CREATE_NEW_PASSWORD: ({commit}, payload) => {
            return new Promise((resolve, reject) => {
                axios.post(`account/create-new-password`, payload)
                .then(({data, status}) => {
                    if (status === 201) {
                        commit('create_new_password', true);
                        resolve(data);
                    }
                })
                .catch(error => {
                    commit('create_new_password', false);
                    reject(error.response);
                });
            });
        },
        ACTIVE_ACCOUNT: ({commit}, payload) => {
            return new Promise((resolve, reject) => {
                axios.post(`account/active`, payload)
                .then(({data, status}) => {
                    if (status === 201) {
                        commit('active_account', {status: true, message: data.data.message});
                        resolve(data);
                    }
                })
                .catch(error => {
                    commit('active_account', true, '');
                    reject(error.response);
                });
            });
        }
    }
}