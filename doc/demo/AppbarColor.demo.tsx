import { Appbar, MaterialSymbolIcon } from '../../src'

export default function Demo () {
  return <div
    style={{
      backgroundImage:
              'radial-gradient(rgb(22,22,22,0.5) 0px, rgb(22,22,22,0.5) 25px, rgb(88,88,88,0.1) 25px, rgb(88,88,88,0.1) 50px)',
      backgroundSize: '60px 60px',
    }}
  >
    <Appbar
      varient="default"
      color="blue"
      icon={<MaterialSymbolIcon icon={'home'} />}
      title="Roku UI App Default"
    />
    <Appbar
      varient="pattern"
      color="blue"
      icon={<MaterialSymbolIcon icon={'home'} />}
      title="Roku UI App Pattern"
    />
    <Appbar
      varient="blur"
      color="blue"
      icon={<MaterialSymbolIcon icon={'home'} />}
      title="Roku UI App Blur"
    />
    <Appbar
      varient="transparent"
      color="blue"
      icon={<MaterialSymbolIcon icon={'home'} />}
      title="Roku UI App Transparent"
    />
  </div>
}
