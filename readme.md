# DependencyInject

> [Live Demo](https://jsfiddle.net/yp90Lep9/15/)

```typescript
import { Container, inject } from 'dependency-inject'

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

// init store
const container = new Container()
container.set(Store, new Store())
container.set(Action, new Action())

// get data with injected
const store = container.get(Store)
const action = container.get(Action)

action.setNum(2)
console.log(store.num) // 2
```

# Simple useage by injectFactory

```typescript
import { injectFactory } from 'dependency-inject'
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

const stores = injectFactory({Store, Action})
// stores.Store.num === 1
// stores.Action.setNum
```

## nested object

```typescript
import { injectFactory } from 'dependency-inject'
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

const stores = injectFactory({
    groupA: Store,
    groupB: {
        groupC: Action
    }
})
```