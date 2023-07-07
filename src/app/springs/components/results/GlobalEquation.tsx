'use client'
import React from 'react'
import { InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'

import { useSpringStore } from '../../../store/springStore'
import TwoDimensionalArray from '../shared/TwoDimensionalArray'

const GlobalEquation = () => {
  const fGlobal = useSpringStore((state) => state.res.f.global)
  const kGlobal = useSpringStore((state) => state.res.k.global)
  const uGlobal = useSpringStore((state) => state.res.u.global)
  return (
    <div className="flex w-80 items-center overflow-auto lg:w-auto">
      <TwoDimensionalArray arr={fGlobal} name={'fGlobal'} />
      <div className="mx-4 text-2xl">
        <InlineMath math="=" />
      </div>
      <TwoDimensionalArray arr={kGlobal} name={'kGlobal'} />
      <div className="mx-4 text-2xl">
        <InlineMath math="\cdot" />
      </div>
      <TwoDimensionalArray arr={uGlobal} name={'uGlobal'} />
    </div>
  )
}

export default GlobalEquation
