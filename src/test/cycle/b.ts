import { inject } from '../../index'
import { A } from './a'
import { C } from './c'
import { D } from './d'
import { E } from './e'

export class B {
  @inject(A) a: A
  @inject(C) c: C
  @inject(D) d: D
  @inject(E) e: E
  run() {
    return [this.a, new B(), this.c, this.d, this.e]
  }
}