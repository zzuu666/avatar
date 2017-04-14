import { query, after, append, parseStyle } from './util'

interface Options {
  el: string | HTMLElement,
  width: number,
  height: number,
  file?: HTMLInputElement
}

export class Init {
  $el: HTMLElement
  height: number
  width: number
  selectEl: HTMLElement
  radius: number
  imageEl: HTMLImageElement
  fileInput: HTMLInputElement | null

  init (option: Options) {
    this.$el = query(option.el)
    this.height = option.height
    this.width = option.width
    this.radius = this.height / 4
    this.fileInput = option.file || null
    if (this.fileInput) {
      initFileInput(this.fileInput, this)
    }
    this.imageEl = createImage(this.$el)
    console.log(this.imageEl)
    this.selectEl = createSelect(this.$el, this.height, this.width)
    bindMoveEvent(this.selectEl, this.radius)
  }

  setImage (file: Blob) {
    let self = this
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      let img: HTMLImageElement = self.imageEl
      img.onload = () => {
        let isVertical: boolean = img.height > img.width
        if (isVertical) {
          img.height = 400
        } else {
          img.width = 400
        }
      }
      img.src = this.result
    }
  }
}

function createSelect (el: HTMLElement, height: number, width: number): HTMLElement {
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

function createImage (el: HTMLElement): HTMLImageElement {
  let img: HTMLImageElement = new Image()
  el.appendChild(img)
  return img
}

function bindMoveEvent (dom: HTMLElement, radius: number) {
  let isCanMove: boolean = false
  let startX: number
  let startY: number
  let endX: number
  let endY: number

  dom.addEventListener('mousedown', (e: MouseEvent) => {
    isCanMove = true
    startX = e.offsetX
    startY = e.offsetY
  })
  dom.addEventListener('mouseup', (e: MouseEvent) => {
    isCanMove = false
  })
  dom.addEventListener('mousemove', (e: MouseEvent) => {
    if (isCanMove) {
      dom.style.left = parseFloat(dom.style.left) + e.offsetX - startX + 'px'
      dom.style.top = parseFloat(dom.style.top) + e.offsetY - startY + 'px'
    }
  })
}

function initFileInput (el: HTMLInputElement, ctx) {
  el.addEventListener('change', (e: Event) => {
    let file = e.target.files[0]
    console.log(typeof file)
    ctx.setImage(file)
  })
}
