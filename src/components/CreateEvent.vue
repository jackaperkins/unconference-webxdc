<script setup lang="ts">
import { yearMonthDay } from '@/lib';
import { useAppStore } from '../stores/appStore';
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const appStore = useAppStore()

const title = ref('')
const description = ref('')
const organizer = ref('')
const start = ref('')
const end = ref('')

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
  if(end.value === '' || start.value === '') {
    return ''
  }
  if (end.value <= start.value) {
    return "Start time must be before End"
  }

  return null
})

const outsideConferenceTimes = computed(() => {
  if (!appStore.conference) {
    return true
  }
  return yearMonthDay(start.value) < yearMonthDay(appStore.conference.fields.start.value) || yearMonthDay(end.value) > yearMonthDay(appStore.conference.fields.end.value)
})

</script>
<template>
  <main>
    <div v-if="appStore.conference">
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
        <br>
        <div v-if="outsideConferenceTimes">
          <p>
            Event exists outside of conference start and end dates, Ok?
          </p>
          <p>
            Conference: {{ yearMonthDay(appStore.conference.fields.start.value) }} - {{
              yearMonthDay(appStore.conference.fields.end.value) }}
          </p>
        </div>
        <div v-if="disableCreate" class="warning">
          {{ disableCreate }}
        </div>
        <br>
        <button :disabled="disableCreate != null">Create</button>
      </form>

    </div>
  </main>
</template>
<style scoped>
button {
  width: 100%;
}

.warning {
  color: var(--color-warn);
}
</style>