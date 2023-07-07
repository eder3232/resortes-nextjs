import React from 'react'
import { useSpringStore } from '../../store/springStore'
import ComboBox from './ComboBox'

const EdgesTable = () => {
  const edges = useSpringStore((state) => state.reactEdges)
  const edges_onChange = useSpringStore((state) => state.edges_onChange)
  const edges_onChange2 = useSpringStore((state) => state.edges_onChange2)
  const edges_onAddNewRow = useSpringStore((state) => state.edges_onAddNewRow)
  const edges_onDeleteRow = useSpringStore((state) => state.edges_onDeleteRow)
  const vertices = useSpringStore((state) => state.reactVertices)
  return (
    <div className="max-w-xs overflow-auto lg:max-w-min">
      <table className="table-md table w-auto table-auto bg-neutral">
        <thead>
          <tr>
            <td className="text-center">Add</td>
            <td className="text-center">Remove</td>
            <td className="text-center">Nombre</td>
            <td className="text-center">From</td>
            <td className="text-center">To</td>
            <td className="text-center">K</td>
          </tr>
        </thead>
        <tbody>
          {edges.map((edge, index) => (
            <tr key={edge.id} className="hover">
              <td className="text-center">
                <button onClick={() => edges_onAddNewRow(index)}>
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
                <button onClick={() => edges_onDeleteRow(index)}>
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
                  value={edge.name}
                  onChange={(e) => edges_onChange(e)}
                />
              </td>
              <td>
                {/* <input
                  className="input-bordered input-primary input w-32 text-right"
                  type="text"
                  name={`from-${index}`}
                  value={edge.from}
                  onChange={(e) => edges_onChange(e)}
                /> */}
                <ComboBox
                  value={edge}
                  onChange={edges_onChange2}
                  identifier={'from'}
                  index={index}
                  collection={vertices}
                />
              </td>
              <td>
                {/* <input
                  className="input-bordered input-primary input w-32 text-right"
                  type="text"
                  name={`to-${index}`}
                  value={edge.to}
                  onChange={(e) => edges_onChange(e)}
                /> */}
                <ComboBox
                  value={edge}
                  onChange={edges_onChange2}
                  identifier={'to'}
                  index={index}
                  collection={vertices}
                />
              </td>
              <td>
                <input
                  className="input-bordered input-primary input w-32 text-right"
                  type="text"
                  name={`k-${index}`}
                  value={edge.k}
                  onChange={(e) => edges_onChange(e)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default EdgesTable
