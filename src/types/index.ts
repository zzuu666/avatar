import { Preview } from '../preview'
/**
 * Type of Avatar
 */
export interface Component {
  $el: HTMLElement,
  canvas: HTMLCanvasElement,
  size: number,
  x: number,
  y: number,
  d: number,
  image: HTMLImageElement,
  file: HTMLInputElement,
  $setBlob: (file: Blob) => void,
  xend: number,
  yend: number,
  xfrom: number,
  yfrom: number,
  previews: Array<Preview>,
  scale: number
}

/**
 * Type of Avatar constructor options
 */
export interface Options {
  el: string | HTMLElement,
  width: number,
  height: number,
  file?: HTMLInputElement,
  size: number,
  previews: Array<PriviweOptions>,
  output: Array<number>
}

export interface PriviweOptions {
  size: number,
  el: HTMLCanvasElement,
  shape: string
}

export interface PreviewComponent {
  el: HTMLCanvasElement
  size: number
  shape: string
  ava: Component
  update: () => {}
}

