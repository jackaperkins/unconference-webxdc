<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useAppStore } from './stores/appStore.js'
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const appStore = useAppStore()

const confTitle = ref('My Conference')
const confDescription = ref('An unconference for everyone')
const confStart = ref('2025-05-10')
const confEnd = ref('2025-05-20')

function createConference() {
  appStore.createConference(confTitle.value, confDescription.value, confStart.value.toString(), confEnd.value.toString())
}

const disableCreate = computed(() => {
  if (!confTitle.value || !confDescription.value || !confStart.value || !confEnd.value) {
    return true
  }

  if (confEnd.value <= confStart.value) {
    return true
  }
  return false
})

</script>


<template>
  <div v-if="!appStore.xdcExists">
    <h1>Loading ...</h1>
  </div>
  <div v-else>
    <div class="nav-bar">
      <span>
        <RouterLink :to="{name: 'home'}">
          <span  class="nav-button" v-if="route.name != 'home'">Back</span>
        </RouterLink>
      </span>
      <span class="nav-title">{{ route.meta?.title || '' }}</span>
      <span class="nav-menu"></span>
    </div>
    <div class="wrapper">
      <div v-if="appStore.conference">
        <RouterView />
      </div>
      <div v-else>
        <h2>New Conference</h2>
        <form @submit.prevent="createConference">
          <div class="default-form">
            <label for="">Title</label><br>
            <input v-model="confTitle"><br>
            <label for="">Description</label><br>
            <input v-model="confDescription"><br>
            <label for="">Start</label><br>
            <input type="date" v-model="confStart"><br>
            <label for="">End</label><br>
            <input type="date" v-model="confEnd">
          </div>
          <button :disabled="disableCreate">Create</button>
        </form>
      </div>
      <br>
      <br>
      <br>
      <div v-if="appStore.debug" style="font-size: 12px; padding-top:30px; color: #999;">
        <div class="debug-reveal" @click="appStore.showDebug(false)">Hide Debug</div>
        <h3>Updates DB:</h3>
        <div v-for="update of appStore.updates" :key="update.sequence" style="margin-bottom: 10px;">
          {{ update }}
        </div>
      </div>
      <div v-else class="debug-reveal" @click="appStore.showDebug(true)">Debug View</div>
    </div>

  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.debug-reveal {
  color: #555;
  cursor: pointer;
  margin-top: 50px;
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
  background-color: transparent;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
  background-color: transparent;
}

nav a:first-of-type {
  border: 0;
}

.wrapper {
  padding: 2em;
}

.nav-bar {
  background: #586c73;
  padding: 3px 5px;
  color: var(--color-text);
  background-color: var(--color-background-mute);
  display:grid;
  grid-template-columns: 60px 1fr 60px;
}

.nav-title {
  text-align: center;
  font-weight: bolder;
  font-size: 18px;
}
.nav-button {
  font-size: 16px;
  padding: 0px 10px 0px 3px;
  width:30px;
  color: var(--color-heading);
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
    background: rgba(255, 255, 255, 0.1);
  }
}
</style>
