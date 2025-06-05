<script setup lang="ts">
import { DataType } from '../p2p/operation';
import { useAppStore } from '../stores/appStore';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const appStore = useAppStore()

const title = ref('')
const description = ref('')
const start = ref('2025-05-15T16:00')
const end = ref('2025-05-15T20:00')

const emit = defineEmits(['close'])

onMounted(() => {
  if(appStore.conference) {
    title.value = appStore.conference.fields.title.value
    description.value = appStore.conference.fields.description.value
    start.value = appStore.conference.fields.start.value
    end.value = appStore.conference.fields.end.value
  }
})

function saveEvent() {
  appStore.updateData(
    DataType.CONFERENCE,
    appStore.conference!.id,
    {
      title: title.value,
      description: description.value,
      start: start.value.toString(),
      end: end.value.toString()
    }
  )
  router.push("/")
  emit('close')
}

const disableSave = computed(() => {
  if (end.value < start.value) {
    return "Start time must be before End"
  }

  return null
})
</script>
<template>
  <main>
    <div>
      <form @submit.prevent="saveEvent">
        <div class="default-form">
          <div class="default-form">
            <label for="">Title</label><br>
            <input v-model="title" required><br>
            <label for="">Description</label><br>
            <input v-model="description"><br>
            <label for="">Start</label><br>
            <input type="date" v-model="start"><br>
            <label for="">End</label><br>
            <input type="date" v-model="end">
          </div>
          <br>
          <div class="button-group">
            <button @click.stop.prevent="emit('close')">Cancel</button>
            <button :disabled="disableSave != null">Save</button>
          </div>
        </div>
      </form>
      <div v-if="disableSave != null">
        {{ disableSave }}
      </div>
    </div>
  </main>
</template>
<style scoped>
button {
  width: 100%;
}
</style>