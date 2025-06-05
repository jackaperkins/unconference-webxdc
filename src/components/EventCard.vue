<script setup lang="ts">
import { computed } from 'vue';
import { Event } from '../p2p/operation';
import PrettyEventDate from './PrettyEventDate.vue';
const props = defineProps({
  event: {
    required: true,
    type: Event
  },
  short: {
    default: false,
    type: Boolean
  }
})

const description = computed(() => {
  const theDescription = props.event.fields.description.value
  if(props.short && theDescription.length > 100) {
    return theDescription.slice(0, 100) + ' ...'
  } 
  return theDescription
})


</script>
<template>
  <div class="event-card">
    <h3>
      <RouterLink :to="{ name: 'eventFocus', params: { id: event.id } }">
        {{ event.fields.title.value }}
      </RouterLink>
    </h3>
    <div class="meta">
      <PrettyEventDate :start="event.fields.start.value" :end="event.fields.end.value"/>
    </div>
    <div class="meta">
      Organized by <span v-if="event.fields.organizer.value">{{ event.fields.organizer.value }}</span><span v-else
        class="anonymous">Anonymous</span>
    </div>
    <br v-if="!short">
    <p v-for="paragraph of description.split('\n')" :key="paragraph">
      {{ paragraph  }}
    </p>
  </div>
</template>

<style scoped>
h3 {
  margin-bottom: 5px;
}

.event-card {
  margin-bottom: 25px;
}


p {
  font-size: 17px;
}

.meta {
  line-height: 100%;
  color: var(--color-hint);
}
</style>