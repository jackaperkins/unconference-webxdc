<script setup lang="ts">
import { useAppStore } from '@/stores/appStore';
import EventCard from '@/components/EventCard.vue';
import { computed, ref } from 'vue';
import { yearMonthDay } from '@/lib';

const appStore = useAppStore()

const conference = computed(() => appStore.conference)

</script>

<template>
  <header>
    <h1>
      {{ conference.fields.title.value }}
    </h1>
  </header>
  <main>
    <div v-if="conference">
      <h3>{{ conference.fields.start.value }} - {{ conference.fields.end.value }}</h3>
      <p>
        {{ conference.fields.description.value }}
      </p>
      <!-- <RouterLink :to="'/day/' + yearMonthDay(conference.fields.start.value)">First Day</RouterLink> -->
      <br>
      <br>
      <h2>Events</h2>
      <div v-for="event of appStore.events" :key="event.id">
        <EventCard :event="event" :short="true"></EventCard>
      </div>
      <div v-if="appStore.events.length === 0">No Events</div>
    </div>
  </main>
</template>
