"use client";
import { SearchManufacturerProps } from '@/types'
import { Combobox, Transition } from '@headlessui/react'
import Image from 'next/image'

import { useState, Fragment } from 'react';
import { manufacturers } from '@/constants';
const SearchManufacturer = ({ manufacturer, setmanufacturer}: SearchManufacturerProps) => {
  const [query, setquery] = useState("");

  const filteredManufacturers = query === ""
    ? manufacturers
    : manufacturers.filter((manufacturer) => manufacturer.toLowerCase().replace(/\s+/g,"").includes(query.toLowerCase().replace(/\s+/g,"")));
  return (
    <div className='search-manufacturer'>
      <Combobox value={manufacturer} onChange ={setmanufacturer}>
        <div className='relative w-full'>
          <Combobox.Button className="absolute top-[14px]">
            <Image 
              src="/car-logo.svg"
              width={20}
              height={20}
              className="ml-4"
              alt="car-logo"

            />
          </Combobox.Button>
          <Combobox.Input 
            className="search-manufacturer__input"
            placeholder="Volkswagen"
            displayValue={(manufacturer: string) => manufacturer}
            onChange= {(event) => setquery(event.target.value)}
          />
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave = {() => setquery("")}
          >
            <Combobox.Options>
              {filteredManufacturers.length === 0 &&
              query !== "" ? (
                <Combobox.Option
                  value= { query }
                  className="search-manufacturer__option"
                >
                  Does not exist "{query}"
                </Combobox.Option>
              ): (
                filteredManufacturers.map((manufacturer) => (
                  <Combobox.Option
                    key={manufacturer}
                    className={({active}) => `relative search-manufacturer__option ${active ? 'bg-primary-blue text-white' : 'text-gray-900'}`}
                    value = {manufacturer}
                  >
                    {({selected, active}) => (
                      <>
                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'}`}>
                          {manufacturer}
                        </span>
                        {
                          selected ? (
                            <span className={`absolute inset-y-0 left-0 flex items-center pl-3 ${active ? "text-white" : 
                          "text-teal-600"}`}>
                            {/* <CheckIcon className="h-5 w-5" aria-hidden ="true"/> */}

                          </span>
                          ): null
                        }
                      </>
                    )}
                  </Combobox.Option>
                )
              ))
              }
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  )
}

export default SearchManufacturer