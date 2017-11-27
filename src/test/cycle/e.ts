import { inject } from '../../index'
import { A } from './a'
import { B } from './b'
import { C } from './c'
import { D } from './d'

export class E {
  @inject(A) a: A
  @inject(B) b: B
  @inject(C) c: C
  @inject(D) d: D
  e = 'e'
  run() {
    return [this.a, this.b, this.c, this.d, new E()]
  }
}