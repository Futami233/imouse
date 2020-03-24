import { UserProps, State } from './libs/interface'
import { initializeState, restoreState, initialProps, initialState } from './libs/initializeState'

const App = () => {
  const state: State = {
    ...initialProps,
    ...initialState
  }
  const mouseMove = (e: MouseEvent) => {
    const currentY = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
    const { pageX, pageY } = e
    state.point = [pageX, pageY - currentY]
    state.isVisible = !state.isTouch
    state.isSelection = !document.getSelection()?.isCollapsed
  }
  const mouseOver = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    const hoverTarget = target.closest(state.hoverSelector) as HTMLElement
    state.hoverTarget = hoverTarget
  }
  const mouseLeave = () => {
    state.isVisible = false
    state.isActive = false
  }
  const mouseDown = () => {
    state.isActive = true
  }
  const mouseUp = () => {
    state.isActive = false
    state.isSelection = !document.getSelection()?.isCollapsed
  }
  const dragStart = (e: MouseEvent) => {
    e.preventDefault()
  }
  const scroll = () => {
    state.hoverTarget = null
  }
  const touchStart = () => {
    state.isTouch = true
  }
  const touchEnd = () => {
    setTimeout(() => {
      state.isVisible = false
      state.isTouch = false
    }, 0)
  }
  const init = (props?: UserProps) => {
    const hideCusor = document.createElement('style')
    hideCusor.innerHTML = ':root, * { cursor: none !important; }'
    state.container = document.createElement('div')
    state.cursor = document.createElement('div')
    state.glow = document.createElement('div')
    initializeState(state, props)
    state.cursor.appendChild(state.glow)
    state.container.appendChild(state.cursor)
    state.container.appendChild(hideCusor)
    document.body.appendChild(state.container)
    document.body.addEventListener('touchstart', touchStart)
    document.body.addEventListener('touchend', touchEnd)
    document.body.addEventListener('mousemove', mouseMove)
    document.body.addEventListener('mouseover', mouseOver)
    document.body.addEventListener('mouseleave', mouseLeave)
    document.body.addEventListener('mousedown', mouseDown)
    document.body.addEventListener('mouseup', mouseUp)
    document.body.addEventListener('dragstart', dragStart)
    window.addEventListener('scroll', scroll)
  }
  const destroy = () => {
    if (state.container) {
      document.body.removeChild(state.container as HTMLElement)
      document.body.removeEventListener('touchstart', touchStart)
      document.body.removeEventListener('touchend', touchEnd)
      document.body.removeEventListener('mousemove', mouseMove)
      document.body.removeEventListener('mouseover', mouseOver)
      document.body.removeEventListener('mouseleave', mouseLeave)
      document.body.removeEventListener('mousedown', mouseDown)
      document.body.removeEventListener('mouseup', mouseUp)
      document.body.removeEventListener('dragstart', dragStart)
      window.removeEventListener('scroll', scroll)
      restoreState(state)
    }
  }
  return {
    init, destroy
  }
}

export default App()