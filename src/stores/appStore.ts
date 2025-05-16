import { ref, computed, toValue, onMounted, reactive } from 'vue'
import { defineStore } from 'pinia'
import { watch } from 'vue'
import { Register } from '../p2p/register'
import { Conference } from '../p2p/operation'

export const useAppStore = defineStore('app', () => {

  const xdcExists = ref(false)

  const data = reactive<Array<Conference|Event>>([])
  const updates = reactive<Array<Conference|Event>>([])

  onMounted(() => {

    let wakeTimer: number|NodeJS.Timeout = 0

    if (window.webxdc) {
      setupxdc()
    } else {
      if (wakeTimer) {
        clearInterval(wakeTimer)
        wakeTimer = setInterval(() => {
          if (window.webxdc) {
            clearInterval(wakeTimer)
            setupxdc()
          }
        }, 50)
      }
    }
  })

  function setupxdc() {
    if (xdcExists.value) {
      return
    }
    xdcExists.value = true

    window.webxdc.setUpdateListener((update) => {
      updates.push(update)
    }, 0)
  }

  function createUpdate(text:string) {
    window.webxdc.sendUpdate({ payload: text })
  }

  return { xdcExists, updates, createUpdate, data }
})
