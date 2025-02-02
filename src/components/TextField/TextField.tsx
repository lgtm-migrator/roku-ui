import './TextField.css'
import classnames from 'classnames'
import {
  ChangeEvent, Dispatch,
  InputHTMLAttributes,
  ReactNode, SetStateAction,
} from 'react'
import { Colors } from '../..'

export type TextFieldProps = {
  className?: string
  value: any
  prefix?: ReactNode
  suffix?: ReactNode
  size?: 'sm' | 'md' | 'lg'
  placeholder?: string
  borderType?: 'dash' | 'solid' | 'dot'
  border?: boolean
  setValue?: Dispatch<SetStateAction<any>>
  textAlign?: 'left' | 'center' | 'right'
  ring?: boolean
  format?: (value: string) => string
  color?: Colors
} & Omit<InputHTMLAttributes<HTMLInputElement>, 'size' | 'prefix' | 'suffix'>

export function TextField ({
  className,
  prefix,
  suffix,
  size = 'md',
  ring = true,
  placeholder,
  textAlign = 'left',
  border = false,
  borderType = 'solid',
  color = 'primary',
  value, setValue,
  ...inputProps
}: TextFieldProps) {
  let onChange
  if (inputProps.onChange != null) {
    onChange = inputProps.onChange
  } else if (setValue != null) {
    onChange = (e: ChangeEvent<HTMLInputElement>) => { setValue(e.target.value) }
  }

  return (
    <span
      className={classnames(
        className,
        'r-text-field-wrapper',
        `r-text-field-wrapper-${size}`,
        `r-text-field-${borderType}`,
        {
          'r-text-field-border': border,
          'r-text-field-fill': !border,
          'r-text-field-ring': ring,
        },
        { [`ring-${color}-2`]: color },
      )}
    >
      {prefix && <div className="r-text-field-prefix">{prefix}</div>}
      <input
        className={classnames('r-text-field', {
          'text-center': textAlign === 'center',
          'text-left': textAlign === 'left',
          'text-right': textAlign === 'right',
        })}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...inputProps}
      />
      {suffix && <div className="r-text-field-suffix">{suffix}</div>}
    </span>
  )
}
