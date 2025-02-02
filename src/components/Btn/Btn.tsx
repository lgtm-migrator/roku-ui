import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import {
  createContext, CSSProperties, HTMLAttributes, ReactNode, useContext, useMemo,
} from 'react'
import { Colors } from '../../utils/colors'
import { Loading } from '../../icons/Loading'
import { MaterialSymbolIcon } from '../MaterialSymbolIcon'
import './Btn.css'
import { Typography } from '../Typography'

export type ButtonProps = {
  label?: string
  size?: 'xs' | 'sm' | 'md' | 'lg'
  style?: CSSProperties
  rounded?: boolean
  color?: Colors
  hoverColor?: Colors
  filled?: boolean
  border?: boolean
  dash?: boolean
  text?: boolean
  disabled?: boolean
  onClick?: () => void
  loading?: boolean
  ring?: boolean
  children?: ReactNode
  className?: string
  icon?: boolean
  loadingIcon?: ReactNode
  leadingIcon?: ReactNode
  left?: boolean
  value?: any
  right?: boolean
} & HTMLAttributes<HTMLButtonElement>

interface BtnGroupCtxType {
  cancelable: any
  value: any
  setValue: ((value: any) => void)
  activeColor: Colors
}
const BtnGroupCtx = createContext<BtnGroupCtxType>({
  value: undefined,
  setValue: () => { },
  activeColor: 'primary',
  cancelable: false,
})

function BtnRoot ({
  label,
  size = 'md',
  color = 'default',
  hoverColor,
  dash = false,
  loading = false,
  disabled = false,
  border = false,
  rounded = false,
  ring = false,
  filled = true,
  text = false,
  style,
  children,
  onClick,
  className,
  icon = false,
  loadingIcon,
  leadingIcon = null,
  left,
  value,
  right,
  ...others
}: ButtonProps) {
  const ctx = useContext(BtnGroupCtx)
  const hColor = hoverColor ?? color
  const fgColor = color === 'default' ? 'fg' : color
  if (!loadingIcon) {
    loadingIcon = <Loading
      mainClassName="stroke-[hsl(var(--r-background-3))]"
      subClassName="stroke-[hsl(var(--r-background-2))]" />
  }
  if (value && value === ctx.value) {
    color = ctx.activeColor
  }
  const btnClass = classNames(
    'r-btn',
    `r-btn-${size}`,
    { 'r-btn-icon': icon },
    { 'r-btn-icon-border': icon && border },
    { 'r-btn-rounded': rounded },
    { 'r-btn-dash': dash },
    { 'r-btn-ring': ring },
    { 'r-btn-filled': filled && !text },
    { 'r-btn-text': text },
    { 'active:scale-[0.98]': true },
    { [`text-${fgColor}-2 hover:text-${hColor === 'default' ? 'fg' : hColor}-1 hover:bg-${hColor}-1/10`]: text },
    { [`bg-${color}-2 hover:bg-${color}-1 text-${color === 'default' ? 'frontground' : 'background'}-2`]: !text },
    { [`border-${color}-1`]: border },
    { 'border-transparent': !border },
    className,
  )
  const body = children ?? label
  const loadingFinalClass = classNames('leading-[0]', {
    'r-loading-xs': size === 'xs',
    'r-loading-sm': size === 'sm',
    'r-loading-md': size === 'md',
    'r-loading-lg': size === 'lg',
  })
  const clickCallback = onClick ?? (() => {
    if (value) {
      if (ctx.value !== value) {
        ctx.setValue(value)
      } else if (ctx.cancelable) {
        ctx.setValue(undefined)
      }
    }
  })
  if (icon) {
    return (
      <button
        className={btnClass}
        disabled={disabled}
        style={style}
        type="button"
        onClick={clickCallback}
        {...others}
      >
        <div
          className={loadingFinalClass}
        >
          {loading ? loadingIcon : children}
        </div>
      </button>
    )
  }
  return (
    <button
      className={btnClass}
      disabled={disabled}
      style={style}
      type="button"
      onClick={clickCallback}
    >
      <div className={classNames(
        'r-btn-main',
        { 'r-btn-left': left },
        { 'r-btn-right': right },
        { 'r-btn-center': !left && !right },
      )}
      >
        {leadingIcon
          ? (
            <div
              className={classNames(loadingFinalClass, 'r-btn-leading-icon')}
              style={{
                fontSize: size === 'sm' ? '1rem' : '1.5rem',
              }}
            >
              {loading ? loadingIcon : leadingIcon}
            </div>
          )
          : (
            <AnimatePresence>
              {loading && (
                <motion.div
                  layout
                  animate={{
                    marginRight: size === 'sm' ? 4 : 8,
                    width: size === 'lg' ? 20 : 16,
                    height: size === 'lg' ? 20 : 16,
                  }}
                  className={loadingFinalClass}
                  exit={{
                    marginRight: 0,
                    width: 0,
                    height: 0,
                  }}
                  initial={{
                    marginRight: 0,
                    width: 0,
                    height: 0,
                  }}
                  transition={{
                    bounce: 0,
                  }}
                >
                  {loadingIcon}
                </motion.div>
              )}
            </AnimatePresence>
          )}
        <Typography.Button>
          {body}
        </Typography.Button>
      </div>
    </button>
  )
}

interface BtnGroup {
  className?: string
  children?: ReactNode
  cancelable?: boolean
  value: any
  setValue: (val: any) => void
  activeColor?: Colors
}
function Group ({
  className, children, value, setValue, activeColor = 'primary', cancelable,
}: BtnGroup) {
  const ctx = useMemo(() => ({
    value, setValue, activeColor, cancelable,
  }), [value, setValue, activeColor, cancelable])
  return (
    <BtnGroupCtx.Provider value={ctx}>
      <div className="relative flex">
        <div
          className={classNames(
            className,
            `border-${activeColor}-2`,
            'r-btn-group',
          )}
        >
          {children}
        </div>
      </div>
    </BtnGroupCtx.Provider>
  )
}

function Counter ({
  value,
  size = 'md',
  color = 'primary',
  icon = 'check_circle',
  fill = false,
  active = false,
  ...props
}: {
  value: number
  icon: string | ReactNode
  color?: Colors
  active?: boolean
  fill?: boolean
  size?: 'xs' | 'sm' | 'md' | 'lg'
} & HTMLAttributes<HTMLButtonElement>) {
  const iconCls = classNames(
    `r-btn-${size}`,
    'r-btn-icon r-btn bg-opacity-10 dark:bg-opacity-10',
    'border-transparent',
    `group-hover:bg-${color}-1/10 group-hover:text-${color}-1`,
  )
  const textCls = classNames(
    `r-btn-counter-value transition group-hover:text-${color}-1`,
  )
  return (
    <button
      {...props}
      type="button"
      className="r-btn-counter group text-sm flex items-center gap-2 hover:cursor-pointer"
    >
      <div className={iconCls}>
        {
          typeof icon === 'string'
            ? (
              <MaterialSymbolIcon size={size} icon={icon} fill={fill} />
            )
            : icon
        }
      </div>
      <Typography.Button className={textCls}>{value}</Typography.Button>
    </button>
  )
}
export const Btn = Object.assign(BtnRoot, {
  Group, Counter,
})
