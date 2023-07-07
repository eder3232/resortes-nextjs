'use client'
import React from 'react'
import { ILocalArrays } from '../../../logic/spring'

interface Props {
  locals: Map<string, ILocalArrays>
}

const Locals = ({ locals }: Props) => {
  return (
    <div className="flex flex-wrap gap-x-6 gap-y-4">
      {Array.from(locals).map((e, index) => (
        <div key={index} className="">
          <p className="text-2xl">Elemento {e[0]}:</p>
          <table className="table-md mt-4 table w-auto table-auto overflow-hidden bg-neutral">
            <thead>
              <tr className="text-center text-xl font-bold">
                <th colSpan={(e[1].local.length || 0) + 1}>{e[0]}</th>
              </tr>
              <tr>
                <th className="bg-neutral-focus"></th>
                {e[1].tableDOF.map((e, index) => (
                  <th
                    key={index}
                    className="bg-neutral-focus text-center text-base font-bold text-neutral-content"
                  >
                    {e + 1}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {e[1].local.map((row, index) => (
                <tr key={index}>
                  <td className="bg-neutral-focus text-center text-base font-bold">
                    {e[1].tableDOF[index] + 1}
                  </td>
                  {row.map((col, index) => (
                    <td
                      key={index}
                      className="w-16 text-center text-base text-neutral-content"
                    >
                      {col}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  )
}

export default Locals
