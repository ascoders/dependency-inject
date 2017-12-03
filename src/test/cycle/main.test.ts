import test from 'ava'
import { Container, inject, injectFactory } from '../../index'
import { A } from './a'
import { B } from './b'
import { C } from './c'
import { D } from './d'
import { E } from './e'

test('nested order bug', t => {
  const obj = injectFactory({ A, B, C, D, E })

  t.true(obj!.A!.run()[0] instanceof A)
  t.true(obj!.A!.run()[1] instanceof B)
  t.true(obj!.A!.run()[2] instanceof C)
  t.true(obj!.A!.run()[3] instanceof D)
  t.true(obj!.A!.run()[4] instanceof E)

  t.true(obj!.B!.run()[0] === undefined)
  t.true(obj!.B!.run()[1] instanceof B)
  t.true(obj!.B!.run()[2] instanceof C)
  t.true(obj!.B!.run()[3] instanceof D)
  t.true(obj!.B!.run()[4] instanceof E)

  t.true(obj!.C!.run()[0] === undefined)
  t.true(obj!.C!.run()[1] === undefined)
  t.true(obj!.C!.run()[2] instanceof C)
  t.true(obj!.C!.run()[3] instanceof D)
  t.true(obj!.C!.run()[4] instanceof E)

  t.true(obj!.D!.run()[0] === undefined)
  t.true(obj!.D!.run()[1] === undefined)
  t.true(obj!.D!.run()[2] === undefined)
  t.true(obj!.D!.run()[3] instanceof D)
  t.true(obj!.D!.run()[4] instanceof E)

  t.true(obj!.E!.run()[0] === undefined)
  t.true(obj!.E!.run()[1] === undefined)
  t.true(obj!.E!.run()[2] === undefined)
  t.true(obj!.E!.run()[3] === undefined)
  t.true(obj!.E!.run()[4] instanceof E)
})

test('nested object order bug', t => {
  const obj: any = injectFactory({
    A,
    B,
    C,
    D,
    test1: {
      test2: E
    }
  })

  // console.log(obj.A.run())


  t.true(true)
})