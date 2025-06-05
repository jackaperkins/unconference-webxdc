import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import CreateEvent from '@/components/CreateEvent.vue'
import NotFound from '@/views/NotFound.vue'
import EventFocus from '@/views/EventFocus.vue'
import SingleDay from '@/views/SingleDay.vue'
import About from '@/views/About.vue'
import EditConference from '@/components/EditConference.vue'

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
      path: '/edit/conference',
      name: 'editConference',
      meta: {
        title: 'Edit Conference'
      },
      component: EditConference
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
      path: '/day/:day',
      name: 'dayView',
      meta: {
        title: 'Day'
      },
      component: SingleDay
    },
    {
      path: '/about',
      name: 'about',
      meta: {
        title: 'About'
      },
      component: About
    },
    {
      path: '/:pathMatch(.*)*',
      component: NotFound
    },
  ],
})

export default router
