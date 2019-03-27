import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';

Vue.use(Vuex);

export default new Vuex.Store({
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
        userSignup({ commit }, { email, password, firstName, lastName }) {
            firebase.auth()
                .createUserWithEmailAndPassword(email, password)
                .then(user => {
                    commit('setUser', user);
                    commit('setIsAuthenticated', false);
                })
                .then(resp => 
                    firebase.firestore.collection('users').doc(resp.user.uid).set({
                        firstName: resp.user.firstName,
                        lastName: resp.user.lastName,
                        fullName: resp.user.firstName + resp.user.lastName
                    })
                )
                .catch(err => err.message)
        },
        userLogin({ commit }, { email, password }) {
            firebase.auth()
                .signInWithEmailAndPassword(email, password)
                .then(user => {
                    commit('setUser', user);
                    commit('setIsAuthenticated', true);})
                .catch(err => err.message)
        },
        userSignout({ commit }) {
            firebase.auth()
                .signOut()
                .then(() => {
                    commit('setUser', null);
                    commit('setIsAuthenticated', false);
                })
                .catch(err => err.message)
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