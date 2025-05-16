import { AppData, Operation, OperationAction, AppDataState, Conference, DataType } from "../p2p/operation";
import { expect, test } from 'vitest'

// test the  appdata fields can be updated by operations on real data

// conference etc

test('Conference has default values', () => {
  const myConf = new Conference()
  expect(myConf.fields.title).toBeDefined()
  expect(myConf.fields.title.value).toBe("")
  
})

test('Conference has can be initialized', () => {
  const myConf = new Conference()
  const op = new Operation(myConf.id, OperationAction.CREATE, "alice", 1, DataType.CONFERENCE, {
    title: "demo"
  })
  myConf.applyOperation(op)
  expect(myConf.fields.title).toBeDefined()
  expect(myConf.fields.title.value).toBe("demo")
})

test('Conference updates only fields later in order', () => {
  const myConf = new Conference()
  const op = new Operation(myConf.id, OperationAction.CREATE, "alice", 1, DataType.CONFERENCE, {
    title: "demo",
    description: "old description"
  })
  myConf.applyOperation(op)

  const op2 = new Operation(myConf.id, OperationAction.UPDATE, "alice", 2, DataType.CONFERENCE, {
    description: "a demo conference"
  })
  myConf.applyOperation(op2)
  expect(myConf.fields.title).toBeDefined()
  expect(myConf.fields.title.value).toBe("demo")
  expect(myConf.fields.description.value).toBe("a demo conference")

  expect(myConf.clock).toBe(2)
})

test('Conference updates correctly with out of order updates', () => {
  const myConf = new Conference()
  const op = new Operation(myConf.id, OperationAction.CREATE, "bob", 1,DataType.CONFERENCE,  {
    title: "demo",
    description: "old description"
  })
  
  const op2 = new Operation(myConf.id, OperationAction.UPDATE, "alice", 2, DataType.CONFERENCE, {
    description: "a demo conference"
  })
  
  // op2, then 1
  myConf.applyOperation(op2)
  myConf.applyOperation(op)
  expect(myConf.fields.title).toBeDefined()
  expect(myConf.fields.title.value).toBe("demo")
  expect(myConf.fields.description.value).toBe("a demo conference")

  expect(myConf.clock).toBe(2)
})

