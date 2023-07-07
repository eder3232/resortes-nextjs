import React from 'react'
import { InlineMath } from 'react-katex'
import 'katex/dist/katex.min.css'
import { useSpringStore } from '../../../store/springStore'
import { useState } from 'react'
import { Listbox } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

const arr = [
  { id: 0, name: '0' },
  { id: 1, name: '1' },
  { id: 2, name: '2' },
  { id: 3, name: '3' },
  { id: 4, name: '4' },
  { id: 5, name: '5' },
  { id: 6, name: '6' },
  { id: 7, name: '7' },
  { id: 8, name: '8' },
]

const InternalForces = () => {
  const [selected, setSelected] = useState(arr[2])
  const internalForces = useSpringStore(
    (state) => state.res.utils.internalForces
  )
  return (
    <div>
      <div className="relative w-64">
        <Listbox value={selected} onChange={setSelected}>
          <div className="relative mt-1">
            <Listbox.Button className="btn-accent btn relative w-full">
              <span className="block truncate">
                Número de decimales: {selected.name}
              </span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>
            <Listbox.Options className="absolute mt-1 w-full overflow-auto rounded-md bg-neutral-900 py-1">
              {arr.map((e, i) => (
                <Listbox.Option
                  key={i}
                  value={e}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active
                        ? 'bg-accent text-accent-content'
                        : 'text-primary-content'
                    }`
                  }
                >
                  {({ selected }) => (
                    <div className="">
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {e.id}
                        {/* {selected ? 'Seleccionado' : 'No seleccionado'} */}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-accent">
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </div>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>
      </div>
      <div className="my-4 flex flex-col gap-y-4">
        {Array.from(internalForces).map((e, index) => (
          <div key={index} className="flex flex-col gap-y-2">
            <p className="text-2xl text-accent">Elemento {e[0]}:</p>

            <p>Para calcular la deformación tenemos:</p>

            <div>
              <InlineMath
                math={`\\Delta_{${e[0]}} = ${e[1].u_j.toFixed(
                  selected.id
                )} - ${e[1].u_i.toFixed(selected.id)}`}
              />
            </div>
            <div>
              <InlineMath
                math={`\\Delta_{${e[0]}} = ${(e[1].u_j - e[1].u_i).toFixed(
                  selected.id
                )}`}
              />
            </div>

            <p>Para la fuerza interna tenemos:</p>

            <div>
              <InlineMath
                math={`F_{${e[0]}} = ${e[1].k.toFixed(selected.id)} \\cdot ${(
                  e[1].u_j - e[1].u_i
                ).toFixed(selected.id)}`}
              />
            </div>

            <div>
              <InlineMath
                math={`F_{${e[0]}} = ${e[1].internalForce.toFixed(
                  selected.id
                )}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default InternalForces
