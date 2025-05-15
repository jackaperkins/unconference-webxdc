import { AppData, Operation, OperationAction, AppDataState } from "../p2p/operation";
import { expect, test } from 'vitest'


test('AppData starts with clock 0, uncreated state', () => {
  const myData = new AppData()
  expect(myData.id.length).toBeGreaterThan(0);
  expect(myData.clock).toBe(0)
  expect(myData.state).toBe(AppDataState.PRECREATE)
})

test('AppData meta to get updated by operations', () => {
  const myData = new AppData()

  const op = new Operation(
    myData.id,
    OperationAction.CREATE,
    "alice",
    2,
    {}
  )
  myData.applyOperation(op)
  expect(myData.clock).toBe(2)
  expect(myData.state).toBe(AppDataState.EXISTS)
})

test('AppData clocks only take the max of opertion clocks', () => {
  const myData = new AppData()
  myData.clock = 3 // fake the future

  const op = new Operation(
    myData.id,
    OperationAction.CREATE,
    "alice",
    2,
    {}
  )
  myData.applyOperation(op)
  expect(myData.clock).toBe(3)
})

test('AppData clocks only take the max of opertion clocks', () => {
  const myData = new AppData()
  myData.clock = 3 // fake the future

  const op = new Operation(
    myData.id,
    OperationAction.CREATE,
    "alice",
    2,
    {}
  )
  myData.applyOperation(op)
  expect(myData.clock).toBe(3)
})

// operation values