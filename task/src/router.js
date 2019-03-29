import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from './views/Dashboard.vue';
import Tasks from './views/Tasks.vue';
import Team from './views/Team.vue';

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard
    },
    {
      path: '/tasks',
      name: 'Tasks',
      component: Tasks,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/team',
      name: 'Team',
      component: Team,
      meta: {
        requiresAuth: true
      }
    }
  ]
})
