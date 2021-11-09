import {FunctionComponent, useMemo} from 'react'

export interface TextHighlightProps {
  text: string
  textHighlight: string
}

const TextHighlight: FunctionComponent<TextHighlightProps> = ({ text, textHighlight }) => {
  const highlightStartAt = useMemo(() => {
    return textHighlight.trim() ? text.toLowerCase().indexOf(textHighlight.toLowerCase().trim()) : -1
  }, [text, textHighlight])
  console.log(highlightStartAt)
  return (
    <span>
      { highlightStartAt >= 0 ? (
        <>
          <span>{text.substring(0, highlightStartAt)}</span>
          <span className='text-primary'>
            {text.substr(highlightStartAt, textHighlight.trim().length)}
          </span>
          <span>{text.substring(highlightStartAt + textHighlight.trim().length)}</span>
        </>
      ) : <span className='text-gray-900'>{text}</span>}
    </span>
  )
}

export default TextHighlight
