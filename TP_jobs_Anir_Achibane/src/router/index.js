import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/HomePage.vue'
import AddJob from '../components/AddJob.vue'
import EditJob from '../components/EditJob.vue'

const routes = [
  {
    path: '/',
    component: HomePage,
  },
  {
    path: '/add', 
    component: AddJob
  },
  {
    path: '/jobs/:id',
    component: EditJob
  }
]; 

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
