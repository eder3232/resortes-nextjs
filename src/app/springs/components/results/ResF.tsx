'use client'
import React from 'react'

import { InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'

import TwoDimensionalArray from '../shared/TwoDimensionalArray'
import { useSpringStore } from '../../../store/springStore'

const ResF = () => {
  const fr = useSpringStore((state) => state.res.f.restricted)
  const fSolved = useSpringStore((state) => state.res.f.solved)

  return (
    <div className="flex items-center">
      <TwoDimensionalArray arr={fr} name={'Fr'} />

      <div className="mx-4 text-2xl">
        <InlineMath math="=" />
      </div>

      <TwoDimensionalArray arr={fSolved} name={'FSolved'} />
    </div>
  )
}

export default ResF
