import Vue from 'vue';
import Vuex from 'vuex';
import firebase from 'firebase';

Vue.use(Vuex);

const auth = firebase.auth();
const db = firebase.firestore();

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
            auth
                .createUserWithEmailAndPassword(email, password)
                .then(cred => {
                    db.collection('users').doc(cred.user.uid).set({
                       firstName: firstName,
                       lastName: lastName,
                       initials: firstName[0] + lastName[0]
                    });
                })
                .catch(err => console.log('Signup Error: ',err.message))
        },
        userLogin({ commit }, { email, password }) {
            auth
                .signInWithEmailAndPassword(email, password)
                .then(user => {
                    commit('setUser', user);
                    commit('setIsAuthenticated', true);})
                .catch(err => console.log('Login Error: ', err.message))
        },
        userSignout({ commit }) {
            auth
                .signOut()
                .then(() => {
                    commit('setUser', null);
                    commit('setIsAuthenticated', false);
                })
                .catch(err => console.log('Logout Error: ', err.message))
        },
        addTasks({ state }, task) {
            console.log('Task: ', task);
            db.collection('users').doc(state.user.user.uid).collection('tasks').add(task)
        },
        addTeams({ state }, team) {
            db.ref('users').child(state.user.user.uid).push(team)
        },
        editTasks({ state }, task) {
            db.collection('users').doc(state.user.user.uid).collection('tasks').set(task)
        },
        editTeams({ commit }, payload) {
            db.collection('teams').set(payload)
                .then(team => {
                    commit('setTeams', team);
                })
                .catch(err => console.log('Editteam Error: ', err.message))
        },
        getTasks({ state, commit }) {
            db.collection('users').doc(state.user.user.uid).collection('tasks').onSnapshot(res => {
                const changes = res.docChanges();   

                changes.forEach(change => {
                    let docId= change.doc.id;
                    let tasks = [];

                    if(change.type === 'added') {
                        tasks.push({
                            ...change.doc.data(),
                            id: docId
                        })
                    }
                    if(change.type === 'modified') {
                        tasks.map(task => task.docId = change.doc.data());
                    }
                    if(change.type === 'removed') {
                        tasks.filter(task => task.id !== change.doc.id);
                    }  
                            
                    return tasks;
                }).then(task => {
                    commit('setTasks', task)
                }).catch(err => console.log('Gettask Error: ', err.message))   
            })
        }
    },
    getters: {
        isAuthenticated:  state => state.isAuthenticated  
    }
});