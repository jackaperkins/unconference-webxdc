<script setup lang="ts">
import { useAppStore } from '@/stores/appStore';
import EventCard from '@/components/EventCard.vue';
import { computed, ref } from 'vue';
import EditConference from '@/components/EditConference.vue';

const appStore = useAppStore()

const conference = computed(() => appStore.conference)

const editConference = ref(false)

</script>

<template>
  <header>
    <h1>
      {{ conference.fields.title.value }}
    </h1>
  </header>
  <main>
    <div v-if="conference">
      <div v-if="editConference">
        <EditConference @close="editConference = false"/>
      </div>
      <div v-else>

        <h3>{{ conference.fields.start.value }} - {{ conference.fields.end.value }}</h3>
        <p>
          {{ conference.fields.description.value }}
        </p>
        <button @click="editConference = true">Edit Conference</button>
        <br>
        <br>
        <RouterLink to="/create/event" class="link-button">Create Event +</RouterLink>
      </div>
    </div>
    <br>
    <br>
    <h2>Events</h2>
    <div v-for="event of appStore.events" :key="event.id">
      <EventCard :event="event" :short="true"></EventCard>
    </div>
    <div v-if="appStore.events.length === 0">No Events</div>
  </main>
</template>
