'use client'

import React from 'react'
import { useSpringStore } from '../../store/springStore'

const VerticesTable = () => {
  const config = useSpringStore((state) => state.config)
  const vertices = useSpringStore((state) => state.reactVertices)
  const vertices_onChange = useSpringStore((state) => state.vertices_onChange)
  const vertices_onClickCheckbox = useSpringStore(
    (state) => state.vertices_onClickCheckbox
  )

  const vertices_onAddNewRow = useSpringStore(
    (state) => state.vertices_onAddNewRow
  )
  const vertices_onDeleteRow = useSpringStore(
    (state) => state.vertices_onDeleteRow
  )
  return (
    <div className="max-w-xs overflow-auto lg:max-w-min">
      <table className="table-md table w-auto table-auto bg-neutral">
        <thead>
          <tr>
            <th className="text-center">Add</th>
            <th className="text-center">Remove</th>
            <th className="text-center">Nombre</th>
            <th className="text-center">Fuerza</th>
            <th className="text-center">Desplazamiento</th>
            <th className="text-center">Restringido</th>
            <th
              className="text-center"
              style={{
                display: config.userWantToDefineDOF ? 'table-cell' : 'none',
              }}
            >
              Grado de libertad
            </th>
          </tr>
        </thead>
        <tbody>
          {vertices.map((vertex, index) => (
            <tr key={vertex.id} className="hover">
              <td className="text-center">
                <button onClick={() => vertices_onAddNewRow(index)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </td>
              <td className="text-center">
                <button onClick={() => vertices_onDeleteRow(index)}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
              </td>
              <td>
                <input
                  className="input-bordered input-primary input w-32 text-right"
                  type="text"
                  name={`name-${index}`}
                  value={vertex.name}
                  onChange={(e) => vertices_onChange(e)}
                />
              </td>
              <td className="">
                <input
                  className="input-bordered input-primary input w-32 text-right"
                  type="text"
                  name={`force-${index}`}
                  value={vertex.force}
                  onChange={(e) => vertices_onChange(e)}
                />
              </td>
              <td className="">
                <input
                  className="input-bordered input-primary input w-32 text-right"
                  type="text"
                  name={`displacement-${index}`}
                  value={vertex.displacement}
                  onChange={(e) => vertices_onChange(e)}
                />
              </td>
              <td className="text-center">
                <input
                  className=" checkbox-primary checkbox checkbox-md"
                  type="checkbox"
                  name={`isRestricted-${index}`}
                  checked={vertex.isRestricted}
                  onChange={(e) => vertices_onClickCheckbox(e)}
                />
              </td>
              <td
                className=""
                style={{
                  display: config.userWantToDefineDOF ? 'table-cell' : 'none',
                }}
              >
                <input
                  className="input-bordered input-primary input w-32 text-right"
                  type="text"
                  name={`userDOF-${index}`}
                  value={vertex.userDOF}
                  onChange={(e) => vertices_onChange(e)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default VerticesTable
