import { State, UserProps, Props } from './interface'
import { merge, setStyle } from './utils'

export const initialProps: Props = {
  defaultBackgroundColor: 'rgba(30, 111, 255, .1)',
  activeBackgroundColor: 'rgba(30, 111, 255, .2)',
  defaultSize: 20,
  activeSize: 15,
  hoverPadding: 8,
  hoverRadius: 8,
  activePadding: 4,
  activeRadius: 4,
  selectionWidth: 3,
  selectionHeight: 40,
  selectionRadius: 2,
  hoverSelector: 'a, button, input[type="button"], input[type="checkbox"], input[type="radio"], input[type="file"], input[type="submit"]',
  normalTransitionDuration: 200,
  hoverTransitionDuration: 50,
  blurRadius: 10,
  glowRadius: 200,
  style: {},
  zIndex: 10000,
}

export const initialState = {
  container: null,
  cursor: null,
  glow: null,
  setSteadyHoverTimeout: null,
  isTouch: false,
  isVisible: false,
  isActive: false,
  isSelection: false,
  isSteadyHover: false,
  hoverTarget: null,
  point: [0, 0]
}

export const initializeState = (state: State, userOption?: UserProps) => {
  const containerStyles = {
    position: 'fixed',
    zIndex: state.zIndex,
    pointerEvents: 'none',
    opacity: 1,
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    ...state.style
  }
  const cursorStyle = {
    left: state.defaultSize / -2,
    top: state.defaultSize / -2,
    right: state.defaultSize / -2,
    bottom: state.defaultSize / -2,
    borderRadius: state.defaultSize / 2,
    backdropFilter: state.blurRadius,
    backgroundColor: state.defaultBackgroundColor,
    position: 'absolute',
    overflow: 'hidden',
    transitionDuration: state.normalTransitionDuration,
    transitionProperty: 'top, left, right, bottom, border-radius, background-color, backdrop-filter, -webkit-backdrop-filter, opacity'
  }
  const glowStyle = {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    transitionProperty: 'all',
    borderRadius: 0,
    backgroundImage: ''
  }
  state.container && setStyle(state.container)
  state.cursor && setStyle(state.cursor)
  state.glow && setStyle(state.glow)
  const renderContent = () => {
    const transitionDuration = state.isSteadyHover ? state.hoverTransitionDuration : state.normalTransitionDuration
    const backgroundColor = state.isActive ? state.activeBackgroundColor : state.defaultBackgroundColor
    const targetRect = state.hoverTarget?.getClientRects()
    if (state.hoverTarget && targetRect && targetRect.length > 0) {
      const padding = state.isActive ? state.activePadding : state.hoverPadding
      const radius = state.isActive ? state.activeRadius : state.hoverRadius
      const rect = targetRect[0]
      merge(state.cursor, {
        ...cursorStyle,
        transitionDuration,
        backgroundColor, left: (rect.left - padding) - state.point[0],
        top: (rect.top - padding) - state.point[1],
        right: state.point[0] - (rect.right + padding),
        bottom: state.point[1] - (rect.bottom + padding),
        borderRadius: radius,
        backdropFilter: ''
      })
      merge(state.glow,
        {
          ...glowStyle,
          transitionDuration,
          left: state.point[0] - (rect.left - padding) - state.glowRadius,
          top: state.point[1] - (rect.top - padding) - state.glowRadius,
          right: (rect.right + padding) - state.point[0] - state.glowRadius,
          bottom: (rect.bottom + padding) - state.point[1] - state.glowRadius,
          borderRadius: radius * 2,
          backgroundImage: state.defaultBackgroundColor
        })
    } else {
      const width = state.isSelection ? state.selectionWidth : (state.isActive ? state.activeSize : state.defaultSize)
      const height = state.isSelection ? state.selectionHeight : (state.isActive ? state.activeSize : state.defaultSize)
      merge(state.cursor, {
        ...cursorStyle,
        transitionDuration,
        backgroundColor,
        left: -width / 2,
        top: -height / 2,
        right: -width / 2,
        bottom: -height / 2,
        borderRadius: state.isSelection ? state.selectionRadius : state.defaultSize / 2,
        backdropFilter: state.blurRadius
      })
      merge(state.glow, { ...glowStyle, transitionDuration })
    }
    merge(state.container, {
      ...containerStyles,
      point: state.point ? state.point : [0, 0],
      opacity: state.isVisible ? 1 : 0,
    })
  }
  Object.defineProperties(state, {
    isSelection: {
      get: function () {
        return this._isSelection
      },
      set: function (value) {
        this._isSelection = value
        renderContent()
      }
    },
    isVisible: {
      get: function () {
        return this._isVisible
      },
      set: function (value) {
        this._isVisible = value
        renderContent()
      }
    },
    isTouch: {
      get: function () {
        return this._isTouch
      },
      set: function (value) {
        this._isTouch = value
        this.isVisible = !value
        renderContent()
      }
    },
    point: {
      get: function () {
        return this._point
      },
      set: function (value) {
        this._point = value
        renderContent()
      }
    },
    isSteadyHover: {
      get: function () {
        return this._isSteadyHover
      },
      set: function (value) {
        this._isSteadyHover = value
        renderContent()
      }
    },
    isActive: {
      get: function () {
        return this._isActive
      },
      set: function (value) {
        this._isActive = value
        renderContent()
      }
    },
    hoverTarget: {
      get: function () {
        return this._hoverTarget
      },
      set: function (value) {
        if (this._hoverTarget !== value) {
          if (this.setSteadyHoverTimeout) {
            clearTimeout(this.setSteadyHoverTimeout)
            this.setSteadyHoverTimeout = null
          }
          this.isSteadyHover = false
          this._hoverTarget = value
          renderContent()
        }
      }
    },
  })
  merge(state, {
    ...userOption,
    setSteadyHoverTimeout: null,
    isTouch: false,
    isVisible: false,
    isActive: false,
    isSelection: false,
    isSteadyHover: false,
    hoverTarget: null,
    point: [0, 0]
  })
}

export const restoreState = (state: State) => {
  merge(state, { ...initialState, ...initialProps })
}