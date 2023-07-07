'use client'
import React, { useLayoutEffect } from 'react'
import VerticesTable from './springs/components/VerticesTable'
import { useSpringStore } from './store/springStore'
import EdgesTable from './springs/components/EdgesTable'
import Results from './springs/components/Results'
import Errors from './springs/components/Errors'

const Page = () => {
  const calculate = useSpringStore((state) => state.calculate)
  const isCalculated = useSpringStore((state) => state.isCalculated)
  const firstCalculate = useSpringStore((state) => state.firstCalculate)

  const config = useSpringStore((state) => state.config)

  const controller_userWantToDefineDOF = useSpringStore(
    (state) => state.controller_userWantToDefineDOF
  )

  const controller_isRestrictedAbove = useSpringStore(
    (state) => state.controller_isRestrictedAbove
  )

  useLayoutEffect(() => {
    calculate()
    firstCalculate()
  })

  return (
    <div className="container px-1 lg:px-6">
      <h1 className="my-4 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
        Resortes
      </h1>

      <h2 className="my-4 text-2xl font-bold text-secondary sm:text-3xl">
        Ingresa los datos
      </h2>

      <h3 className="my-4 text-xl font-bold sm:text-2xl">Nudos</h3>

      <div className="my-4">
        <div className="my-4 flex items-center">
          <span className="font-bold">
            ¿Desea ingresar los grados de libertad?
          </span>
          <input
            type="checkbox"
            className="checkbox-primary checkbox checkbox-md ml-2"
            checked={config.userWantToDefineDOF}
            onChange={controller_userWantToDefineDOF}
          />
        </div>

        <VerticesTable />
      </div>

      <h3 className="my-4 text-xl font-bold sm:text-2xl">Resortes</h3>

      <div className="my-4">
        <EdgesTable />
      </div>

      <div className="my-4 flex items-center">
        <span className="font-bold">¿Los restringidos van arriba?</span>
        <input
          type="checkbox"
          className="checkbox-primary checkbox checkbox-md ml-2"
          checked={config.isRestrictedAbove}
          onChange={controller_isRestrictedAbove}
        />
      </div>

      <button className="btn-primary btn" onClick={() => calculate()}>
        Calcular
      </button>

      <Errors />
      {isCalculated && <Results />}
    </div>
  )
}

export default Page
