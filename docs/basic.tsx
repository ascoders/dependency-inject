import * as React from 'react';
import { Container, inject, injectFactory } from '../src';

export default () => <div />;

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
