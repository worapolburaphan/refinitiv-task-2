import {useCallback, useEffect, useState} from 'react'

type ResultUseCategories = {
  data: string[],
  fetch: () => Promise<string[]>,
  loading: boolean
}

const useCategories = (): ResultUseCategories => {
  const [categories, setCategories] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  const fetchCategories = useCallback(async (signal?) => {
    return fetch('https://api.publicapis.org/categories', { signal })
      .then((result) => result.json())
  }, [])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    setLoading(true)
    fetchCategories(signal).then((result: string[]) => {
      setCategories(result)
      setLoading(false)
    })
    return function cleanup () {
      abortController.abort()
    }
  }, [fetchCategories])

  return {data: categories, fetch: fetchCategories, loading}
}

export default useCategories
