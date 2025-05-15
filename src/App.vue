<script setup>
import {  RouterView } from 'vue-router'
import { useAppStore } from './stores/appStore.js'
import {ref} from 'vue'

const appStore = useAppStore()

const textField = ref('')


</script>


<template>
  <header>
    <div class="wrapper">
      <div>Hi</div>
      <div>
        <input type="text" v-model="textField"><button @click="appStore.createUpdate(textField)">Submit</button>
        <div>
          {{  textField }}
        </div>
      </div>
      <div>
        webxdc1: {{ appStore.xdcExists ? 'true' : 'false'}}
      </div>
      <div>
        <div v-for="update of appStore.updates" :key="update.sequence">
          {{  update }}
        </div>
      </div>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
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
