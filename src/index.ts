import { Init } from './init'
import { mixins } from './util'

interface Options {
  el: string | HTMLElement,
  width: number,
  height: number
}

class Avatar implements Init {
  private $option: object
  init: (opt: object) => void

  constructor (option: Options) {
    this.$option = option
    this.init(option)
  }
}

mixins(Avatar, [Init])

export default Avatar
