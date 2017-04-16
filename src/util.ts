/**
 * Mixin Helper
 */
export function mixins (target: any, mix: any[]) {
  mix.forEach((base) => {
    Object.getOwnPropertyNames(base.prototype).forEach((name) => {
      target.prototype[name] = base.prototype[name]
    })
  })
}

/**
 * Query an element selector if it's not an element already.
 */
export function query (el: string | HTMLElement): HTMLElement {
  if (typeof el === 'string') {
    const selected: HTMLElement = <HTMLElement> document.querySelector(el)
    if (!selected) {
      return document.createElement('div')
    }
    return selected
  } else {
    return el
  }
}

export function queryCanvas (el: string | HTMLCanvasElement): HTMLCanvasElement {
  if (typeof el === 'string') {
    const selected: HTMLCanvasElement = <HTMLCanvasElement> document.querySelector(el)
    if (!selected) {
      console.warn(`The selector ${el} isn't a canvas element`)
      return document.createElement('canvas')
    }
    return selected
  } else {
    return el
  }
}
/**
 * Insert a html string after DOM
 */
export function after (target: Element, html: string) {
  target.insertAdjacentHTML('afterend', html)
}

/**
 * Append a html string in DOM end
 */
export function append (target: Element, html: string) {
  target.insertAdjacentHTML('beforeend', html)
}

/**
 * Parse style object to style string
 */
interface Style {
  [property: string]: string
}
export function parseStyle (style: Style): string {
  let res: string = ''
  Object.keys(style).forEach((key) => {
    res += `${key}: ${style[key]};`
  })
  return res
}

export function absolute (el: HTMLImageElement | HTMLCanvasElement) {
  el.style.position = 'absolute'
  el.style.top = '0'
  el.style.left = '0'
}



