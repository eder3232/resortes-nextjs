import React from 'react'

import 'katex/dist/katex.min.css'
import { InlineMath } from 'react-katex'
import { useSpringStore } from '../../../store/springStore'
import TwoDimensionalArray from '../shared/TwoDimensionalArray'
import { cn } from '../../../utils/cn'

const GlobalSplited = () => {
  const fr = useSpringStore((state) => state.res.f.restricted)

  const fu = useSpringStore((state) => state.res.f.unrestricted)

  const ur = useSpringStore((state) => state.res.u.restricted)

  const uu = useSpringStore((state) => state.res.u.unrestricted)

  const krr = useSpringStore((state) => state.res.k.krr)

  const kru = useSpringStore((state) => state.res.k.kru)

  const kur = useSpringStore((state) => state.res.k.kur)

  const kuu = useSpringStore((state) => state.res.k.kuu)

  const isRestrictedAbove = useSpringStore(
    (state) => state.config.isRestrictedAbove
  )

  return (
    <div className="flex w-80 items-center overflow-auto lg:w-auto">
      <div
        className={cn('flex flex-col', {
          'flex-col-reverse': isRestrictedAbove,
        })}
      >
        <TwoDimensionalArray arr={fu} name={'Fu'} />
        <TwoDimensionalArray arr={fr} name={'Fr'} />
      </div>
      <div className="mx-4 text-2xl">
        <InlineMath math="=" />
      </div>
      <div>
        {isRestrictedAbove ? (
          <div className="flex items-center gap-x-4">
            <div className="flex flex-col">
              <TwoDimensionalArray arr={krr} name={'Krr'} />
              <TwoDimensionalArray arr={kur} name={'Kur'} />
            </div>
            <div className="flex flex-col">
              <TwoDimensionalArray arr={kru} name={'Kru'} />
              <TwoDimensionalArray arr={kuu} name={'Kuu'} />
            </div>
          </div>
        ) : (
          <div className="flex">
            <div className="flex flex-col">
              <TwoDimensionalArray arr={kuu} name={'Kuu'} />
              <TwoDimensionalArray arr={kru} name={'ru'} />
            </div>
            <div className="flex flex-col">
              <TwoDimensionalArray arr={kur} name={'Kur'} />
              <TwoDimensionalArray arr={krr} name={'Krr'} />
            </div>
          </div>
        )}
      </div>
      <div className="mx-4 text-2xl">
        <InlineMath math="\cdot" />
      </div>
      <div
        className={cn('flex flex-col', {
          'flex-col-reverse': isRestrictedAbove,
        })}
      >
        <TwoDimensionalArray arr={uu} name={'Uu'} />
        <TwoDimensionalArray arr={ur} name={'Ur'} />
      </div>
    </div>
  )
}
export default GlobalSplited
