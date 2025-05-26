<script setup lang="ts">
import { useAppStore } from '../stores/appStore';
import EventCard from '../components/EventCard.vue';
import EditEvent from '../components/EditEvent.vue';
import { ref } from 'vue';

const appStore = useAppStore()

const editMode = ref(false)

function close() {
  editMode.value = false
}

</script>
<template>
  <div  v-if="appStore.eventFromRouter" >
    <div v-if="!editMode">
      <EventCard :event="appStore.eventFromRouter"/>
      <button @click="editMode = !editMode">Edit</button>
    </div>
    <div v-else>
      <EditEvent :event="appStore.eventFromRouter" @close="close"/>
    </div>
  </div>
  <div v-else>Cannot find event</div>
</template>