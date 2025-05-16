import { Register } from "../p2p/register"
import { v4 as uuidv4 } from 'uuid';
import { RegisterTypes } from "./register"

export enum OperationAction {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete'
}

export enum DataType {
  CONFERENCE = 'conference',
  EVENT = 'event'
}

export class Operation {
  id: string
  action: OperationAction
  user: string
  clock: number
  dataType:DataType
  fields: Record<string, any> = {}

  constructor(id: string, action: OperationAction, user: string, clock: number, dataType: DataType , fields: Record<string, string|number|boolean>) {
    this.id = id
    this.action = action
    this.user = user
    this.clock = clock
    this.dataType = dataType
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
  dataType: DataType

  constructor(dataType: DataType, id?: string) {
    this.dataType = dataType
    this.id = id ?? uuidv4().toString()
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
  constructor( id?: string) {
    super(DataType.CONFERENCE, id)
    this.fields = {
      title: new Register(["", 0, ""]),
      description: new Register(["", 0, ""]),
      start: new Register(["", 0, ""]), // date, not date-time
      end: new Register(["", 0, ""]) // date, not date-time
    }
  }
}


export class Event extends AppData {
  constructor(id?: string) {
    super(DataType.EVENT, id)
    this.fields = {
      title: new Register(["", 0, ""]),
      description: new Register(["", 0, ""]),
      organizer: new Register(["", 0, ""]),
      start: new Register(["", 0, ""]), 
      end: new Register(["", 0, ""])
    }
  }
}
