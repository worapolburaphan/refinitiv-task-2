import React, {useCallback, useMemo, useState} from 'react';
import './App.css';
import Input from './components/Input'
import useCategories from './hooks/useCategories'
import useInputChange from './hooks/useInputChange'
import { SearchCircleIcon } from '@heroicons/react/outline'
import TextHighlight from './components/TextHighlight/TextHighlight'
import _sample from 'lodash/sample'

let previousRandom: number

function App() {
  const [search, onSearchChange] = useInputChange()
  const { data: categories, loading } = useCategories()

  const filteredCategories = useMemo<string[]>(() => {
    return categories.filter((categ) => {
      return categ.trim().toLowerCase().includes(search.trim().toLowerCase())
    })
  }, [categories, search])

  const randomWidth = useCallback((): number => {
    const result = _sample([16,24,28,32]) as number
    if (result === previousRandom) {
      return randomWidth()
    }
    previousRandom = result
    return result
  }, [])

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className='p-4 shadow-xl rounded-b-xl'>
        <div className='mb-4'>
          <Input
            prefixIcon={<SearchCircleIcon className='text-gray-200 w-6' />}
            className='focus:w-full'
            placeholder='Search Category'
            onChange={onSearchChange}
            value={search}
          />
        </div>
        <div>
          <table className='w-full'>
            <thead>
              <tr>
                <th className='border-b border-t border-gray-100 text-left pl-4 py-2 text-gray-600'>
                  Categories
                </th>
              </tr>
            </thead>
            <tbody>
              <div className='max-h-48 overflow-y-auto'>
                {
                  filteredCategories.length > 0 ?
                    filteredCategories.map((category) => (
                      <tr key={category}>
                        <td className='px-4 text-gray-500'>
                          {search.trim() && <TextHighlight text={category} textHighlight={search} />}
                          {!search.trim() && <span>{category}</span>}
                        </td>
                      </tr>
                    ))
                  : !loading ? (
                    <tr>
                      <td className='px-4 py-4 text-gray-500'>No items to display</td>
                    </tr>
                  //  Skeleton render
                  ) : Array(10).fill(null).map((_, i) => (
                    <tr key={i}>
                      <td className='px-4 py-1 text-gray-500 text-center w-full'>
                        <div className={`animate-pulse w-${randomWidth()} h-4 bg-gray-300 rounded-md`} />
                      </td>
                    </tr>
                  ))
                }
              </div>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
