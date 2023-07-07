import React from 'react'
import { useSpringStore } from '../../store/springStore'

const Errors = () => {
  const errors = useSpringStore((state) => state.errors)
  const isEmptyVerticesErrors = errors.vertices.length === 0
  const isEmptyEdgesErrors = errors.edges.length === 0
  const isEmptyLogicErrors = errors.logic.length === 0
  const isEmptyErrors =
    isEmptyVerticesErrors && isEmptyEdgesErrors && isEmptyLogicErrors

  return (
    <div className="my-6 w-80 lg:w-[700px]">
      {!isEmptyErrors ? (
        <div className="flex flex-col space-y-4">
          {/* Vertices */}
          {!isEmptyVerticesErrors && (
            <div className="flex flex-col space-y-4">
              {errors.vertices.map((error, i) => (
                <div className="alert alert-error" key={i}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 shrink-0 stroke-current text-primary-content"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-primary-content">
                    {`Error: ${error.name} - ${error.message}`}
                  </span>
                </div>
              ))}
            </div>
          )}
          {/* Edges */}
          {!isEmptyEdgesErrors && (
            <div className="flex flex-col space-y-4">
              {errors.edges.map((error, i) => (
                <div className="alert alert-error" key={i}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 shrink-0 stroke-current text-primary-content"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-primary-content">
                    {`Error: ${error.name} - ${error.message}`}
                  </span>
                </div>
              ))}
            </div>
          )}
          {/* Logica */}
          {!isEmptyLogicErrors && (
            <div className="flex flex-col space-y-4">
              {errors.logic.map((error, i) => (
                <div className="alert alert-error" key={i}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 shrink-0 stroke-current text-primary-content"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <span className="text-primary-content">
                    {`Error: ${error.name} - ${error.message}`}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : null}
    </div>
  )
}

export default Errors
