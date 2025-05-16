import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import CreateEvent from '@/components/CreateEvent.vue'
import NotFound from '@/views/NotFound.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/create/event',
      name: 'createEvent',
      component: CreateEvent
    },
    {
      path: '/:pathMatch(.*)*',
      component: NotFound
    }
  ],
})

export default router
