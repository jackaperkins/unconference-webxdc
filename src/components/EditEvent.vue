<script setup lang="ts">
import { useAppStore } from '../stores/appStore';
import { DataType, Event } from '../p2p/operation';
import { computed, onMounted, ref } from 'vue';

const props = defineProps({
  event: {
    required: true,
    type: Event
  }
})

let editingCopy: Record<string, string | number | boolean> = {}
const emit = defineEmits(['saved'])

const appStore = useAppStore()

const title = ref('')
const description = ref('')
const organizer = ref('')
const start = ref('2025-05-15')
const end = ref('2025-05-16')



onMounted(() => {
  editingCopy = {
    title: props.event.fields.title.value,
    description: props.event.fields.description.value,
    organizer: props.event.fields.organizer.value,
    start: props.event.fields.start.value,
    end: props.event.fields.end.value,
  }
  title.value = editingCopy.title as any
  description.value = editingCopy.description as string
  organizer.value = editingCopy.organizer as string
  start.value = editingCopy.start as string
  end.value = editingCopy.end as string
})

function updateEvent() {
  // we want sparse updates so only send fields that are changed
  // compare to our local copy in case there's been updates while we edit
  const finalUpdate = {
    title: title.value != editingCopy.title ? title.value : undefined,
    description: description.value != editingCopy.description ? description.value : undefined,
    organizer: organizer.value != editingCopy.organizer ? organizer.value : undefined,
    start: start.value != editingCopy.start ? start.value : undefined,
    end: end.value != editingCopy.end ? end.value : undefined
  }
  
  if(Object.values(finalUpdate).find(v => v != undefined) === undefined) {
    emit('saved')
    return
  }


  console.log('updating with spares data:', finalUpdate)
  appStore.updateData(
    DataType.EVENT,
    props.event.id,
    finalUpdate
  )

  emit('saved')
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
      <form @submit.prevent.stop="updateEvent">
        <div class="default-form">
          <label for=""> Title </label><input v-model="title" required>
          <label for=""> Description </label><input v-model="description" required>
          <label for=""> Organizer</label><input v-model="organizer">
          <label for=""> Start </label><input type="datetime-local" v-model="start" required>
          <label for=""> End </label><input type="datetime-local" v-model="end" required>
        </div>
        <button :disabled="disableCreate != null">Update</button>
      </form>
      <div v-if="disableCreate">
        {{ disableCreate }}
      </div>
    </div>
  </main>
</template>