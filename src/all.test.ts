import test from 'ava'
import { Container, inject, injectFactory } from './index'

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

test('can be injected', t => {
    const container = new Container()
    container.set(Store, new Store())
    container.set(Action, new Action())

    const store = container.get(Store)
    const action = container.get(Action)

    action.setNum(2)
    t.true(store.num === 2)
})

// test('No interference between instances', t => {
//     const containerA = new Container()
//     containerA.set(Store, new Store())
//     containerA.set(Action, new Action())
//     const actionA = containerA.get(Action)
//     const storeA = containerA.get(Store)

//     const containerB = new Container()
//     containerB.set(Store, new Store())
//     containerB.set(Action, new Action())
//     const actionB = containerB.get(Action)
//     const storeB = containerB.get(Store)

//     actionB.setNum(3)
//     t.true(storeA.num === 1)
//     t.true(storeB.num === 3)
// })

test('injectFactory', t => {
    const result = injectFactory({
        Store,
        Action
    })

    result.Action.setNum(2)
    t.true(result.Store.num === 2)
})

test('injectFactory nested object', t => {
    const result: any = injectFactory({
        group: {
            Store
        },
        Action
    })

    result.Action.setNum(2)
    t.true(result.group.Store.num === 2)
})