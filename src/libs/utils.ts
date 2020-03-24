export const merge = (content: any, option: any) => {
  if (option && content) {
    for (const [key, value] of Object.entries(option)) {
      content[key] = value
    }
  }
}

export const setStyle = (dom: HTMLElement) => {
  if (dom instanceof HTMLElement) {
    Object.defineProperties(dom, {
      point: {
        get: function () {
          return this._point
        },
        set: function (value) {
          if (!this._point || this._point[0] !== value[0] || this._point[1] !== value[1]) {
            this._point = value
            const transform = `translate3d(${value[0]}px, ${value[1]}px, 0px)`
            this.style.transform = this.style.webkitTransform = transform
          }
        }
      },
      width: {
        get: function () {
          return this._width
        },
        set: function (value) {
          if (this._width !== value) {
            this._width = value
            this.style.width = `${value}px`
          }
        }
      },
      height: {
        get: function () {
          return this._height
        },
        set: function (value) {
          if (this._height !== value) {
            this._height = value
            this.style.height = `${value}px`
          }
        }
      },
      left: {
        get: function () {
          return this._left
        },
        set: function (value) {
          if (this._left !== value) {
            this._left = value
            this.style.left = `${value}px`
          }
        }
      },
      right: {
        get: function () {
          return this._right
        },
        set: function (value) {
          if (this._right !== value) {
            this._right = value
            this.style.right = `${value}px`
          }
        }
      },
      top: {
        get: function () {
          return this._top
        },
        set: function (value) {
          if (this._top !== value) {
            this._top = value
            this.style.top = `${value}px`
          }
        }
      },
      bottom: {
        get: function () {
          return this._bottom
        },
        set: function (value) {
          if (this._bottom !== value) {
            this._bottom = value
            this.style.bottom = `${value}px`
          }
        }
      },
      borderRadius: {
        get: function () {
          return this._borderRadius
        },
        set: function (value) {
          if (this._borderRadius !== value) {
            this._borderRadius = value
            this.style.borderRadius = `${value}px`
          }
        }
      },
      backdropFilter: {
        get: function () {
          return this._backdropFilter
        },
        set: function (value) {
          if (this._backdropFilter !== value) {
            this._backdropFilter = value
            this.style.backdropFilter = `blur(${value}px)`
            this.style.WebkitBackdropFilter = `blur(${value}px)`
          }
        }
      },
      backgroundColor: {
        get: function () {
          return this._backgroundColor
        },
        set: function (value) {
          if (this._backgroundColor !== value) {
            this._backgroundColor = value
            this.style.backgroundColor = `${value}`
          }
        }
      },
      backgroundImage: {
        get: function () {
          return this._backgroundImage
        },
        set: function (value) {
          if (this._backgroundImage !== value) {
            this._backgroundImage = value
            this.style.backgroundImage = `radial-gradient(${value} 0%, transparent 50%)`
          }
        }
      },
      position: {
        get: function () {
          return this._position
        },
        set: function (value) {
          if (this._position !== 'value') {
            this._position = value
            this.style.position = `${value}`
          }
        }
      },
      overflow: {
        get: function () {
          return this._overflow
        },
        set: function (value) {
          if (this._overflow !== 'value') {
            this._overflow = value
            this.style.overflow = `${value}`
          }
        }
      },
      transitionDuration: {
        get: function () {
          return this._transitionDuration
        },
        set: function (value) {
          if (this._transitionDuration !== value) {
            this._transitionDuration = value
            this.style.transitionDuration = `${value}ms`
          }
        }
      },
      transitionProperty: {
        get: function () {
          return this._transitionProperty
        },
        set: function (value) {
          if (this._transitionProperty !== value) {
            this._transitionProperty = value
            this.style.transitionProperty = `${value}`
          }
        }
      },
      opacity: {
        get: function () {
          return this._opacity
        },
        set: function (value) {
          if (this._opacity !== value) {
            this._opacity = value
            this.style.opacity = `${value}`
          }
        }
      },
      pointerEvents: {
        get: function () {
          return this._pointerEvents
        },
        set: function (value) {
          if (this._pointerEvents !== value) {
            this._pointerEvents = value
            this.style.pointerEvents = `${value}`
          }
        }
      },
      zIndex: {
        get: function () {
          return this._zIndex
        },
        set: function (value) {
          if (this._zIndex !== value) {
            this._zIndex = value
            this.style.zIndex = `${value}`
          }
        }
      }
    })
  }
}