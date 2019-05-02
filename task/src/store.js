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
        currentUser: null,
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
        setCurrentUser(state, payload) {
            state.currentUser = payload;
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
        addTasks({}, { task }) {
            db.collection('tasks').add(task);
        },
        addTeams({}, { team }) {
            db.collection('teams').add(team);
        },
        addMembers({}, { member }) {
            db.collection('members').add(member);
        },
        editTasks({}, { task, id }) {
            db.collection('tasks').doc(id).set(task.task);
        },
        editTeams({}, { team, id }) {
            db.collection('teams').doc(id).set(team);
        },
        editMembers({}, { member, id }) {
            db.collection('members').doc(id).set(member);
        },
        deleteTasks({}, { id }) {
            console.log('store id: ', id);
            db.collection('tasks').doc(id).delete();
        },
        deleteTeams({}, { id }) {
            db.collection('teams').doc(id).delete()
        },
        deleteMembers({ id }) {
            console.log('before delete id: ', id);
            db.collection('members').doc(id).delete()
        },
        getTasks({ commit }) {
            db.collection('tasks').get().then(res => {
                let tasks = [];
                res.forEach(doc => {    
                    const task = {
                        ...doc.data(),
                        id: doc.id
                    };
                    return tasks.push(task);
                })
                console.log('tasks: ', tasks);
                commit('setTasks', tasks);
            }).catch(err => console.log('Gettask Error: ', err.message))
        },
        getCurrUserTasks({ state, commit }) {
            db.collection('tasks').where('memberName', '==', state.currentUser.fullName).get().then(res => {
                let tasks = [];
                res.forEach(doc => {    
                    const task = {
                        ...doc.data(),
                        id: doc.id
                    };
                    return tasks.push(task);
                })
                console.log('tasks: ', tasks);
                commit('setTasks', tasks);
            }).catch(err => console.log('Gettask Error: ', err.message))
        },
        getTeams({ commit }) {
            db.collection('teams').get().then(res => {
                let teams = [];
                res.forEach(doc => {    
                    const team = {
                        ...doc.data(),
                        id: doc.id
                    };
                    return teams.push(team);
                })
                console.log('teams: ', teams);
                commit('setTeams', teams);
            }).catch(err => console.log('Getteam Error: ', err.message))
        },
        getMembers({ commit }) {
            db.collection('members').get().then(res => {
                let members = [];
                res.forEach(doc => {    
                    const member = {
                        ...doc.data(),
                        id: doc.id
                    };
                    return members.push(member);
                })
                console.log('members: ', members);
                commit('setMembers', members);
            }).catch(err => console.log('Getmember Error: ', err.message))
        },
        getUsers({ commit }) {
            db.collection('users').get().then(res => {
                let users = [];
                res.forEach(doc => {    
                    const user = {
                        ...doc.data(),
                        id: doc.id
                    };
                    return users.push(user);
                });
                console.log('users: ', users);
                commit('setUser', users);
            }).catch(err => console.log('Getuser Error: ', err.message))
        },
        getCurrentUser({ commit }) {
            const user = auth.currentUser;
            if(user) {
                db.collection('users').doc(user.uid).get()
                .then(doc => {
                  const currentUser = {...doc.data()};
                  console.log('CurrentUser: ', currentUser);
                  commit('setCurrentUser', currentUser);
                })
                .catch(err => console.log('currentUser error', err.message))
            }
        }
    },
    getters: {
        isAuthenticated:  state => state.isAuthenticated,
        //isAuthenticated:  state => state.currentUser !== null || state.currentUser !== undefined,
    }
});