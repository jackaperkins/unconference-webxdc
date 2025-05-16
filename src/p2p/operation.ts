import { Register } from "../p2p/register"
import { randomUUID } from 'node:crypto'
import { RegisterTypes } from "./register"


export enum OperationAction {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete'
}

export class Operation {
  id: string
  action: OperationAction
  user: string
  clock: number
  fields: Record<string, any> = {}

  constructor( id: string, action: OperationAction, user: string, clock: number, fields: Record<string, string|number|boolean>) {
    this.id = id
    this.action = action
    this.user = user
    this.clock = clock
    this.fields = fields
  }
}

export enum AppDataState {
  PRECREATE = 'precreate',
  EXISTS = 'exists',
  DELETED = 'deleted'
}

export class AppData {
  id: string
  clock: number = 0
  state: AppDataState = AppDataState.PRECREATE
  fields: Record<string, Register> = {}

  constructor() {
    this.id = randomUUID().toString()
  }

  /**
   * Apply operation to existing app data
   * @param operation 
   * @returns True if operation changed data in meaningful way, useful for notifying UI states
   */
  applyOperation (operation: Operation): boolean {
    // early outs, no operation
    if(operation.id != this.id){
      return false
    }
    if(this.state === AppDataState.DELETED) {
      return false
    }

    // from here down any return must be true because we've probably modified state

    // keep going even if we dont update the objects clock, individual fields might get updated anyways
    if(operation.clock > this.clock) {
      this.clock = operation.clock
    }

    if(operation.action === OperationAction.DELETE) {
      this.state = AppDataState.DELETED
      return true
    }

    if(this.state === AppDataState.PRECREATE && operation.action === OperationAction.CREATE) {
      this.state = AppDataState.EXISTS
    }

    // now apply the fields!
    // we loop our local fields to look them up possibly on the operation
    // so that we don't introduce new fields described in operation but no in ourself
    for(const[key, value] of Object.entries(this.fields)) {
      if(operation.fields.hasOwnProperty(key)) {
        value.merge([operation.user, operation.clock, operation.fields[key]])
      }
    }

    return true
  }
}

export class Conference extends AppData {
  constructor() {
    super()
    this.fields = {
      title: new Register(["", 0, ""]),
      description: new Register(["", 0, ""]),
      start: new Register(["", 0, ""]), // date, not date-time
      end: new Register(["", 0, ""]) // date, not date-time
    }
  }
}
