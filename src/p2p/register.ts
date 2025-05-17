// Learned from https://jakelazaroff.com/words/an-interactive-intro-to-crdts/#last-write-wins-register

export type RegisterTypes = string | boolean | number

export class Register {
  state: [peer: string, clock: number, value: RegisterTypes];

  get value() {
    return this.state[2];
  }

  get clock() {
    return this.state[1]
  }

  constructor(state: [string, number, RegisterTypes]) {
    this.state = state;
  }

  merge(state: [peer: string, clock: number, value: RegisterTypes]) {
    const [remotePeer, remoteClock] = state;
    const [localPeer, localClock] = this.state;

    // if the local timestamp is greater than the remote timestamp, discard the incoming value
    if (localClock > remoteClock) return;

    // if the timestamps are the same but the local peer ID is greater than the remote peer ID, discard the incoming value
    if (localClock === remoteClock && localPeer > remotePeer) return;

    // otherwise, overwrite the local state with the remote state
    this.state = state;
  }
}