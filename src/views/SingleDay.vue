<script setup lang="ts">
import { useAppStore } from '@/stores/appStore';
import EventCard from '@/components/EventCard.vue';
import { compile, computed } from 'vue';
import { useRoute } from 'vue-router';
import { yearMonthDay, offsetDay, eventOverlapsToday, dayAndDayName } from '../lib';

const route = useRoute()
const appStore = useAppStore()

const conference = computed(() => appStore.conference)

const todayDate = computed(() => {
    if (route.params.day) {
        return new Date(route.params.day) || null
    }
    return null
})

const withinConference = computed(() => {
    if (!todayDate.value || !conference.value) {
        return false
    }

    const today = yearMonthDay(todayDate.value)
    return (today != null && today >= conference.value.fields.start.value && today <= conference.value.fields.end.value)
})
const previousDay: Date | null = computed(() => offsetDay(todayDate.value, -1))
const nextDay: Date | null = computed(() => offsetDay(todayDate.value, 1))

const events = computed(() => {
    return appStore.events.filter(event => eventOverlapsToday(todayDate.value, event))
})


</script>

<template>
    <main>
        <div v-if="conference" class="header-nav">
            <div>
                <RouterLink :to="`/day/${yearMonthDay(previousDay)}`">
                    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 12H4M4 12L10 6M4 12L10 18" stroke-width="1.5" stroke-linecap="round"
                            stroke-linejoin="round" />
                    </svg>
                </RouterLink>
            </div>
            <h2>
                {{ dayAndDayName(todayDate) }}
            </h2>
            <div>
                <RouterLink :to="`/day/${yearMonthDay(nextDay)}`">
                    <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="M4 12H20M20 12L14 6M20 12L14 18" stroke-width="1.5"
                            stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </RouterLink>
            </div>
        </div>
        <div v-if="conference">
            <div v-if="!withinConference">
                <br>
                <p>
                    Date outside of conference start and end.
                </p>
                <br>
                <p>
                    Go to <RouterLink :to="'/day/' + yearMonthDay(conference.fields.start.value)">First Day</RouterLink>
                </p>
            </div>
            <div v-else>
                <div v-for="event of events" :key="event.id">
                    <EventCard :event="event" :short="true"></EventCard>
                </div>
                <div v-if="appStore.events.length === 0">
                    <p>
                        No Events Today
                    </p>
                    <br>
                    <br>
                    <RouterLink to="/create/event" class="link-button">Create Event +</RouterLink>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
.header-nav {
    display: grid;
    grid-template-columns: 40px 1fr 40px;
    text-align: center;
}

.header-nav svg {
    stroke: var(--color-text);
}

.header-nav a {
    background: none !important;
}
</style>
