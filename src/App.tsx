import React, {useMemo, useState} from 'react';
import './App.css';
import Input from './components/Input'
import useCategories from './hooks/useCategories'
import useInputChange from './hooks/useInputChange'
import { SearchCircleIcon } from '@heroicons/react/outline'
import TextHighlight from './components/TextHighlight/TextHighlight'

function App() {
  const [search, onSearchChange] = useInputChange()
  const [categories] = useCategories()

  const filteredCategories = useMemo<string[]>(() => {
    return categories.filter((categ) => {
      return categ.trim().toLowerCase().includes(search.trim().toLowerCase())
    })
  }, [categories, search])

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
              <th className='border-b border-t border-gray-100 text-left pl-4 py-2 text-gray-600'>
                Categories
              </th>
            </thead>
            <tbody>
            <div className='max-h-48 overflow-y-auto'>
              {
                filteredCategories.length > 0 ?
                  filteredCategories.map((category) => (
                    <tr>
                      <td className='px-4 text-gray-500'>
                        <TextHighlight text={category} textHighlight={search} />
                      </td>
                    </tr>
                  ))
                : (
                  <tr>
                    <td className='px-4 py-4 text-gray-500'>No items to display</td>
                  </tr>
                )
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
