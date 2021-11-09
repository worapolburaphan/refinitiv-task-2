import {useCallback, useEffect, useState} from 'react'

const useCategories = (): [string[], () => Promise<string[]>] => {
  const [categories, setCategories] = useState<string[]>([])

  const fetchCategories = useCallback(async (signal?) => {
    return fetch('https://api.publicapis.org/categories', { signal })
      .then((result) => result.json())
  }, [])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    fetchCategories(signal).then((result: string[]) => {
      setCategories(result)
    })
    return function cleanup () {
      abortController.abort()
    }
  }, [fetchCategories])

  return [categories, fetchCategories]
}

export default useCategories
