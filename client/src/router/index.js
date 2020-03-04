import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import Workouts from '../views/Workouts.vue'
import CreateWorkout from '../views/CreateWorkout.vue'
import EditWorkout from '../views/EditWorkout.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/workouts',
    name: 'Workouts',
    component: Workouts
  },
  {
    path: '/workouts/create',
    name: 'Workouts-create',
    component: CreateWorkout
  },
  {
    path: '/workouts/edit/:id',
    name: 'Workouts-edit',
    component: EditWorkout
  },
  {
    path: '/workouts/edit',
    redirect: '/'
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
