'use client'
import React from 'react'

import { InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import TwoDimensionalArray from '../shared/TwoDimensionalArray'
import { useSpringStore } from '../../../store/springStore'

const ResU = () => {
  const uu = useSpringStore((state) => state.res.u.unrestricted)

  const uSolved = useSpringStore((state) => state.res.u.solved)

  return (
    <div className="flex items-center">
      <TwoDimensionalArray arr={uu} name={'Uu'} />

      <div className="mx-4 text-2xl">
        <InlineMath math="=" />
      </div>

      <TwoDimensionalArray arr={uSolved} name={'UuSolved'} />
    </div>
  )
}

export default ResU
