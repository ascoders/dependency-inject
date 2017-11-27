import { inject } from '../../index'
import { A } from './a'
import { B } from './b'
import { D } from './d'
import { E } from './e'

export class C {
  @inject(A) a: A
  @inject(B) b: B
  @inject(D) d: D
  @inject(E) e: E
  run() {
    return [this.a, this.b, new C(), this.d, this.e]
  }
}