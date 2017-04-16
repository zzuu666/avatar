import { Component, Options, PriviweOptions, PreviewComponent } from './types/index'
import { query, after, append, parseStyle, absolute } from './util'
import { Preview } from './preview'

interface HTMLInputEvent extends Event {
    target: HTMLInputElement & EventTarget
}

export function MixinInit (Avatar: Function) {
  Avatar.prototype._init = function (options: Options) {
    let ava: Component = this
    ava.$el = query(options.el)
    ava.size = options.size
    initRootStyle(ava.$el, ava.size)
    ava.image = createImage(ava.$el)
    ava.canvas = createCanvas(ava.size, ava.$el)
    ava.x = options.size / 4
    ava.y = options.size / 4
    ava.d = options.size / 2
    // todo file now just support HTMLInputElement
    ava.file = options.file || null
    if (ava.file) {
      initFileInput(ava)
    }
    initEvent(ava)
    ava.previews = options.previews.length ? initPrivew(ava, options.previews) : []
    drawVisibel(ava)
  }
}

function initRootStyle (root: HTMLElement, size: number) {
  root.style.position = 'relative'
  root.style.background = '#000'
  root.style.width = size + 'px'
  root.style.height = size + 'px'
}

function createCanvas (size: number, root: HTMLElement): HTMLCanvasElement {
  let canvas = document.createElement('canvas')
  canvas.height = size
  canvas.width = size
  root.appendChild(canvas)
  absolute(canvas)
  return canvas
}

function initPrivew (ava: Component, arr: Array<PriviweOptions>): Array<Preview> {
  let previews: Array<Preview> = []
  for (let i = 0, len = arr.length; i < len; i++) {
    let preview = new Preview (ava, arr[i])
    previews.push(preview)
  }
  return previews
}

function drawVisibel (ava: Component) {
  let ctx = ava.canvas.getContext('2d')
  let size = ava.size
  let x = ava.x
  let y = ava.y
  let d = ava.d
  let r = ava.d / 2

  ctx.clearRect(0, 0, size, size)
  ctx.fillStyle = 'rgba(0, 0, 0, 0.6)'
  ctx.fillRect(0, 0, size, size)
	ctx.clearRect(x, y, d, d)
	ctx.strokeStyle = 'rgba(255, 255, 255, 0)'
	ctx.beginPath()
	ctx.moveTo(x + d, y + r) //e
	ctx.arc(x + r, y + r, r, 0, Math.PI / 2, false) // e to s
	ctx.moveTo(x + r, y + d) //s
	ctx.lineTo(x + d, y + d) // s to es
	ctx.lineTo(x + d, y + r) // es to e
	ctx.moveTo(x + d, y + r) // e
	ctx.arc(x + r, y + r, r, 0, Math.PI * 3 / 2, true)
	ctx.moveTo(x + r, y)
	ctx.lineTo(x + d, y)
	ctx.lineTo(x + d, y + r)
	ctx.moveTo(x + d, y + r)
	ctx.moveTo(x, y + r)
	ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 3 / 2, false)
	ctx.moveTo(x + r, y)
	ctx.lineTo(x, y)
	ctx.lineTo(x, y + r)
	ctx.moveTo(x, y + r)
  ctx.arc(x + r, y + r, r, Math.PI, Math.PI / 2, true)
  ctx.moveTo(x + r, y + d)
  ctx.lineTo(x, y + d)
  ctx.lineTo(x, y + r)
  ctx.moveTo(x, y + r)
  ctx.fill()
  ctx.closePath()
  ctx.stroke()
  ctx.beginPath()
  ctx.fillStyle = 'rgba(255, 255, 255, 1)'
  ctx.strokeStyle = 'rgba(0, 0, 0, 1)'
  ctx.arc(x + r * 1.707, y + r * 1.707, 5, 0, Math.PI * 2, true)
  ctx.fill()
  ctx.stroke()

  notify(ava)
}

function initEvent (ava: Component) {
  let ox = 0
  let oy = 0
  let canvas = ava.canvas
  let canMove = false
  let canResize = false

  canvas.addEventListener('mousemove', (e: MouseEvent) => {
    if ((Math.pow(e.offsetX - (ava.x + ava.d / 2 * 1.707), 2) + Math.pow(e.offsetY - (ava.y + ava.d / 2 * 1.707), 2)) <= 25) {
      canvas.style.cursor = 'nwse-resize'
    } else if ((Math.pow(e.offsetX - (ava.x + ava.d / 2), 2) + Math.pow(e.offsetY - (ava.y + ava.d / 2), 2)) <= Math.pow(ava.d / 2, 2)) {
      canvas.style.cursor = 'move'
    } else {
      canvas.style.cursor = 'auto'
    }

    if (canResize) {
      ava.d = e.offsetY - (ava.y + ava.d / 2 * 1.707) + ava.d
      if (ava.d > Math.min((ava.xend - ava.xfrom), (ava.yend - ava.yfrom))) {
        // todo optimize the max ava.d
        ava.d = Math.min((ava.xend - ava.xfrom), (ava.yend - ava.yfrom))
      }
      drawVisibel(ava)
    } else if (canMove) {
      if (ava.y + ava.d > ava.yend) {
        ava.y = Math.floor(ava.yend - ava.d)
      }
      if (ava.x + ava.d > ava.xend) {
        ava.x = Math.floor(ava.xend - ava.d)
      }
      if (ava.x < ava.xfrom) {
        ava.x = Math.floor(ava.xfrom)
      }
      if (ava.y < ava.yfrom) {
        ava.y = Math.floor(ava.yfrom)
      }
      ava.x = e.offsetX - ox + ava.x
      ava.y = e.offsetY - oy + ava.y
      drawVisibel(ava)
      ox = e.offsetX
      oy = e.offsetY
    }
  })
  canvas.addEventListener('mouseout', (e: MouseEvent) => {
    if ((ava.d > Math.min((ava.xend - ava.xfrom), (ava.yend - ava.yfrom))) && canResize) {
      ava.d = Math.min((ava.xend - ava.xfrom), (ava.yend - ava.yfrom))
      drawVisibel(ava)
    }
    canResize = false
    canMove = false
  })
  canvas.addEventListener('mouseup', (e: MouseEvent) => {
    if ((ava.d > Math.min((ava.xend - ava.xfrom), (ava.yend - ava.yfrom))) && canResize) {
			ava.d = Math.min((ava.xend - ava.xfrom), (ava.yend - ava.yfrom))
			drawVisibel(ava)
		}
		canResize = false
		canMove = false
  })
  canvas.addEventListener('mousedown', (e: MouseEvent) => {
    if ((Math.pow(e.offsetX - (ava.x + ava.d / 2 * 1.707), 2) + Math.pow(e.offsetY - (ava.y + ava.d / 2 * 1.707), 2)) <= 25) {
      canResize = true
      canvas.style.cursor = 'nwse-resize'
    } else if ((Math.pow(e.offsetX - (ava.x + ava.d / 2), 2) + Math.pow(e.offsetY - (ava.y + ava.d / 2), 2)) <= Math.pow(ava.d / 2, 2)) {
      canMove = true
      canvas.style.cursor = 'move'
      ox = e.offsetX
      oy = e.offsetY
    } else {
      canvas.style.cursor = 'auto'
    }
  })
}

function createImage (el: HTMLElement): HTMLImageElement {
  let img: HTMLImageElement = new Image()
  el.appendChild(img)
  absolute(img)
  return img
}

function initFileInput (ava: Component) {
  let el = ava.file
  el.addEventListener('change', (e: HTMLInputEvent) => {
    let file = e.target.files[0]
    ava.$setBlob(file)
  })
}

function notify (ava: Component) {
  for (let i = 0, len = ava.previews.length; i < len; i++) {
    ava.previews[i].update()
  }
}
