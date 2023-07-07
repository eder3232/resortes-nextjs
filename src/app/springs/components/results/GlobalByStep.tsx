'use client'
import React, { useState } from 'react'
import { cn } from '../../../utils/cn'
import TwoDimensionalArray from '../shared/TwoDimensionalArray'

interface Props {
  kGlobalHistory: {
    label: string
    value: number[][]
  }[]
}

const GlobalByStep = ({ kGlobalHistory }: Props) => {
  const [current, setCurrent] = useState<number>(kGlobalHistory.length - 1)
  return (
    <div className="w-80 overflow-auto lg:w-[850px]">
      {/* Stepper */}
      <div>
        <ol className="flex w-full items-center">
          {kGlobalHistory.map((e, index) => (
            <li
              key={index}
              className={cn('flex w-full items-center', {
                "after:inline-block after:h-1 after:w-full after:border-4 after:border-b after:border-primary-focus after:content-[''] ":
                  index !== kGlobalHistory.length - 1,
              })}
              onClick={() => setCurrent(index)}
            >
              <span
                className={cn(
                  'flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-content lg:h-12 lg:w-12',
                  { 'bg-secondary': index === current }
                )}
              >
                {e.label}
              </span>
            </li>
          ))}
        </ol>
      </div>
      {/* matriz global de rigidez */}
      <div className="md:flex md:justify-center">
        <TwoDimensionalArray
          arr={kGlobalHistory[current].value}
          name={kGlobalHistory[current].label}
        />
      </div>
    </div>
  )
}

export default GlobalByStep
