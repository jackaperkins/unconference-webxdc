import { Register } from "@/p2p/register"
import { randomUUID } from 'node:crypto'


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
  clock: number = 1
  state: AppDataState = AppDataState.PRECREATE
  fields: Record<string, Register> 

  constructor() {
    this.id = randomUUID().toString()
  }

  /**
   * Apply operation to existing app data
   * @param operation 
   * @returns True if operation changed data in meaningful way
   */
  applyOperation (operation: Operation): boolean {
    // early outs, no op
    if(operation.id != this.id){
      return false
    }
    if(this.state === AppDataState.DELETED) {
      return false
    }

    // from here down any return must be true because we've modified state

    if(operation.clock > this.clock) {
      this.clock = operation.clock
    }

    if((this.state !== AppDataState.DELETED) && operation.action === OperationAction.DELETE) {
      this.state = AppDataState.DELETED
      return true
    }

    if(this.state === AppDataState.PRECREATE && operation.action === OperationAction.CREATE) {
      this.state = AppDataState.EXISTS
    }

    // now apply the fields!

    return true
  }
}

export class Conference extends AppData {
  // fields: {
  //   title: Register<string>,
  //   description: Register<string>,
  //   start: Register<string>,
  //   end: Date
  // }
}
