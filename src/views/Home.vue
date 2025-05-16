<script setup lang="ts">
import { useAppStore } from '@/stores/appStore';
import EventCard from '@/components/EventCard.vue';
import { computed } from 'vue';

const appStore = useAppStore()

const conference = computed(() => appStore.conference)
</script>

<template>
  <main>
    <div v-if="conference">
      <h1>
        {{ conference.fields.title.value }}
      </h1>
      <h3>{{ conference.fields.start.value }} - {{ conference.fields.end.value }}</h3>
      <h3>{{ conference.fields.description.value }}</h3>
      <RouterLink to="/create/event">Create Event</RouterLink>
      <br><br>
    </div>
    <div>
      <h2>Events</h2>
      <div v-for="event of appStore.events">
        <EventCard :event="event"></EventCard>
      </div>
    </div>
  </main>
</template>
