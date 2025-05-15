import { AppData, Operation, OperationAction, AppDataState, Conference } from "../p2p/operation";
import { expect, test } from 'vitest'


test('Conference has default values', () => {
  const myConf = new Conference()
  expect(myConf.fields.title).toBeDefined()
  expect(myConf.fields.title.value).toBe("")
  
})

test('Conference has can be initialized', () => {
  const myConf = new Conference()
  const op = new Operation(myConf.id, OperationAction.CREATE, "jack", 1, {
    title: "demo"
  })
  myConf.applyOperation(op)
  expect(myConf.fields.title).toBeDefined()
  expect(myConf.fields.title.value).toBe("demo")
})

test('Conference has updates only fields later in order', () => {
  const myConf = new Conference()
  const op = new Operation(myConf.id, OperationAction.CREATE, "jack", 1, {
    title: "demo"
  })
  myConf.applyOperation(op)

  const op2 = new Operation(myConf.id, OperationAction.UPDATE, "jack", 2, {
    description: "a demo conference"
  })
  myConf.applyOperation(op2)
  expect(myConf.fields.title).toBeDefined()
  expect(myConf.fields.title.value).toBe("demo")
  expect(myConf.fields.description.value).toBe("a demo conference")

  expect(myConf.clock).toBe(2)
})

