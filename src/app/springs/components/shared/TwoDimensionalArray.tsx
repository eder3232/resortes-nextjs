'use client'
import React, { useState } from 'react'
import { Listbox } from '@headlessui/react'
import { CheckIcon } from '@heroicons/react/20/solid'

interface Props {
  arr: (number | string)[][]
  name: string
  decimals?: number
}

const decimalsArray = [
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

const TwoDimensionalArray = ({ arr, name, decimals = 2 }: Props) => {
  const index = decimalsArray.findIndex((e) => e.id === decimals)
  const [selected, setSelected] = useState(decimalsArray[index])
  if (arr.length === 0) return <></>
  if (arr[0].length === 0) return <></>
  return (
    <div className="my-4">
      <table className="table w-auto table-auto overflow-hidden bg-neutral">
        <thead>
          <tr className="text-center text-xl font-bold text-primary-content">
            <th colSpan={arr[0].length + 1}>{name}</th>
          </tr>
          <tr className="bg-primary">
            <th className="text-primary-content">
              <div className="relative">
                <Listbox value={selected} onChange={setSelected}>
                  <div>
                    <Listbox.Button className="inline-flex justify-center">
                      .00
                    </Listbox.Button>
                    <Listbox.Options className="absolute mt-1 max-h-60 w-24 overflow-auto rounded-md bg-primary-content py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                      {decimalsArray.map((e, index) => (
                        <Listbox.Option
                          key={e.id}
                          value={e}
                          className={({ active }) =>
                            `relative cursor-default select-none py-2 pl-10 pr-4 ${
                              active
                                ? 'bg-amber-100 text-amber-900'
                                : 'text-gray-900'
                            }`
                          }
                        >
                          {({ selected }) => (
                            <>
                              <span
                                className={`block w-8 truncate ${
                                  selected ? 'font-medium' : 'font-normal'
                                }`}
                              >
                                {e.name}
                              </span>
                              {selected ? (
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                  <CheckIcon
                                    className="h-5 w-5"
                                    aria-hidden="true"
                                  />
                                </span>
                              ) : null}
                            </>
                          )}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </div>
                </Listbox>
              </div>
            </th>
            {arr[0].map((e, index) => (
              <th
                className="bg-neutral-focus text-center text-base font-bold text-neutral-content"
                key={index}
              >
                {index + 1}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {arr.map((row, index) => (
            <tr key={index}>
              <td className="bg-neutral-focus text-center text-base font-bold text-neutral-content">
                {index + 1}
              </td>
              {row.map((col, index) => (
                <td
                  key={index}
                  className="w-16 text-center text-base text-primary-content"
                >
                  {typeof col === 'number' ? col.toFixed(selected.id) : col}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default TwoDimensionalArray
