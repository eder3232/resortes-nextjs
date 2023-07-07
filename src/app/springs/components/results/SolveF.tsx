import React from 'react'

import { InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'

import TwoDimensionalArray from '../shared/TwoDimensionalArray'
import { useSpringStore } from '../../../store/springStore'

const SolveF = () => {
  const fr = useSpringStore((state) => state.res.f.restricted)
  const kru = useSpringStore((state) => state.res.k.kru)
  const uSolved = useSpringStore((state) => state.res.u.solved)
  const krr = useSpringStore((state) => state.res.k.krr)
  const ur = useSpringStore((state) => state.res.u.restricted)

  return (
    <div className="flex w-80 items-center overflow-auto lg:w-auto">
      <TwoDimensionalArray arr={fr} name={'Fr'} />

      <div className="mx-4 text-2xl">
        <InlineMath math="=" />
      </div>

      <TwoDimensionalArray arr={kru} name={'Kru'} />

      <div className="mx-4 text-2xl">
        <InlineMath math="\cdot" />
      </div>

      <TwoDimensionalArray arr={uSolved} name={'USolved'} />

      <div className="mx-4 text-2xl">
        <InlineMath math="+" />
      </div>

      <TwoDimensionalArray arr={krr} name={'Krr'} />

      <div className="mx-4 text-2xl">
        <InlineMath math="\cdot" />
      </div>

      <TwoDimensionalArray arr={ur} name={'Urr'} />
    </div>
  )
}

export default SolveF
