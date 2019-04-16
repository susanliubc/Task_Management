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
            state.members = payload;
        },
        setUser(state, payload) {
            state.user = payload;
        },
        setIsAuthenticated(state, payload) {
            state.isAuthenticated = payload;
        }
    },
    actions: {
        userSignup({commit}, { email, password, firstName, lastName }) {
            auth
                .createUserWithEmailAndPassword(email, password)
                .then(cred => {
                    db.collection('users').doc(cred.user.uid).set({
                       firstName: firstName,
                       lastName: lastName,
                       fullName: firstName + ' ' + lastName
                    });
                    console.log('cred: ', cred);
                    commit('setUser', cred);
                })
                .catch(err => console.log('Signup Error: ',err.message));
        },
        userLogin({ commit }, { email, password }) {
            auth
                .signInWithEmailAndPassword(email, password)
                .then(user => {  
                    db.collection('users').doc(user.user.uid).get()
                        .then(doc => {
                            const user = {...doc.data(), id:doc.id};
                            commit('setUser', user);
                            commit('setIsAuthenticated', true);
                            console.log('user: ', user);
                        }) 
                })   
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
        Login({ commit }) {
            commit('setIsAuthenticated', true);
        },
        addTasks({}, task) {
            db.collection('tasks').add(task);
        },
        addTeams({}, teamName) {
            db.collection('teams').add(teamName);
        },
        addMembers({}, { member }) {
            console.log('Member: ', member);
            db.collection('members').add(member);
        },
        editTasks({}, { task, id }) {
            db.collection('tasks').doc(id).set(task.task)
                .then(() => console.log("Task successfully edited!"))
                .catch(err => console.log('Edittask Error: ', err.message)) 
        },
        editTeams({}, { team, id }) {
            db.collection('teams').doc(id).set(team)
                .then(() => console.log("Team successfully edited!"))
                .catch(err => console.log('Editteam Error: ', err.message))
        },
        editMembers({}, { member, id }) {
            db.collection('members').doc(id).set(member)
                .then(() => console.log("Member successfully edited!"))
                .catch(err => console.log('Editmember Error: ', err.message));
        },
        deleteTasks({}, id) {
            console.log('store id: ', id);
            db.collection('tasks').doc(id).delete()
                .then(() => console.log("Task successfully deleted!"))
                .catch(error => console.error("Deletetask Error: ", error))
        },
        deleteTeams( {}, id ) {
            db.collection('teams').doc(id).delete()
                .then(() => console.log("Team successfully deleted!"))
                .catch(error => console.error("Deleteteam Error: ", error))
        },
        deleteMembers( {}, { id }) {
            db.collection('members').doc(id).delete()
                .then(() => console.log("Member successfully deleted!"))
                .catch(error => console.error("Deletemember Error: ", error))
        },
        getTasks({ commit }) {
            db.collection('tasks').get().then(res => {
                    let changes = res.docChanges();   

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
                            return tasks.map(task => 
                                task.id === docId ? task.task = change.doc.data(): task    
                            );
                        }
                        if(change.type === 'removed') {
                            return tasks.filter(task => task.id !== docId);
                        }   
                        console.log('tasks: ', tasks);  
                    })
                })
                .then(task => {
                    commit('setTasks', task);
                    console.log(task);
                })
                .catch(err => console.log('Gettask Error: ', err.message))
        },
        getTeams({ commit }) {
            db.collection('teams').get()
                .then(res => {
                    let changes = res.docChanges();   

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
                            return teams.map(team => 
                                team.id === docId ? team.team = change.doc.data(): team    
                            );
                        }
                        if(change.type === 'removed') {
                            return teams.filter(team => team.id !== docId);
                        }   
                        console.log('teams: ', teams);   
                    })
                })
                .then(team => {
                    commit('setTeams', team);
                    console.log(team);
                }).catch(err => console.log('Getteam Error: ', err.message))   
        },
        getMembers({ commit }) {
            db.collection('members').get()
                .then(res => {
                    let changes = res.docChanges();   

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
                            return members.map(member => 
                                member.id === docId ? member.member = change.doc.data(): member    
                            );
                        }
                        if(change.type === 'removed') {
                            return members.filter(member => member.id !== docId);
                        }   
                        console.log('members: ', members);  
                    })
                })
                .then(member => {
                    commit('setMembers', member);
                    console.log('member: ', member);
                }).catch(err => console.log('Getmember Error: ', err.message))   
        }
    },
    getters: {
        isAuthenticated:  state => state.isAuthenticated,
        //isAuthenticated:  state => state.user !== null || state.user !== undefined,
        user: state => state.user
    }
});