<script setup lang="ts" >
import { useAppStore } from '../stores/appStore';
import { DataType, Event } from '../p2p/operation';
import { computed, onMounted, ref } from 'vue';

const props = defineProps({
  event: {
    required: true,
    type: Event
  }
})

const emit = defineEmits(['saved'])

const appStore = useAppStore()

const title = ref('')
const description = ref('')
const organizer = ref('')
const start = ref('2025-05-15')
const end = ref('2025-05-16')

onMounted(() => {
  console.log('Event Editor was mounted')
  title.value = props.event.fields.title.value as any
  description.value = props.event.fields.description.value as string
  organizer.value = props.event.fields.organizer.value as string
  start.value = props.event.fields.start.value as string
  end.value = props.event.fields.end.value as string
})

function updateEvent() {
  // we want sparse updates so only send fields that are changed
  const finalUpdate = {
    title: title.value != props.event.fields.title.value ? title.value : undefined,
    description: description.value != props.event.fields.description.value ? description.value : undefined,
    organizer: organizer.value != props.event.fields.organizer.value ? organizer.value : undefined,
    start: start.value != props.event.fields.start.value ? start.value : undefined,
    end: end.value != props.event.fields.end.value ? end.value : undefined
  }
  console.log('updating with spares data:', finalUpdate)
  appStore.updateData(
    DataType.EVENT,
    props.event.id,
    finalUpdate
  )
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
    <h3>Edit Event</h3>
      <form @submit.prevent="updateEvent" >
        <div class="default-form" >
          <label for="" > Title </label><input v-model="title" required>
          <label for="" > Description </label><input v-model="description" required>
          <label for="" > Organizer</label><input v-model="organizer">
          <label for="" > Start </label><input type="datetime-local" v-model="start" required>
          <label for="" > End </label><input type="datetime-local" v-model="end" required>
        </div>
        <button :disabled = "disableCreate != null" >Update</button>
      </form>
    <div v-if= "disableCreate" >
      {{ disableCreate }}
    </div>
  </div>
</main>
</template>