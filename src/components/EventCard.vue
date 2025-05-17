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
      <RouterLink :to="{ name: 'eventFocus', params: { id: event.id } }">
        {{ event.fields.title.value }}
      </RouterLink>
    </h3>
    <div>
      {{ event.fields.start.value }} - {{ event.fields.end.value }}
    </div>
    <div>
      Organized by <span v-if="event.fields.organizer.value">{{ event.fields.organizer.value }}</span><span v-else
        class="anonymous">Anonymous</span>
    </div>
    <p>
      {{ event.fields.description.value }}
    </p>
  </div>
</template>

<style scoped>
.event-card {
  margin-bottom: 25px;
}

.anonymous {
  color: #888;
}

p {
  font-size: 17px;
}
</style>