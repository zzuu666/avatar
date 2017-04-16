import { PriviweOptions, Component } from './types/index'
import { queryCanvas } from './util'

export class Preview {
  el: HTMLCanvasElement
  size: number
  shape: string
  ava: Component
  
  constructor (ava:Component, options: PriviweOptions) {
    this.el = queryCanvas(options.el)
    this.size = options.size
    this.shape = options.shape || 'circle'
    this.ava = ava
    this.initSize()
  }

  private initSize () {
    this.el.width = this.el.height = this.size
    if (this.shape === 'circle') {
      this.el.style.borderRadius = '50%'
    }
  }

  public update () {
    let ctx = this.el.getContext('2d')
    let ava = this.ava
    ctx.clearRect(0, 0, this.size, this.size)
		// ctx.drawImage(ava.image, ava.x, ava.y, ava.d, ava.d, 0, 0, this.size, this.size)
    let sx = (ava.x - ava.xfrom) * ava.scale
    let sy = (ava.y - ava.yfrom) * ava.scale
    let sSzie = ava.d * ava.scale
    ctx.drawImage(ava.image, sx , sy, sSzie, sSzie, 0, 0, this.size, this.size)
  }
}
