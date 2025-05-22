<script setup lang="ts">
import {useRoute} from 'vue-router'

const route = useRoute()



</script>
<template>
  <div>
    Route not found
    <pre>
      {{ route.path }}
    </pre>
    <RouterLink to="/">Back</RouterLink>
  </div>
</template>