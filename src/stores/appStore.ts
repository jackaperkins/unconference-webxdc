import { ref, computed, toValue, onMounted, reactive } from 'vue'
import { defineStore } from 'pinia'
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import { AppData, AppDataState, Conference, DataType, Event, Operation, OperationAction } from '../p2p/operation'
import "webxdc-types/global";

export const useAppStore = defineStore('app', () => {
  const user = ref("user1")
  const xdcExists = ref(false)
  const route = useRoute()

  const data = reactive<Array<Conference | Event>>([])
  const updates = reactive<any>([])

  const debug = ref(false)

  function showDebug(newValue: boolean) {
    debug.value = newValue
  }

  onMounted(() => {
    let wakeTimer: number | NodeJS.Timeout = 0

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
    window.webxdc.setUpdateListener(update => {
      updates.push(update)
      processOperationFromNetwork(update)
    }, 0)
  }

  function processOperationFromNetwork(update: { payload: any }) {
    // expect payload to be one of our operations actually
    const existing = findData(update.payload.id)

    if (existing) {
      existing.applyOperation(update.payload)
      replaceData(existing)
      return
    }

    let newData: Conference | Event | null = null
    if (update.payload.dataType === DataType.CONFERENCE) {
      newData = new Conference(update.payload.id)
    }
    if (update.payload.dataType === DataType.EVENT) {
      newData = new Event(update.payload.id)
    }

    if (!newData) {
      console.error('Tried to create new appData not in DB but didnt match any known type', update.payload)
      return
    }
    newData.applyOperation(update.payload)
    console.log('inserting new data')
    data.push(newData)
  }

  function findData(id: string) {
    return data.find((d) => d.id === id)
  }

  function replaceData(updatedData: AppData) {
    const index = data.findIndex((existingData) => existingData.id === updatedData.id)
    if (index < 0) {
      console.error('Could not find data in app db', updatedData)
    }
    data[index] = updatedData
  }

  const conference = computed(() => {
    return data.find(d => d.dataType === DataType.CONFERENCE)
  })

  function createConference(title: string, description: string, start: string, end: string) {
    // prevent multiple conferences
    if (conference.value) {
      return
    }
    const appdata = new Conference()
    const operation = new Operation(
      appdata.id,
      OperationAction.CREATE,
      user.value,
      1,
      DataType.CONFERENCE,
      {
        title,
        description,
        start,
        end
      }
    )

    sendOperation(operation)
  }

  const events = computed(() => {
    return data.filter(d => d.dataType === DataType.EVENT && d.state === AppDataState.EXISTS)
  })

  const eventFromRouter = computed(() => {
    return data.find(d => d.id === route.params.id)
  })

  function createEvent(title: string, description: string, organizer: string, start: string, end: string) {
    const appdata = new Event()
    const operation = new Operation(
      appdata.id,
      OperationAction.CREATE,
      user.value,
      1,
      DataType.EVENT,
      {
        title,
        description,
        organizer,
        start,
        end
      }
    )
    sendOperation(operation)
  }

  function deleteDate(dataType: DataType, id: string) {
    const existing = findData(id)
    if (!existing) {
      console.error("couldn't find data to update with id", id)
      return
    }

    const op = new Operation(
      id,
      OperationAction.DELETE,
      user.value,
      existing.clock + 1,
      dataType,
      {}
    )

    sendOperation(op)

  }

  function updateData(dataType: DataType, id: string, fields: {}) {
    const existing = findData(id)
    if (!existing) {
      console.error("couldn't find data to update with id", id)
      return
    }

    const op = new Operation(
      id,
      OperationAction.UPDATE,
      user.value,
      existing.clock + 1,
      dataType,
      fields
    )

    sendOperation(op)
  }

  function sendOperation(operation: Operation) {
    window.webxdc.sendUpdate({ payload: operation }, "calendar update")
  }

  return {
    debug,
    showDebug,
    xdcExists,
    updates,
    data,
    conference,
    createConference,
    events,
    createEvent,
    updateData,
    deleteDate,
    eventFromRouter
  }
})
