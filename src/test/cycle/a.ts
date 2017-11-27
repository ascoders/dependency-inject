import { inject } from '../../index'
import { B } from './b'
import { C } from './c'
import { D } from './d'
import { E } from './e'

export class A {
  @inject(B) b: B
  @inject(C) c: C
  @inject(D) d: D
  @inject(E) e: E
  run() {
    return [new A(), this.b, this.c, this.d, this.e]
  }
}