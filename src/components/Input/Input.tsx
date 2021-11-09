import {ChangeEventHandler, FunctionComponent} from 'react'

export interface InputProps {
  placeholder?: string
  className?: string
  onChange: ChangeEventHandler<HTMLInputElement>
  value: string
  prefixIcon: JSX.Element
}

const Input: FunctionComponent<InputProps> = ({ placeholder = 'Type Something', className = '', value, onChange, prefixIcon }) => {
  return (
    <div className='flex px-4 py-3 rounded-xl focus-within:ring-2 focus-within:ring-primary focus:shadow-xl transition-all'>
      { prefixIcon && (
        <div className='mr-2'>
          { prefixIcon }
        </div>
      )}
      <input
        value={value}
        onChange={onChange}
        className={`text-base outline-none font-bold` + className}
        placeholder={placeholder}
      />
    </div>

  )
}

export default Input
