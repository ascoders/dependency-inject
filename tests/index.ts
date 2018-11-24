import { Container, inject, injectFactory } from '../src';

class Store {
  public num = 1;
}

class Action {
  @inject(Store)
  private store: Store;

  public setNum(num: number) {
    this.store.num = num;
  }
}

test('can be injected', () => {
  const container = new Container();
  container.set(Store, new Store());
  container.set(Action, new Action());

  const store = container.get(Store);
  const action = container.get(Action);

  action.setNum(2);
  expect(store.num === 2).toBe(true);
});

// TODO: maybe it's a bug.
test('No interference between instances', () => {
  const containerA = new Container();
  containerA.set(Store, new Store());
  containerA.set(Action, new Action());
  const actionA = containerA.get(Action);
  const storeA = containerA.get(Store);

  const containerB = new Container();
  containerB.set(Store, new Store());
  containerB.set(Action, new Action());
  const actionB = containerB.get(Action);
  const storeB = containerB.get(Store);

  actionB.setNum(3);
  expect(storeA.num === 3).toBe(true);
  expect(storeB.num === 3).toBe(true);
});

test('injectFactory', () => {
  const result = injectFactory({
    Store,
    Action
  });

  result!.Action!.setNum(2);
  expect(result!.Store!.num === 2).toBe(true);
});

test('injectFactory cycle', () => {
  const result: any = injectFactory({
    group: {
      Store
    },
    Action
  } as any);

  result.Action.setNum(2);
  expect(result.group.Store.num === 2).toBe(true);
});
