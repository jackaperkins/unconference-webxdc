import { Register } from '../p2p/register'
import { test, expect } from 'vitest'

// registers store individual fields with a local clock to deal with out-of-order updates

test('Register starts with clock 1', () => {
  const reg = new Register( ["alice", 1, "apples"])
  expect(reg.value).toBe('apples')
  expect(reg.clock).toBe(1)
})

test('Register changes state with higher clock values from same user', () => {
  const reg = new Register(["alice", 1, "apples"])
  reg.merge(["alice", 2, "strawberry"])
  expect(reg.value).toBe('strawberry')
  expect(reg.clock).toBe(2)
})

test('Register changes state with higher clock values from different user', () => {
  const reg = new Register( ["alice", 1, "apples"])
  reg.merge(["bob", 2, "strawberry"])
  expect(reg.value).toBe('strawberry')
  expect(reg.clock).toBe(2)
})

test('Register rejects changes with lower clock values from different user', () => {
  const reg = new Register(["alice", 1, "apples"])
  reg.merge(["alice", 2, "strawberry"])
  reg.merge(["bob", 1, "pineapple"])
  expect(reg.value).toBe('strawberry')
  expect(reg.clock).toBe(2)
})

test('Register rejects changes with equal clock values from alphabetically lower user', () => {
  const reg = new Register( ["bob", 1, "apples"])
  reg.merge(["bob", 2, "strawberry"])
  reg.merge(["alice", 2, "pineapple"])
  expect(reg.value).toBe('strawberry')
  expect(reg.clock).toBe(2)
})

test('Register allows changes with equal clock values from alphabetically higher user', () => {
  const reg = new Register(["alice", 1, "apples"])
  reg.merge(["alice", 2, "strawberry"])
  reg.merge(["bob", 2, "pineapple"])
  expect(reg.value).toBe('pineapple')
  expect(reg.clock).toBe(2)
})