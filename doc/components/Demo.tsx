import { ReactNode, useEffect, useState, lazy, Suspense, useRef } from 'react'
import { Panel, useAutoSetHeight } from '../../src'

export const Demo = ({ name }: {
  name: string
}) => {
  const [comp, setComp] = useState<ReactNode>()
  const [code, setCode] = useState<string>()
  useEffect(() => {
    const Comp = lazy(async () => await import(`../demo/${name}.demo.tsx`))
    setComp(<Comp/>)
    import(`../demo/${name}.demo.tsx?raw`).then((module) => {
      setCode(module.default.replace('../../src', 'roku-ui').replaceAll('\n', ' \n'))
    }).catch((err) => console.error(err))
  }, [name])
  const compRef = useRef<HTMLDivElement>(null)
  useAutoSetHeight(compRef)
  const ref = useRef<HTMLPreElement>(null)
  useEffect(() => {
    if (ref.current) {
      window.Prism.highlightElement(ref.current, false, (e) => { })
    }
  }, [code])
  return (
    <Panel
      nopadding
      className="not-prose"
      style={{ padding: 0, maxWidth: 'calc(100vw - 16px)' }}>
      <div ref={compRef} style={{
        transitionProperty: 'height',
        transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDuration: '300ms',
        padding: 16,
      }}>
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            {comp}
          </Suspense>
        </div>
      </div>
      <div className="line-numbers">
        {code &&
          <pre
            style={{
              margin: 0,
              borderTopLeftRadius: 0,
              borderTopRightRadius: 0,
              overflowX: 'auto',
              fontFamily: 'monospace',
              fontSize: 12,
              background: '#1e1e1e',
              borderRadius: '0 0 4px 4px',
            }}
          >
            <code
              ref={ref}
              className="language-tsx"
            >
              {code}
            </code>
          </pre>
        }
      </div>
    </Panel>
  )
}
