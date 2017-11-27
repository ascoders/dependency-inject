import { inject } from '../../index'
import { A } from './a'
import { B } from './b'
import { C } from './c'
import { E } from './e'

export class D {
  @inject(A) a: A
  @inject(B) b: B
  @inject(C) c: C
  @inject(E) e: E
  d = 'd'
  run() {
    return [this.a, this.b, this.c, new D(), this.e]
  }
}