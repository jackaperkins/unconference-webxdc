<script setup lang="ts">
import { useAppStore } from '../stores/appStore';
import EventCard from '../components/EventCard.vue';
import EditEvent from '../components/EditEvent.vue';
import { ref } from 'vue';
import { DataType } from '../p2p/operation';

import { useRouter } from 'vue-router'

const appStore = useAppStore()
const router = useRouter()

const mode = ref<'display' | 'edit' | 'delete'>('display')

function close() {
  mode.value = 'display'
}

function deleteEvent() {
  if (appStore.eventFromRouter) {
    appStore.deleteDate(DataType.EVENT, appStore.eventFromRouter.id)
    router.push('/')
  }
}

</script>
<template>
  <div v-if="appStore.eventFromRouter">
    <div v-if="mode == 'display'">
      <EventCard :event="appStore.eventFromRouter" />
      <div class="button-group">
        <button @click="mode = 'edit'">Edit</button>
        <button @click="mode = 'delete'">Delete</button>
      </div>
    </div>
    <div v-if="mode == 'edit'">
      <EditEvent :event="appStore.eventFromRouter" @close="close" />
    </div>
    <div v-if="mode == 'delete'">
      Really Delete event?
      <div class="button-group">
        <button @click="deleteEvent" class="red">Delete</button>
        <button @click="close">Cancel</button>
      </div>
    </div>
  </div>
  <div v-else>Cannot find event</div>
</template>