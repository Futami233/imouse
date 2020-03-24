export interface TranlasteDom extends HTMLElement {
  translateX: number
  translateY: number
}

export interface UserProps {
  defaultBackgroundColor?: string
  activeBackgroundColor?: string
  defaultSize?: number
  activeSize?: number
  hoverPadding?: number
  activePadding?: number
  hoverRadius?: number
  activeRadius?: number
  selectionWidth?: number
  selectionHeight?: number
  selectionRadius?: number
  hoverSelector?: string
  normalTransitionDuration?: number
  hoverTransitionDuration?: number
  blurRadius?: number
  glowRadius?: number
  style?: any
  zIndex?: number
}

export interface Props {
  defaultBackgroundColor: string
  activeBackgroundColor: string
  defaultSize: number
  activeSize: number
  hoverPadding: number
  activePadding: number
  hoverRadius: number
  activeRadius: number
  selectionWidth: number
  selectionHeight: number
  selectionRadius: number
  hoverSelector: string
  normalTransitionDuration: number
  hoverTransitionDuration: number
  blurRadius: number
  glowRadius: number
  style: any
  zIndex: number
}

export interface State extends Props {
  container: HTMLElement | null
  cursor: HTMLElement | null
  glow: HTMLElement | null
  setSteadyHoverTimeout: number | null
  isTouch: boolean
  isVisible: boolean
  isActive: boolean
  isSelection: boolean
  isSteadyHover: boolean
  hoverTarget: HTMLElement | null
  cursorLeft: number
  cursorTop: number
}