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
        setMembers(state, payload) {
            state.teams.members = payload;
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
                .catch(err => console.log('Signup Error: ',err.message));
        },
        userLogin({ commit }, { email, password }) {
            auth
                .signInWithEmailAndPassword(email, password)
                .then(user => {
                    commit('setUser', user);
                    commit('setIsAuthenticated', true);})
                .catch(err => console.log('Login Error: ', err.message));
        },
        userSignout({ commit }) {
            auth
                .signOut()
                .then(() => {
                    commit('setUser', null);
                    commit('setIsAuthenticated', false);
                })
                .catch(err => console.log('Logout Error: ', err.message));
        },
        addTasks({ state }, task) {
            db.collection('users').doc(state.user.user.uid).collection('tasks').add(task);
        },
        addTeams({}, team) {
            db.collection('teams').add(team);
        },
        addMembers({ state }, member) {
            console.log('Member: ', member);
            db.collection('members').doc(state.teams.id).collection('members').add(member);
        },
        editTasks({ state }, task) {
            db.collection('users').doc(state.user.user.uid).collection('tasks').doc(state.tasks.id).set(task);
        },
        editTeams({}, team) {
            db.collection('teams').doc(state.teams.id).set(team);
        },
        editMembers({ state }, member) {
            db.collection('teams').doc(state.teams.id).collection('members').doc(state.members.id).set(member);
        },
        deleteTasks({ state } ) {
            db.collection('tasks').doc(state.tasks.id).delete()
        },
        deleteMembers({ state } ) {
            db.collection('teams').doc(state.teams.id).collection('members').doc(state.members.id).delete()
        },
        getTasks({ state, commit }) {
            db.collection('users').doc(state.user.user.uid).collection('tasks').get()
                .then(res => {
                    const changes = res.docChanges();   

                    return changes.map(change => {
                        let docId= change.doc.id;
                        let tasks = {};

                        if(change.type === 'added') {
                            return tasks = {
                                ...change.doc.data(),
                                id: docId
                            };
                        }
                        if(change.type === 'modified') {
                            return tasks.map(task => task.id = change.doc.id);
                        }
                        if(change.type === 'removed') {
                            return tasks.filter(task => task.id !== change.doc.id);
                        }   
                    })
                })
                .then(task => {
                    commit('setTasks', task);
                    console.log(task);
                }).catch(err => console.log('Gettask Error: ', err.message))   
        },
        getTeams({ commit }) {
            db.collection('teams').get()
                .then(res => {
                    const changes = res.docChanges();   

                    return changes.map(change => {
                        let docId= change.doc.id;
                        let teams = {};

                        if(change.type === 'added') {
                            return teams = {
                                ...change.doc.data(),
                                id: docId
                            };
                        }
                        if(change.type === 'modified') {
                            return teams.map(team => team.id = change.doc.data());
                        }
                        if(change.type === 'removed') {
                            return teams.filter(team => team.id !== change.doc.id);
                        }    
                    })
                })
                .then(team => {
                    commit('setTeams', team);
                    console.log(team);
                }).catch(err => console.log('Getteam Error: ', err.message))   
        },
        getMembers({ state, commit }) {
            db.collection('teams').doc(state.teams.id).collection('members').get()
                .then(res => {
                    const changes = res.docChanges();   

                    return changes.map(change => {
                        let docId= change.doc.id;
                        let members = {};

                        if(change.type === 'added') {
                            return members = {
                                ...change.doc.data(),
                                id: docId
                            };
                        }
                        if(change.type === 'modified') {
                            return members.map(member => member.id = change.doc.data());
                        }
                        if(change.type === 'removed') {
                            return members.filter(member => member.id !== change.doc.id);
                        }   
                    })
                })
                .then(member => {
                    commit('setMembers', member);
                    console.log(member);
                }).catch(err => console.log('Getmember Error: ', err.message))   
        }
    },
    getters: {
        isAuthenticated:  state => state.isAuthenticated  
    }
});