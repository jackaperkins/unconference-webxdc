<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAppStore } from '../stores/appStore'
import { yearMonthDay } from '@/lib';

const appStore = useAppStore();

const title = ref('My Conference')
const description = ref('An unconference for everyone')
const start = ref(yearMonthDay(new Date()))
const end = ref(yearMonthDay(new Date()))

function createConference() {
  appStore.createConference(title.value, description.value, start.value.toString(), end.value.toString())
}

const disableCreate = computed(() => {
  if (end.value < start.value) {
    return 'Start must be before End'
  }
  return null
})

</script>
<template>
  <h2>New Conference</h2>
  <form @submit.prevent="createConference">
    <div class="default-form">
      <label for="">Title</label><br>
      <input v-model="title"><br>
      <label for="">Description</label><br>
      <input v-model="description"><br>
      <label for="">Start</label><br>
      <input type="date" v-model="start"><br>
      <label for="">End</label><br>
      <input type="date" v-model="end">
    </div>
    <div v-if="disableCreate != null">{{ disableCreate }}</div>
    <button :disabled="disableCreate != null">Create</button>
  </form>
</template>
<style scoped>
button {
  width: 100%;
}
</style>