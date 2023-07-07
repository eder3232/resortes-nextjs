'use client'
import { Fragment, useState } from 'react'
import { Combobox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

// const collection:{id:number;name:string}[] = [
//   { id: 1, name: "Wade Cooper" },
//   { id: 2, name: "Arlene Mccoy" },
//   { id: 3, name: "Devon Webb" },
//   { id: 4, name: "Tom Cook" },
//   { id: 5, name: "Tanya Fox" },
//   { id: 6, name: "Hellen Schmidt" },
// ];

interface Props {
  collection: { id: string; name: string }[]
  value: { id: string; name: string }
  onChange: (value: string, index: number, identifier: string) => void
  identifier: 'from' | 'to'
  index: number
}

const ComboBox = ({
  value,
  onChange,
  identifier,
  index,
  collection,
}: Props) => {
  const [query, setQuery] = useState('')

  const filteredPeople =
    query === ''
      ? collection
      : collection.filter((person) =>
          person.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        )
  return (
    <div className="relative w-32">
      <Combobox
        value={value}
        onChange={(v) => onChange(v.name, index, identifier)}
      >
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded-lg  text-left sm:text-sm">
            <Combobox.Input
              className="input-bordered input-primary input w-full"
              displayValue={(v: {
                id: string
                name: string
                from: string
                to: string
                k: string
              }) => v[identifier]}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-secondary-content"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-neutral py-1 text-base shadow-lg ring-1 ring-primary ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredPeople.length === 0 && query !== '' ? (
                <div className="relative cursor-default select-none bg-neutral px-4 py-2 text-primary-content">
                  Nothing found.
                </div>
              ) : (
                filteredPeople.map((v) => (
                  <Combobox.Option
                    key={v.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active
                          ? 'bg-primary text-primary-content'
                          : 'bg-neutral text-secondary-content'
                      }`
                    }
                    value={v}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? 'font-medium' : 'font-normal'
                          }`}
                        >
                          {v.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? 'text-white' : 'text-teal-600'
                            }`}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}

export default ComboBox
