import {ChangeEventHandler, useCallback, useState} from 'react'

const useInputChange = (): [string, ChangeEventHandler] => {
  const [input, setInput] = useState('')

  const onChange = useCallback<ChangeEventHandler<HTMLInputElement>>((e) => {
    setInput(e.target.value)
  }, [])

  return [input, onChange]
}

export default useInputChange
