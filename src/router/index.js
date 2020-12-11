import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import EmployeeDetails from '../views/EmployeeDetails.vue'
import Location from '../views/Location.vue'
import Department from '../views/Department.vue'
import Skill from '../views/Skill.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/employee/:id',
    name: 'EmployeeDetails',
    component: EmployeeDetails
  },
  {
    path: '/state/:id',
    name: 'State',
    component: Location
  },
  {
    path: '/department/:id',
    name: 'Department',
    component: Department
  },
  {
    path: '/skill/:id',
    name: 'Skill',
    component: Skill
  }
]

const router = new VueRouter({
  routes
})

export default router
