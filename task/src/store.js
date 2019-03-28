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
        userSignup({}, { email, password, firstName, lastName }) {
            firebase.auth()
                .createUserWithEmailAndPassword(email, password)
                .then(cred => {
                    firebase.firestore().collection('users').doc(cred.user.uid).set({
                       firstName: firstName,
                       lastName: lastName,
                       fullName: firstName[0] + lastName[0]
                    });
                })
                .catch(err => console.log('Signup Error: ',err.message))
        },
        userLogin({ commit }, { email, password }) {
            firebase.auth()
                .signInWithEmailAndPassword(email, password)
                .then(user => {
                    commit('setUser', user);
                    commit('setIsAuthenticated', true);})
                .catch(err => console.log('Login Error: ', err.message))
        },
        userSignout({ commit }) {
            firebase.auth()
                .signOut()
                .then(() => {
                    commit('setUser', null);
                    commit('setIsAuthenticated', false);
                })
                .catch(err => console.log('Logout Error: ', err.message))
        },
        addTasks({ state }, payload) {
            firebase.firestore().ref('users').child(state.user.user.uid).push(payload.tasks.label);
            firebase.firestore().collection('tasks').add(task)
        },
        addTeams({ state }, payload) {
            firebase.firestore().ref('users').child(state.user.user.uid).push(payload.teams.label);
            firebase.firestore().collection('tasks').add(task);
        }
    },
    getters: {
        isAuthenticated:  state => state.isAuthenticated  
    }
});