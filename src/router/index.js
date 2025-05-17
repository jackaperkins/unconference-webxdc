import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import CreateEvent from '@/components/CreateEvent.vue'
import NotFound from '@/views/NotFound.vue'
import EventFocus from '@/views/EventFocus.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      meta: {
        title: 'Home'
      },
      component: Home,
    },
    {
      path: '/create/event',
      name: 'createEvent',
      meta: {
        title:'Create Event'
      },
      component: CreateEvent
    },
    {
      path: '/event/:id',
      name: 'eventFocus',
      meta: {
        title: 'Event'
      },
      component: EventFocus
    },
    {
      path: '/:pathMatch(.*)*',
      component: NotFound
    }
  ],
})

export default router
