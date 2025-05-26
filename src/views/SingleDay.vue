<script setup lang="ts">
import { useAppStore } from '@/stores/appStore';
import EventCard from '@/components/EventCard.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { yearMonthDay, offsetDay } from '../lib';

const route = useRoute()
const appStore = useAppStore()

const conference = computed(() => appStore.conference)

const todayDate: Date | null = computed(() => {
    if (route.params.day) {
        return new Date(route.params.day) || null
    }
    return null
})

const previousDay: Date | null = computed(() => offsetDay(todayDate.value, -1))
const nextDay: Date | null = computed(() => offsetDay(todayDate.value, 1))

const events = computed(() => {
    return appStore.events
})

function getDayName(theDate) {
    const lang = navigator.language || navigator.languages[0];
    return theDate.toLocaleString(lang, { weekday: 'long', day: 'numeric' })
}
</script>

<template>
    <header>
        <h1>
            {{ getDayName(todayDate) }}
        </h1>
    </header>
    <main>
        <div v-if="conference">
            <div class="previous-next">
                <span >
                    <RouterLink v-if="previousDay" :to="`/day/${yearMonthDay(previousDay)}`">{{ getDayName(previousDay) }}</RouterLink>
                </span>
                <span>
                        <RouterLink v-if="nextDay" :to="`/day/${yearMonthDay(nextDay)}`">{{ getDayName(nextDay) }}</RouterLink>
              
                </span>
            </div>  
        </div>
        <div v-for="event of events" :key="event.id">
            <EventCard :event="event"></EventCard>
        </div>
        <div v-if="appStore.events.length === 0">No Events Today</div>
    </main>
</template>

<style scoped>
    .previous-next * {
        padding: 0px 10px;
    }
</style>