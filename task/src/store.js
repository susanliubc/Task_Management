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
        members: [],
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
            console.log('Task: ', task);
            db.collection('users').doc(state.user.user.uid).collection('tasks').add(task);
        },
        addTeams({}, team) {
            db.collection('teams').add(team);
        },
        addMembers({ state }, member) {
            console.log('Member: ', member);
            db.collection('members').doc(state.teams.team.id).collection('members').add(member);
        },
        editTasks({ state }, task) {
            db.collection('users').doc(state.user.user.uid).collection('tasks').doc(state.tasks.task.id).set(task);
        },
        editTeams({}, team) {
            db.collection('teams').doc(state.teams.team.id).set(team);
        },
        editMembers({ state }, member) {
            db.collection('teams').doc(state.teams.team.id).collection('members').doc(state.members.member.id).set(member);
        },
        deleteTasks({ state } ) {
            db.collection('tasks').doc(state.tasks.task.id).delete()
        },
        deleteMembers({ state } ) {
            db.collection('teams').doc(state.teams.team.id).collection('members').doc(state.members.member.id).delete()
        },
        getTasks({ state, commit }) {
            db.collection('users').doc(state.user.user.uid).collection('tasks').get()
                .then(res => {
                    const changes = res.docChanges();   

                    return changes.map(change => {
                        let docId= change.doc.id;
                        let tasks = [];

                        if(change.type === 'added') {
                            tasks.push({
                                ...change.doc.data(),
                                id: docId
                            });
                            
                        }
                        if(change.type === 'modified') {
                            tasks.map(task => task.docId = change.doc.data());
                        }
                        if(change.type === 'removed') {
                            tasks.filter(task => task.id !== change.doc.id);
                        }   
                        return tasks;  
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
                        let teams = [];

                        if(change.type === 'added') {
                            teams.push({
                                ...change.doc.data(),
                                id: docId
                            });
                            
                        }
                        if(change.type === 'modified') {
                            teams.map(team => team.docId = change.doc.data());
                        }
                        if(change.type === 'removed') {
                            teams.filter(team => team.id !== change.doc.id);
                        }   
                        return teams;  
                    })
                })
                .then(team => {
                    commit('setTeams', team);
                    console.log(team);
                }).catch(err => console.log('Getteam Error: ', err.message))   
        },
        getMembers({ state, commit }) {
            db.collection('teams').doc(state.teams.team.id).collection('members').get()
                .then(res => {
                    const changes = res.docChanges();   

                    return changes.map(change => {
                        let docId= change.doc.id;
                        let members = [];

                        if(change.type === 'added') {
                            tasks.push({
                                ...change.doc.data(),
                                id: docId
                            });
                            
                        }
                        if(change.type === 'modified') {
                            members.map(member => member.docId = change.doc.data());
                        }
                        if(change.type === 'removed') {
                            members.filter(member => member.id !== change.doc.id);
                        }   
                        return members;  
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