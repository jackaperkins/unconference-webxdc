<script setup lang="ts">
import { useRoute } from 'vue-router';
import { useAppStore } from '../stores/appStore';
import EventCard from '../components/EventCard.vue';
import EditEvent from '../components/EditEvent.vue';
import { Event } from '../p2p/operation';

const appStore = useAppStore()

</script>
<template>
  <div>
    <h1>
      Event
    </h1>

    <EventCard :event="appStore.eventFromRouter" v-if="appStore.eventFromRouter"/>
    <div v-else>Cannot find event</div>
    <hr>
    <div>
      <EditEvent :event="appStore.eventFromRouter"/>
    </div>
  </div>
</template>