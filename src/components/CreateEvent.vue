<script setup lang="ts">
import { useAppStore } from '../stores/appStore';
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const appStore = useAppStore()

const title = ref('')
const description = ref('')
const organizer = ref('')
const start = ref('2025-05-15T16:00')
const end = ref('2025-05-15T20:00')

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
  if (end.value <= start.value) {
    return "Start time must be before End"
  }

  return null
})
</script>
<template>
  <main>
    <div>
      <form @submit.prevent="createEvent">
        <div class="default-form">
          <label for="">Title*</label><br>
          <input v-model="title" required><br>
          <label for="">Description</label><br>
          <textarea v-model="description"></textarea><br>
          <label for="">Organizer</label><br>
          <input v-model="organizer"><br>
          <label for="">Start*</label><br>
          <input type="datetime-local" v-model="start" required><br>
          <label for="">End*</label><br>
          <input type="datetime-local" v-model="end" required>
        </div>
        <button :disabled="disableCreate != null">Create</button>
      </form>
      <div v-if="disableCreate">
        {{ disableCreate }}
      </div>
    </div>
  </main>
</template>