import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        tasks: [],
        userTasks: [],
        teams: [],
        user: null,
        isAuthenticated: false
    },
    mutations: {
        setTasks(state, payload) {
            state.tasks = payload;
        },
        setUserTasks(state, payload) {
            state.userTasks = payload;
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
                       initials: firstName[0] + lastName[0]
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
        addTasks({ state }, task) {
            console.log('Task: ', task);
            firebase.firestore().collection('users').doc(state.user.user.uid).collection('tasks').add(task);
        },
        addTeams({ state }, team) {
            firebase.firestore().ref('users').child(state.user.user.uid).push(team);
        },
        editTasks({ commit }, task) {
            firebase.firestore().collection('users').doc(state.user.user.uid).collection('tasks').set(task)
                .then(tasks => {
                commit('setTasks', tasks);
                })
                .catch(err => console.log('Edittask Error: ', err.message))
        },
        editTeams({ commit }, payload) {
            firebase.firestore().collection('teams').set(payload)
                .then(team => {
                    commit('setTeams', team);
                })
                .catch(err => console.log('Editteam Error: ', err.message))
        },
        getUserTasks({ state, commit }) {
            firebase.firestore().collection('users').doc(state.user.user.uid).collection('tasks').once('value', snapshot => {
                    commit('setUserTasks', snapshot.val())
            })
        }
    },
    getters: {
        isAuthenticated:  state => state.isAuthenticated  
    }
});