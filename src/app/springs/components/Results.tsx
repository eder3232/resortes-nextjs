'use client'
import React from 'react'
import 'katex/dist/katex.min.css'
import { InlineMath } from 'react-katex'

import { useSpringStore } from '../../store/springStore'
import Locals from './results/Locals'
import GlobalByStep from './results/GlobalByStep'
import GlobalEquation from './results/GlobalEquation'
import GlobalSplited from './results/GlobalSplited'
import SolveU from './results/SolveU'
import ResU from './results/ResU'
import SolveF from './results/SolveF'
import ResF from './results/ResF'
import InternalForces from './results/InternalForces'

const Results = () => {
  const orderDOF = useSpringStore((state) => state.res.orderDOF)
  const locals = useSpringStore((state) => state.res.locals)
  const config = useSpringStore((state) => state.config)
  const kGlobalHistory = useSpringStore(
    (state) => state.res.utils.kGlobalHistory
  )

  const errors = useSpringStore((state) => state.errors)
  const isEmptyVerticesErrors = errors.vertices.length === 0
  const isEmptyEdgesErrors = errors.edges.length === 0
  const isEmptyLogicErrors = errors.logic.length === 0
  const isEmptyErrors =
    isEmptyVerticesErrors && isEmptyEdgesErrors && isEmptyLogicErrors

  return (
    <div className="my-6 flex flex-col space-y-4">
      <h3 className="text-4xl font-bold tracking-wide text-primary">
        Resultados:
      </h3>

      {/* Orden de los grados de libertad */}
      <div className="flex flex-col space-y-2">
        <h4 className="text-3xl text-secondary">
          Definimos el orden de los grados de libertad:
        </h4>
        <p>Por defecto los grados de libertad restringidos van arriba.</p>
        {config.userWantToDefineDOF && (
          <p>
            Los nudos restringidos se ordenarán ascendentemente de acuerdo al
            grado de libertad ingresado, al igual que los no restringidos.
          </p>
        )}
        <p className="text-info">
          (Puede invertir el orden de los grados de libertad con la opción: Los
          restringidos van arriba.)
        </p>
        <p>El orden de los grados de libertad será el siguiente:</p>
        <div className="flex flex-col space-y-1 py-2">
          {orderDOF.map((e, index) => (
            <div key={e.id}>
              <p>
                Posicion {index + 1} - Nudo: {e.id}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Matrices locales de rigidez de cada elemento */}
      <div className="flex flex-col gap-y-4">
        <h4 className="text-3xl text-secondary">
          Matrices locales de rigidez de cada elemento:
        </h4>

        <p>
          La matriz local de rigidez de cada elemento tiene la siguiente forma:
        </p>

        <div className="ml-0 text-xl md:ml-8">
          <InlineMath
            math="\begin{bmatrix} 
          k & -k\\
          -k & k
          \end{bmatrix}"
          />
        </div>

        <p>
          Las etiquetas en filas y columnas se corresponden con los grados de
          libertad asociados.
        </p>

        <div className="my-4">
          <Locals locals={locals} />
        </div>
      </div>

      {/* Matriz global de rigidez por pasos*/}
      <div className="flex flex-col gap-y-4">
        <h4 className="text-3xl text-secondary">
          Ensamblado de la matriz global de rigideces:
        </h4>
        <p>Proceso de ensamblado de la matriz global de rigideces.</p>
        <GlobalByStep kGlobalHistory={kGlobalHistory} />
      </div>
      {/* Ecuacion global de rigidez */}
      <div className="flex flex-col gap-y-4">
        <h4 className="text-3xl text-secondary">Ecuación global de rigidez:</h4>
        <p>La ecuación global de rigideces tiene la siguiente forma:</p>
        <div className="ml-0 text-xl md:ml-8">
          <InlineMath math="\begin{bmatrix}F\end{bmatrix}=\begin{bmatrix}K\end{bmatrix} \cdot \begin{bmatrix}U\end{bmatrix}" />
        </div>
        <p>La ecuación global de rigideces tiene la siguiente forma:</p>

        <GlobalEquation />
      </div>

      {/* Ecuacion global de rigidez */}
      <div className="flex flex-col gap-y-4">
        <h4 className="text-3xl text-secondary">
          Separando la ecuación global de rigidez:
        </h4>
        <p>
          Se puede definir la ecuación matricial de rigidez de una forma más
          reducida:
        </p>
        {config.isRestrictedAbove ? (
          <div className="ml-0 text-xl md:ml-8">
            <InlineMath
              math="\begin{bmatrix} F_r\\F_u \end{bmatrix}
            =
            \begin{bmatrix} K_{rr} & K_{ru} \\ K_{ur} & K_{uu} \end{bmatrix}
            \cdot 
            \begin{bmatrix} U_r\\U_u \end{bmatrix}"
            />
          </div>
        ) : (
          <div className="ml-0 text-xl md:ml-8">
            <InlineMath
              math="\begin{bmatrix} F_u\\F_r \end{bmatrix}
            =
            \begin{bmatrix} K_{uu} & K_{ur} \\ K_{ru} & K_{rr} \end{bmatrix}
            \cdot 
            \begin{bmatrix} U_u\\U_r \end{bmatrix}"
            />
          </div>
        )}
        <p>Se forman las siguientes matrices de rigidez:</p>

        <GlobalSplited />
      </div>

      {/* Esta parte es condicional puede fallar */}
      {isEmptyErrors && (
        <div>
          {/* Cálculo de desplazamientos */}
          <div className="flex flex-col gap-y-4">
            <h4 className="text-3xl text-secondary">
              Cálculo de desplazamientos no restringidos
            </h4>
            <p>
              Se despeja de la ecuacion global de rigidez los desplazamientos no
              restringidos:
            </p>

            <div className="ml-0 text-xl md:ml-8">
              <InlineMath
                math="\begin{bmatrix} U_u \end{bmatrix}
            =
            \begin{bmatrix} K_{uu} \end{bmatrix}^{-1}
            \cdot
            \{
              \begin{bmatrix} F_u \end{bmatrix}
              -
              \begin{bmatrix} K_{ur} \end{bmatrix}
              \cdot
              \begin{bmatrix} U_r \end{bmatrix}
            \} 
            "
              />
            </div>
            <p>Entonces se tiene la siguiente ecuación:</p>

            <SolveU />

            <p>Resolviendo se obtiene:</p>

            <ResU />
          </div>

          {/* Cálculo de fuerzas */}
          <div className="flex flex-col gap-y-4">
            <h4 className="text-3xl text-secondary">
              Cálculo de fuerzas restringidas
            </h4>
            <p>
              Se despeja de la ecuacion global de rigidez las fuerzas
              restringidas:
            </p>

            <div className="ml-0 text-xl md:ml-8">
              <InlineMath
                math="\begin{bmatrix} F_r \end{bmatrix}
                =
                \begin{bmatrix} K_{ru} \end{bmatrix}
                \cdot
                \begin{bmatrix} U_{u} \end{bmatrix}
                +
                \begin{bmatrix} K_{rr} \end{bmatrix}
                \cdot
                \begin{bmatrix} U_{r} \end{bmatrix}
                "
              />
            </div>
            <p>Entonces se tiene la siguiente ecuación:</p>

            <SolveF />

            <p>Resolviendo se obtiene:</p>

            <ResF />
          </div>
          {/* Fuerzas internas */}
          <div className="flex flex-col gap-y-4">
            <h4 className="text-3xl text-secondary">Fuerzas internas</h4>
            <p>Para calcular las deformaciones y fuerzas internas tenemos:</p>

            <div className="ml-0 text-xl md:ml-8">
              <InlineMath math="\Delta= U_j - U_i" />
            </div>

            <div className="ml-0 text-xl md:ml-8">
              <InlineMath math="F =  k \cdot \Delta" />
            </div>

            <p>
              Se procede a calcular las deformaciones y fuerzas internas de cada
              elemento:
            </p>

            <InternalForces />
          </div>
        </div>
      )}
    </div>
  )
}

export default Results
