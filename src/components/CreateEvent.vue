<script setup lang="ts">
import { useAppStore } from '../stores/appStore';
import { computed, ref } from 'vue';
import {  useRouter } from 'vue-router';

const router = useRouter()
const appStore = useAppStore()

const title = ref('')
const description = ref('')
const organizer = ref('')
const start = ref('2025-05-15')
const end = ref('2025-05-16')

function createEvent() {
  appStore.createEvent(
    title.value,
    description.value,
    organizer.value,
    start.value.toString(),
    end.value.toString()
  )
  router.push("/")
}

const disableCreate = computed(() => {
  if(end.value <= start.value) {
    return "Start time must be before End"
  }

  return null
})
</script>
<template>
  <main>
<div>
    <h2>Create Event</h2>
    <form @submit.prevent="createEvent">
      <div class="default-form">
        <label for="">Title</label><input v-model="title" required>
        <label for="">Description</label><input v-model="description" required>
        <label for="">Organizer (you)</label><input v-model="organizer">
        <label for="">Start</label><input type="datetime-local" v-model="start" required>
        <label for="">End</label><input type="datetime-local" v-model="end" required>
      </div>
      <button :disabled="disableCreate != null">Create</button>
    </form>
    <div v-if="disableCreate">
      {{ disableCreate }}
    </div>
  </div>
</main>
</template>