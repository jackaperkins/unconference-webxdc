<script setup lang="ts">
import { useAppStore } from '@/stores/appStore';
import { computed } from 'vue';

const appStore = useAppStore()

const conference = computed(() => appStore.conference)
</script>

<template>
  <main>
    <div v-if="conference">
      <h1>
        {{ conference.fields.title.value }}
      </h1>
      <h3>{{ conference.fields.start.value }} - {{ conference.fields.end.value }}</h3>
      <h3>{{ conference.fields.description.value }}</h3>
    </div>
  </main>
</template>
