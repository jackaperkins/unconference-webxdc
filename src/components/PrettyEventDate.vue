<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps({
  start: {
    type: String,
    required: true
  },
  end: {
    type: String,
    required: true
  }
})

const daysOfWeek = [
  'Sun', 'Mon', 'Tue', 'Wed',
  'Thu', 'Fri', 'Saty'
];

const getOrdinalSuffix = (n: number) => {
  if (n >= 11 && n <= 13) return `${n}th`;
  switch (n % 10) {
    case 1: return `${n}st`;
    case 2: return `${n}nd`;
    case 3: return `${n}rd`;
    default: return `${n}th`;
  }
};

const multiDay = computed(() => {
  const start = new Date(props.start)
  const end = new Date(props.end)

  if (`${start.getMonth()}-${start.getDate()}` !== `${end.getMonth()}-${end.getDate()}`) {
    return true
  }

  return false
})

function formatDate(theDate: string) {
  const lang = navigator.language || navigator.languages[0];
  const date = new Date(theDate);
  if(multiDay.value) {
    return date.toLocaleDateString(lang, {
      hourCycle: 'h24',
      hour: '2-digit',
      minute: '2-digit',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  } else {
    return date.toLocaleTimeString(lang, {
      hourCycle: 'h24',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
}

</script>
<template>
  <div>
    {{ formatDate(start) }} - {{ formatDate(end) }}
  </div>
</template>