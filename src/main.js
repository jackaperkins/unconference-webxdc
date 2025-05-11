function sendMsg() {
  // msg = document.getElementById("input").value;
  window.webxdc.sendUpdate({ payload: window.webxdc.selfName + ":" + msg, info: "someone typed blah" }, 'Someone typed "' + msg + '".');
}

let renderTimeout = null

function receiveUpdate(update) {
  console.log('receiving update', update)

  if (typeof update.payload === 'object') {
    if(renderTimeout) {
      clearTimeout(renderTimeout)
    }
    renderTimeout = setTimeout(renderConference, 100)

    if (update.payload.type === 'conference') {
      console.log('recieved conference operation')
      const existingConference = localStorageGet('conference')
      if (update.payload.action === 'create') {
        if (existingConference) {
          return
        } else {
          console.log('inserting conference creation payload')
          localStorageSet('conference', update.payload)
        }
      }
    }
  }
}
window.webxdc.setUpdateListener(receiveUpdate, 0);

function localStorageSet(key, payload) {
  // clear this as its not intended for app state
  payload.action = undefined
  localStorage.setItem(key, JSON.stringify(payload))
}

function localStorageGet(key, payload) {
  const raw = localStorage.getItem(key)
  if (raw === null) {
    return null
  }
  try {
    return JSON.parse(raw)
  } catch { }
  return null
}



function renderConference() {
  const conference = localStorageGet('conference')
  console.log('rendering page, initial conference value', conference)
  document.getElementById("no-conference").style.display = conference ? 'none' : 'block'
  document.getElementById("conference").style.display = conference ? 'block' : 'none'
  if (conference) { 
    document.getElementById('conference-title').innerText = conference.fields.title
    const start = new Date(conference.fields.start).toDateString()
    const end = new Date(conference.fields.end).toDateString()
    let x =[... document.getElementsByClassName('conference-start')].map(el => el.innerText =start)
    let y =[... document.getElementsByClassName('conference-end')].map(el => el.innerText = end)
  }
}

function createOperation(type, action, fields) {
  if (type != "conference" && type != "event") {
    throw new Error(`Failed to create operation with type '${type}'`)
  }
  if (action != "create" && action != "update") {
    throw new Error(`Failed to create ${type} operation with action '${action}'`)
  }
  return {
    type,
    action,
    fields
  }
}

function createConferenceOperation(e) {
  console.log('creating conference operation')
  e.preventDefault()
  const title = document.getElementById("create-conference-title").value
  const start = document.getElementById("create-conference-start").value
  const end = document.getElementById("create-conference-end").value
  const payload = createOperation("conference", "create", {
    title,
    start,
    end
  })
  console.log('creating conference operation:', payload)
  window.webxdc.sendUpdate({ payload })
  return false
}

document.getElementById('create-conference').addEventListener('submit', createConferenceOperation)

renderConference()