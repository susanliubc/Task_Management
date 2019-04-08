import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from './views/Dashboard.vue';
import Tasks from './views/Tasks.vue';
import Team from './views/Team.vue';
import store from './store';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: Dashboard,
      meta: {
        requiresAuth: true
      }
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
});

router.beforeEach((to, from, next) => {
  //check for requiresAuth guard
  if(to.matched.some(record => record.meta.requiresAuth)) {
    //check if not logged in
    if(!store.state.isAuthenticated) {
      //go to login
      next({
        path: '/login'
      });
      //proceed to route
    } else {
      next();
    }
    //proceed to route
  } else {
    next();
  }
});

export default router;
