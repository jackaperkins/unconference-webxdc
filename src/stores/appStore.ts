import { ref, computed, toValue, onMounted, reactive } from 'vue'
import { defineStore } from 'pinia'
import { watch } from 'vue'
import { Register } from '../Register'

export const useAppStore = defineStore('app', () => {

  const xdcExists = ref(false)

  type Operation = {
    id: string,
    action: 'create' | 'update' | 'delete',
    clock: number
  }



  type Conference = Operation & {
    fields: {
      title: Register<string>,
      description: Register<string>,
      start: Register<string>,
      end: Date
    }
  }

  const updates = reactive<Array<Conference>>([])

  onMounted(() => {

    let wakeTimer = null

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

  function createUpdate(text) {
    window.webxdc.sendUpdate({ payload: text })
  }

  return { xdcExists, updates, createUpdate }
})
