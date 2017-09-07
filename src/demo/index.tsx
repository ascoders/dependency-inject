import test from 'ava'
import { Container, inject, injectFactory } from '../index'

class Store {
  num = 1
}

class Action {
  @inject(Store)
  private store: Store

  setNum(num: number) {
    this.store.num = num
  }
}

const result: any = injectFactory({
  group: {
    Store
  },
  Action
})

console.log(123, result.Action)

// result.group.Action.setNum(2)