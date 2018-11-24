import { Container, inject, injectFactory } from '../src';

class Store {
  public num = 1;
}

class Action {
  @inject(Store)
  private store?: Store;

  public setNum(num: number) {
    this.store!.num = num;
  }
}

const result = injectFactory({
  Store,
  Action
});

// console.log(123, result.Action)

// result.group.Action.setNum(2)
