<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useAppStore } from './stores/appStore.js'
import { useRoute } from 'vue-router'
import CreateConference from './components/CreateConference.vue'
import { ref } from 'vue'

const route = useRoute()

const appStore = useAppStore()

const showMenu = ref(false)

</script>


<template>
  <div v-if="!appStore.xdcExists">
    <h1>Loading ...</h1>
  </div>
  <div v-else>
    <div class="nav-bar">
      <span>
        <RouterLink :to="{ name: 'home' }" v-if="route.name != 'home'">
          <span class="nav-button">Back</span>
        </RouterLink>
      </span>
      <span class="nav-title">{{ route.meta?.title || '' }}</span>
      <span class="nav-menu">
        <button @click="showMenu = !showMenu">
          <svg width="28px" height="28px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6H20M4 12H20M4 18H20" stroke-width="2" stroke-linecap="round"
            stroke-linejoin="round" />
          </svg>
        </button>
      </span>
      <div id="menu" v-if="showMenu" @click="showMenu = false">
        <ul>
          <li>
            <RouterLink to="/create/event">
              New Event
            </RouterLink>
          </li>
          <li>
            Day Schedule
          </li>
          <li>
            <RouterLink to="/about">
              About
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
    <div class="wrapper">
      <div v-if="appStore.conference">
        <RouterView />
      </div>
      <div v-else>
        <CreateConference />
      </div>
      <br>
      <br>
      <br>
      <div v-if="appStore.debug" style="font-size: 12px; padding-top:30px; color: #999;">
        <div class="debug-reveal" @click="appStore.showDebug(false)">Hide Debug</div>
        <h3>Updates DB:</h3>
        <div v-for="update of appStore.updates" :key="update.sequence" style="margin-bottom: 10px;">
          <pre>{{ JSON.stringify(update, null, 2) }}</pre>
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
  display: grid;
  grid-template-columns: 60px 1fr 60px;
  position: relative;
  height: 32px;
}

.nav-menu {
  text-align: right;
}

.nav-menu button {
  padding: 0px 10px;
  margin: 0px;
  background: none;
}

.nav-menu svg {
  stroke: var(--color-text);
}

#menu {
  position: absolute;
  top: 32px;
  width: 100%;
  right: 0px;
  max-width: 400px;
  background-color: var(--color-background-soft);
}

#menu ul {
  list-style-type: none;
  list-style: none;
  margin: 0px;
  padding: 0px;
  width: 100%;
}

#menu li {
  padding: 5px 10px;
  margin: 0px;
  width: 100%;
}

#menu a {
  width: 100%;
  display: inline-block;
}


.nav-title {
  text-align: center;
  font-weight: bolder;
  font-size: 18px;
}

.nav-button {
  font-size: 16px;
  padding: 0px 10px 0px 3px;
  width: 30px;
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
