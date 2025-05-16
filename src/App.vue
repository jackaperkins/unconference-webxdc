<script setup lang="ts">
import {  RouterView } from 'vue-router'
import { useAppStore } from './stores/appStore.js'
import {computed, ref} from 'vue'

const appStore = useAppStore()

const confTitle = ref('My Conference')
const confDescription = ref('An unconference for everyone')
const confStart = ref('2025-05-10')
const confEnd = ref('2025-05-20')

function createConference() {
  appStore.createConference(confTitle.value, confDescription.value, confStart.value.toString(), confEnd.value.toString())
}

const disableCreate = computed(() => {
  if(!confTitle.value || !confDescription.value || !confStart.value || !confEnd.value) {
    return true
  }

  if(confEnd.value <= confStart.value){
    return true
  }
  return false
})

</script>


<template>
  <header>
    <div class="wrapper">
      <div v-if="appStore.conference">
        <RouterView />
      </div>
      <div v-else>
        <h2>New Conference</h2>
        <form @submit.prevent="createConference">
          <div class="default-form">
            <label for="">Title</label><input v-model="confTitle">
            <label for="">Description</label><input v-model="confDescription">
            <label for="">Start</label><input type="date" v-model="confStart">
            <label for="">End</label><input type="date" v-model="confEnd">
          </div>
          <button :disabled="disableCreate">Create</button>
        </form>
      </div>

      <div style="font-size: 12px; padding-top:20px; color: #999;">
        <h3>Updates DB:</h3>
        <div v-for="update of appStore.updates">
          {{ update }}
        </div>
      </div>
    </div>
  </header>

</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.default-form {
  display: grid;
  grid-template-columns: 1fr 2fr;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
