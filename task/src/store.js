import Vue from 'vue';
import Vuex from 'vuex';
import firebase from '@/firebase';
import router from '@/router';

Vue.use(Vuex);

export default new Vuex.store({
    state: {
        tasks: [],
        teams: [],
        user: null,
        isAuthenticated: false
    },
    mutations: {
        setTasks(state, payload) {
            state.tasks = payload;
        },
        setTeams(state, payload) {
            state.teams = payload;
        },
        setUser(state, payload) {
            state.user = payload;
        },
        setIsAuthenticated(state, payload) {
            state.isAuthenticated = payload;
        }
    },
    actions: {
        userSignup({ commit }, { email, password }) {
            firebase.auth
                .createUserWithEmailAndPassword(email, password)
                .then(user => {
                    commit('setUser', user);
                    commit('setIsAuthenticated', true);
                    signupForm.reset();
                })
                .catch(err => console.log('Error: ', err.message))
        },
        userLogin({ commit }, { email, password }) {
            firebase.auth
                .signInWithEmailAndPassword(email, password)
                .then(user => {
                    commit('setUser', user);
                    commit('setIsAuthenticated', true);
                    loginForm.reset()
                })
                .catch(err => console.log('Error: ', err.message))
        },
        userSignout({ commit }) {
            firebase.auth
                .signOut()
                .then(() => {
                    commit('setUser', null);
                    commit('setIsAuthenticated', false);
                    loginForm.reset()
                })
                .catch(err => console.log('Error: ', err.message))
        },
        addTasks({ state }, payload) {
            firebase.firestore.ref('users').child(state.user.user.uid).push(payload.tasks.label);
        },
        addTeams({ state }, payload) {
            firebase.firestore.ref('users').child(state.user.user.uid).push(payload.teams.label);
        }
    },
    getters: {
        isAuthenticated(state) {
            return state.user !== null && state.user !== undefined;
        }
    }
});