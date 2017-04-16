import { Component } from './types/index'
/**
 * Mixin the Avatar Api
 * @param Avatar Class
 */
export function MixinApi (Avatar: Function) {
  /**
   * set the blob img
   * @param file Blob type
   */
  Avatar.prototype.$setBlob = function (file: Blob) {
    let ava: Component = this
    let size: number = ava.size
    let reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = function () {
      let img = ava.image
      img.onload = function () {
        let isVertical: boolean = img.naturalHeight > img.naturalWidth
        img.removeAttribute('width')
        img.removeAttribute('height')
        if (isVertical) {
          img.height = size
          let left = (size - img.width) / 2
          img.style.left = left + 'px'
          setSelectEdge(ava, left, 0, size - left, size)
        } else {
          img.width = size
          let top = (size - img.height) / 2
          img.style.top = top + 'px'
          setSelectEdge(ava, 0 , top, size, size - top)
        }
        ava.scale = img.naturalHeight / img.height
        console.log(ava.scale)
      }
      img.src = this.result
    }
  }
}

/**
 * 
 * @param ava 
 * @param xf 
 * @param yf 
 * @param xe 
 * @param ye 
 */

function setSelectEdge (ava: Component, xf: number, yf: number, xe: number, ye: number) {
  ava.xend = xe
  ava.yend = ye
  ava.xfrom = xf
  ava.yfrom = yf
}