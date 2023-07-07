'use client'

import React from 'react'
import { InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import { useSpringStore } from '../../../store/springStore'
import TwoDimensionalArray from '../shared/TwoDimensionalArray'

const SolveU = () => {
  const uu = useSpringStore((state) => state.res.u.unrestricted)
  const kuu = useSpringStore((state) => state.res.k.kuu)
  const fu = useSpringStore((state) => state.res.f.unrestricted)
  const kur = useSpringStore((state) => state.res.k.kur)
  const ur = useSpringStore((state) => state.res.u.restricted)

  return (
    <div className="flex w-80 items-center overflow-auto lg:w-auto">
      <TwoDimensionalArray arr={uu} name={'Uu'} />

      <div className="mx-4 text-2xl">
        <InlineMath math="=" />
      </div>

      <TwoDimensionalArray arr={kuu} name={'Kuu'} />

      <div className="mx-4 text-2xl">
        <InlineMath math="^{-1}" />
      </div>

      <div className="mx-4 text-2xl">
        <InlineMath math="\cdot \{" />
      </div>

      <TwoDimensionalArray arr={fu} name={'Fu'} />

      <div className="mx-4 text-2xl">
        <InlineMath math="-" />
      </div>

      <TwoDimensionalArray arr={kur} name={'Kur'} />

      <div className="mx-4 text-2xl">
        <InlineMath math="\cdot" />
      </div>

      <TwoDimensionalArray arr={ur} name={'Ur'} />

      <div className="mx-4 text-2xl">
        <InlineMath math="\}" />
      </div>
    </div>
  )
}

export default SolveU
