<script setup lang="ts">
import { Event } from '../p2p/operation';
const props = defineProps({
  event: {
    required: true,
    type: Event
  }
})
</script>
<template>
  <div class="event-card">
    <h3>
      {{ event.fields.title.value }}
    </h3>
    <div>
      {{ event.fields.start.value }} - {{ event.fields.end.value }}
    </div>
    <div>
      Organized by {{ event.fields.organizer.value }}
    </div>
    <p>
      {{ event.fields.description.value }}
    </p>
  </div>
</template>
<style scoped>
.event-card {
  margin-bottom: 10px;
}
</style>