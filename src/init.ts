import { query, after, append, parseStyle } from './util'

interface Options {
  el: string | Element,
  width: number,
  height: number
}

export class Init {
  $el: Element
  height: number
  width: number
  selectEl: Element
  radius: number

  init (option: Options) {
    this.$el = query(option.el)
    this.height = option.height
    this.width = option.width
    this.radius = this.height / 4
    this.selectEl = createSelect(this.$el, this.height, this.width)
    bindMoveEvent(this.selectEl, this.radius)
  }
}

function createSelect (el: Element, height: number, width: number): Element {
  let style = {
    'background': 'rgba(0, 0, 0, 0.6)',
    'height': height + 'px',
    'width': width + 'px'
  }
  let visible = {
    'position': 'absolute',
    'top': height / 4 + 'px',
    'left': width / 4 + 'px',
    'background': 'rgba(255, 255, 255, 1)',
    'height': height / 2 + 'px',
    'width': width / 2 + 'px',
    'border-radius': '50%'
  }
  let html = `
    <div data-role="select-container" style="${parseStyle(style)}">
      <div data-role="select-visible" style="${parseStyle(visible)}">
      </div>
    </div>
  `
  append(el, html)
  return query('div[data-role="select-visible"]')
}

function bindMoveEvent (dom: Element, radius: number) {
  let isCanMove: boolean = false
  let startX: number
  let startY: number
  let endX: number
  let endY: number

  dom.addEventListener('mousedown', (e) => {
    isCanMove = true
    startX = e.offsetX
    startY = e.offsetY
  })
  dom.addEventListener('mouseup', (e) => {
    isCanMove = false
  })
  dom.addEventListener('mousemove', (e) => {
    if (isCanMove) {
      dom.style.left = parseFloat(dom.style.left) + e.offsetX - startX + 'px'
      dom.style.top = parseFloat(dom.style.top) + e.offsetY - startY + 'px'
    }
  })
}
